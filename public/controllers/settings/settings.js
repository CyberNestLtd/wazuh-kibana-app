/*
 * Wazuh app - Settings controller
 * Copyright (C) 2015-2019 Wazuh, Inc.
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * Find more information about this on the LICENSE file.
 */
import { TabNames } from '../../utils/tab-names';
import { configEquivalences } from '../../utils/config-equivalences';
import { kibana } from '../../../package.json';

export class SettingsController {
  /**
   * Class constructor
   * @param {*} $scope
   * @param {*} $window
   * @param {*} $location
   * @param {*} testAPI
   * @param {*} appState
   * @param {*} genericReq
   * @param {*} errorHandler
   * @param {*} wzMisc
   * @param {*} wazuhConfig
   */
  constructor(
    $scope,
    $window,
    $location,
    testAPI,
    appState,
    genericReq,
    errorHandler,
    wzMisc,
    wazuhConfig
  ) {
    this.kibanaVersion = (kibana || {}).version || false;
    this.$scope = $scope;
    this.$window = $window;
    this.$location = $location;
    this.testAPI = testAPI;
    this.appState = appState;
    this.genericReq = genericReq;
    this.errorHandler = errorHandler;
    this.wzMisc = wzMisc;
    this.wazuhConfig = wazuhConfig;

    if (this.wzMisc.getWizard()) {
      $window.sessionStorage.removeItem('healthCheck');
      this.wzMisc.setWizard(false);
    }

    this.apiIsDown = this.wzMisc.getApiIsDown();
    this.currentApiEntryIndex = false;
    this.tab = 'api';
    this.load = true;
    this.loadingLogs = true;
    this.editingKey = false;
    this.tabNames = TabNames;
    this.configuration = { ...(wazuhConfig.getConfig() || {}) };
    this.configurationTypes = [];
    this.indexPatterns = [];
    this.apiEntries = [];
  }

  /**
   * On controller loads
   */
  async $onInit() {
    for (const key in this.configuration) {
      this.configurationTypes[key] = typeof this.configuration[key];
      if (key.includes('extension')) {
        delete this.configuration[key];
      }
    }
    // Loading data
    await this.getSettings();

    this.apiTableProps = {
      currentDefault: this.currentDefault,
      apiEntries: this.apiEntries,
      compressed: true,
      setDefault: entry => this.setDefault(entry),
      checkManager: entry => this.checkManager(entry)
    };

    this.addApiProps = {
      checkForNewApis: () => this.checkForNewApis()
    }

    this.settingsTabsProps = {
      clickAction: tab => {
        this.switchTab(tab, true);
        if (tab === 'logs') {
          this.refreshLogs();
        }
      },
      selectedTab: this.tab || 'api',
      tabs: [
        { id: 'api', name: 'API' },
        { id: 'configuration', name: 'Configuration' },
        { id: 'logs', name: 'Logs' },
        { id: 'about', name: 'About' }
      ]
    };

    const location = this.$location.search();
    if (location && location.tab) {
      this.tab = location.tab;
      this.settingsTabsProps.selectedTab = this.tab;
    }

    await this.getAppInfo();
  }

  /**
   * This switch to a selected tab
   * @param {Object} tab
   */
  switchTab(tab, setNav = false) {
    if (setNav) {
      this.appState.setNavigation({ status: true });
    }
    this.tab = tab;
    this.$location.search('tab', this.tab);
  }

  // Get current API index
  getCurrentAPIIndex() {
    if (this.apiEntries.length) {
      const idx = this.apiEntries.map(entry => Object.keys(entry)[0]).indexOf(this.currentDefault);
      this.currentApiEntryIndex = idx;
    }
  }

  /**
  * Returns the index of the API in the entries array
  * @param {Object} api 
  */
  getApiIndex(api) {
    return this.apiEntries.map(entry => Object.keys(entry)[0]).indexOf(api.id)
  }

