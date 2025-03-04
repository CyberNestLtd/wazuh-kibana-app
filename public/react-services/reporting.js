/*
 * Wazuh app - Reporting service
 * Copyright (C) 2015-2022 Wazuh, Inc.
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * Find more information about this on the LICENSE file.
 */
import { i18n } from '@kbn/i18n';

import $ from 'jquery';
import moment from 'moment';
import { WazuhConfig } from '../react-services/wazuh-config';
import { AppState } from './app-state';
import { WzRequest } from './wz-request';
import { Vis2PNG } from '../factories/vis2png';
import { RawVisualizations } from '../factories/raw-visualizations';
import { VisHandlers } from '../factories/vis-handlers';
import { getAngularModule, getDataPlugin, getToasts } from '../kibana-services';
import { UI_LOGGER_LEVELS } from '../../common/constants';
import { UI_ERROR_SEVERITIES } from './error-orchestrator/types';
import { getErrorOrchestrator } from './common-services';
const app = getAngularModule();
const Title1 = i18n.translate('wazuh.kibana-int.vis.error', {
  defaultMessage: 'Error configuring report',
});
export class ReportingService {
  constructor() {
    this.$rootScope = app.$injector.get('$rootScope');
    this.vis2png = new Vis2PNG();
    this.rawVisualizations = new RawVisualizations();
    this.visHandlers = new VisHandlers();
    this.wazuhConfig = new WazuhConfig();
  }

  showToast = (color, title, text, time) => {
    getToasts().add({
      color: color,
      title: title,
      text: text,
      toastLifeTimeMs: time,
    });
  };

  removeTableVis(visList) {
    const attributes = JSON.parse(visList.attributes.visState);
    return attributes.type !== 'table';
  }

  removeAgentStatusVis(idArray) {
    const monitoringEnabled =
      this.wazuhConfig.getConfig()['wazuh.monitoring.enabled'];
    if (!monitoringEnabled) {
      const visArray = idArray.filter(vis => {
        return vis !== 'Wazuh-App-Overview-General-Agents-status';
      });
      return visArray;
    }
    return idArray;
  }

  async startVis2Png(tab, agents = false, syscollectorFilters = null) {
    try {
      if (this.vis2png.isWorking()) {
        this.showToast('danger', 'Error', 'Report in progress', 4000);
        return;
      }
      this.$rootScope.reportBusy = true;
      this.$rootScope.reportStatus = 'Generating report...0%';
      this.$rootScope.$applyAsync();

      this.vis2png.clear();

      const rawVisualizations = this.rawVisualizations
        .getList()
        .filter(this.removeTableVis);

      let idArray = [];
      if (tab === 'general') {
        idArray = this.removeAgentStatusVis(
          rawVisualizations.map(item => item.id),
        );
      } else {
        idArray = rawVisualizations.map(item => item.id);
      }

      const visualizationIDList = [];
      for (const item of idArray) {
        const tmpHTMLElement = $(`#${item}`);
        if (tmpHTMLElement[0]) {
          this.vis2png.assignHTMLItem(item, tmpHTMLElement);
          visualizationIDList.push(item);
        }
      }

      const appliedFilters = await this.visHandlers.getAppliedFilters(
        syscollectorFilters,
      );

      const array = await this.vis2png.checkArray(visualizationIDList);

      const browserTimezone = moment.tz.guess(true);

      const data = {
        array,
        filters: appliedFilters.filters,
        time: appliedFilters.time,
        searchBar: appliedFilters.searchBar,
        tables: appliedFilters.tables,
        tab,
        section: agents ? 'agents' : 'overview',
        agents,
        browserTimezone,
        indexPatternTitle: (
          await getDataPlugin().indexPatterns.get(AppState.getCurrentPattern())
        ).title,
        apiId: JSON.parse(AppState.getCurrentAPI()).id,
      };

      const apiEndpoint =
        tab === 'syscollector'
          ? `/reports/agents/${agents}/inventory`
          : `/reports/modules/${tab}`;
      await WzRequest.genericReq('POST', apiEndpoint, data);

      this.$rootScope.reportBusy = false;
      this.$rootScope.reportStatus = false;
      this.$rootScope.$applyAsync();
      this.showToast(
        'success',
        'Created report',
        i18n.translate('wazuh.public.react.services.reporting.management', {
          defaultMessage: 'Success. Go to Wazuh > Management > Reporting',
        }),
        4000,
      );
      return;
    } catch (error) {
      this.$rootScope.reportBusy = false;
      this.$rootScope.reportStatus = false;
      this.$rootScope.$applyAsync();
      const options = {
        context: `${ReportingService.name}.startVis2Png`,
        level: UI_LOGGER_LEVELS.ERROR,
        severity: UI_ERROR_SEVERITIES.BUSINESS,
        store: true,
        error: {
          error: error,
          message: error.message || error,
          title: i18n.translate(
            'wazuh.public.react.services.reporting.ErrorCreating',
            {
              defaultMessage: 'Error creating the report',
            },
          ),
        },
      };
      getErrorOrchestrator().handleError(options);
    }
  }

  async startConfigReport(obj, type, components) {
    try {
      this.$rootScope.reportBusy = true;
      this.$rootScope.reportStatus = 'Generating PDF document...';
      this.$rootScope.$applyAsync();

      const browserTimezone = moment.tz.guess(true);

      const data = {
        filters: [
          type === 'agentConfig' ? { agent: obj.id } : { group: obj.name },
        ],
        browserTimezone,
        components,
        apiId: JSON.parse(AppState.getCurrentAPI()).id,
      };
      const apiEndpoint =
        type === 'agentConfig'
          ? `/reports/agents/${obj.id}`
          : `/reports/groups/${obj.name}`;
      await WzRequest.genericReq('POST', apiEndpoint, data);

      this.$rootScope.reportBusy = false;
      this.$rootScope.reportStatus = false;
      this.$rootScope.$applyAsync();
      this.showToast(
        'success',
        'Created report',
        i18n.translate('wazuh.public.react.services.reporting.management', {
          defaultMessage: 'Success. Go to Wazuh > Management > Reporting',
        }),
        4000,
      );
      return;
    } catch (error) {
      this.$rootScope.reportBusy = false;
      this.$rootScope.reportStatus = false;
      this.$rootScope.$applyAsync();
      const options = {
        context: `${ReportingService.name}.startConfigReport`,
        level: UI_LOGGER_LEVELS.ERROR,
        severity: UI_ERROR_SEVERITIES.BUSINESS,
        store: true,
        error: {
          error: error,
          message: error.message || error,
          title: Title1,
        },
      };
      this.$rootScope.$applyAsync();
      getErrorOrchestrator().handleError(options);
    }
  }
}