  // Set default API
  async setDefault(item) {
    try {
      await this.checkManager(item, false, true);
      const index = this.getApiIndex(item);
      const entry = this.apiEntries[index];
      const key = Object.keys(entry)[0];
      const api = entry[key];
      const { cluster_info, id } = api;
      const { manager, cluster, status } = cluster_info;

      // Check the connection before set as default 
      this.appState.setClusterInfo(cluster_info);
      const clusterEnabled = status === 'disabled';
      this.appState.setCurrentAPI(
        JSON.stringify({
          name: clusterEnabled ? manager : cluster,
          id: id
        })
      );

      this.$scope.$emit('updateAPI', {});

      const currentApi = this.appState.getCurrentAPI();
      this.currentDefault = JSON.parse(currentApi).id;
      this.apiTableProps.currentDefault = this.currentDefault;
      this.$scope.$applyAsync();

      this.errorHandler.info(`API ${manager} set as default`);

      this.getCurrentAPIIndex();
      if (currentApi && !this.appState.getExtensions(id)) {
        const { id, extensions } = this.apiEntries[this.currentApiEntryIndex][key];
        this.appState.setExtensions(id, extensions);
      }

      this.$scope.$applyAsync();
      return this.currentDefault;
    } catch (error) {
      this.errorHandler.handle(error);
    }
  }

  // Get settings function
  async getSettings() {
    try {
      const patternList = await this.genericReq.request(
        'GET',
        '/elastic/index-patterns',
        {}
      );

      this.indexPatterns = patternList.data.data;

      if (!this.indexPatterns.length) {
        this.wzMisc.setBlankScr('Sorry but no valid index patterns were found');
        this.$location.search('tab', null);
        this.$location.path('/blank-screen');
        return;
      }
      const data = await this.genericReq.request('GET', '/hosts/apis');

      const apis = data.data;
      this.apiEntries = apis.length ? apis : [];
      const currentApi = this.appState.getCurrentAPI();

      if (currentApi) {
        const { id } = JSON.parse(currentApi);
        this.currentDefault = id;
      }

      this.$scope.$applyAsync();

      this.getCurrentAPIIndex();

      if (!this.currentApiEntryIndex && this.currentApiEntryIndex !== 0) {
        return;
      }

      if (currentApi && !this.appState.getExtensions(this.currentDefault)) {
        const { _id, _source } = this.apiEntries[this.currentApiEntryIndex];
        const { extensions } = _source;
        this.appState.setExtensions(_id, extensions);
      }

      this.$scope.$applyAsync();
    } catch (error) {
      this.errorHandler.handle('Error getting API entries', 'Settings');
    }
    // Every time that the API entries are required in the settings the registry will be checked in order to remove orphan host entries
    await this.genericReq.request('POST', '/hosts/remove-orphan-entries', { entries: this.apiEntries });
    return;
  }

  // Check manager connectivity
  async checkManager(item, isIndex, silent = false) {
    try {
      // Get the index of the API in the entries
      const index = isIndex
        ? item
        : this.getApiIndex(item);

      // Get the Api information
      const entry = this.apiEntries[index];
      const id = Object.keys(entry)[0];
      const api = entry[id];
      const { user, url, port } = api;
      const tmpData = {
        user: user,
        url: url,
        port: port,
        cluster_info: {},
        insecure: 'true',
        id: id
      };

      // Test the connection
      const data = await this.testAPI.check(tmpData);
      tmpData.cluster_info = data.data;
      const { cluster_info } = tmpData;
      // Updates the cluster-information in the registry 
      const tmpUrl = `/hosts/update-hostname/${id}`;
      await this.genericReq.request('PUT', tmpUrl, {
        cluster_info
      });
      this.$scope.$emit('updateAPI', { cluster_info });
      this.apiEntries[index].cluster_info = cluster_info;
      this.wzMisc.setApiIsDown(false);
      this.apiIsDown = false;
      !silent && this.errorHandler.info('Connection success', 'Settings');
      //Force react props update
      this.apiTableProps.apiEntries = this.apiEntries;
      this.$scope.$applyAsync();
      return;
    } catch (error) {
      if (!this.wzMisc.getApiIsDown() && !silent) {
        this.printError(error);
      } else {
        if (!silent) {
          this.errorHandler.handle(error);
        } else {
          return Promise.reject(error);
        }
      }
    }
  }

  /**
   * This set the error, and checks if is updating
   * @param {*} error
   * @param {*} updating
   */
  printError(error, updating) {
    const text = this.errorHandler.handle(error, 'Settings');
    if (!updating) this.messageError = text;
    else this.messageErrorUpdate = text;
  }

  /**
   * Returns Wazuh app logs
   */
  async getAppLogs() {
    try {
      this.loadingLogs = true;
      const logs = await this.genericReq.request('GET', '/utils/logs', {});
      this.logs = logs.data.lastLogs.map(item => JSON.parse(item));
      this.loadingLogs = false;
      this.$scope.$applyAsync();
    } catch (error) {
      this.logs = [
        {
          date: new Date(),
          level: 'error',
          message: 'Error when loading Wazuh app logs'
        }
      ];
    }
  }

  /**
   * Returns Wazuh app info
   */
  async getAppInfo() {
    try {
      const data = await this.genericReq.request('GET', '/api/setup');
      const response = data.data.data;
      this.appInfo = {
        'app-version': response['app-version'],
        installationDate: response['installationDate'],
        revision: response['revision']
      };

      this.load = false;
      const config = this.wazuhConfig.getConfig();
      this.appState.setPatternSelector(config['ip.selector']);
      const pattern = this.appState.getCurrentPattern();
      this.selectedIndexPattern = pattern || config['pattern'];

      if (this.tab === 'logs') {
        this.getAppLogs();
      }

      this.getCurrentAPIIndex();
      if ((this.currentApiEntryIndex || this.currentApiEntryIndex === 0) && this.currentApiEntryIndex >= 0) {
        await this.checkManager(this.currentApiEntryIndex, true, true);
      }
      this.$scope.$applyAsync();
    } catch (error) {
      this.errorHandler.handle(
        'Error when loading Wazuh setup info',
        'Settings'
      );
    }
    return;
  }

  /**
   * This ask again for wazuh logs
   */
  refreshLogs() {
    return this.getAppLogs();
  }

  /**
   * This get the string equivalence for a given key
   * @param {String} key
   */
  configEquivalence(key) {
    return configEquivalences[key] || '-';
  }

  /**
   * Cancel edition of a configuration entry
   */
  cancelEditingKey() {
    this.editingKey = false;
    this.editingNewValue = '';
  }

  /**
   * Enable edition for a given key
   * @param {String} key Configuration key
   */
  setEditingKey(key, value) {
    if (typeof value === 'object') {
      try {
        value = JSON.stringify(value);
      } catch (err) {
        this.errorHandler.handle('Error parsing value', key);
      }
    }
    this.editingKey = key;
    this.editingNewValue = value;
  }

  /**
   * Change value for a given configuration key
   * @param {String} key Configuration key
   * @param {String} value New configuration value for key
   */
  async editKey(key, value) {
    try {
      this.loadingChange = true;
      const data = await this.genericReq.request(
        'PUT',
        '/utils/configuration',
        { key, value }
      );
      const response = data.data.data;
      if (response) {
        this.errorHandler.handle(
          'You must restart Kibana for the changes to take effect',
          '',
          true
        );
      } else {
        this.errorHandler.info(
          'The configuration has been successfully updated'
        );
      }
      this.configuration[key] = value;
      this.cancelEditingKey();
      this.loadingChange = false;
    } catch (error) {
      this.cancelEditingKey();
      this.loadingChange = false;
      this.errorHandler.handle(error);
    }
  }

  /**
   * Checks if there are new APIs entries in the wazuh-hosts.yml
   */
  async checkForNewApis() {
    try {
      const result = await this.genericReq.request('GET', '/hosts/apis', {});
      const hosts = result.data || [];
      let numError = 0;
      //Tries to check if there are new APIs entries in the wazuh-hosts.yml also, checks if some of them have connection
      for (let idx in hosts) {
        const host = hosts[idx];
        const id = Object.keys(host)[0];
        const api = Object.assign(host[id], { id: id });
        delete api.password;
        try {
          await this.testAPI.check(api);
        } catch (error) {
          numError = numError + 1;
        }
      };
      // Check if any API had a success connection
      // TODO handle if some host has connection
      //hosts.length > numError && console.log('ok')
      return hosts;
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
