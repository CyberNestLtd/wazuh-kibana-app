/*
 * Wazuh app - React component for show configuration of Osquery.
 * Copyright (C) 2015-2022 Wazuh, Inc.
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * Find more information about this on the LICENSE file.
 */

import React, { Component, Fragment } from 'react';
import { i18n } from '@kbn/i18n';

import { EuiBasicTable } from '@elastic/eui';

import WzConfigurationSettingsTabSelector from '../util-components/configuration-settings-tab-selector';
import withWzConfig from '../util-hocs/wz-config';
import WzConfigurationSettingsGroup from '../util-components/configuration-settings-group';
import WzNoConfig from '../util-components/no-config';
import WzConfigurationSettingsHeader from '../util-components/configuration-settings-header';
import { isString, isArray, renderValueNoThenEnabled } from '../utils/utils';
import { wodleBuilder } from '../utils/builders';
import { webDocumentationLink } from '../../../../../../../common/services/web_documentation';

const mainSettings = [
  {
    field: 'disabled',
    label: i18n.translate(
      'wazuh.public.controller.management.config.osquery.status',
      {
        defaultMessage: 'Osquery integration status',
      },
    ),
    render: renderValueNoThenEnabled,
  },
  {
    field: 'run_daemon',
    label: i18n.translate(
      'wazuh.public.controller.management.config.osquery.daemon',
      {
        defaultMessage: 'Auto-run the Osquery daemon',
      },
    ),
  },
  {
    field: 'bin_path',
    label: i18n.translate(
      'wazuh.public.controller.management.config.osquery.executeable',
      {
        defaultMessage: 'Path to the Osquery executable',
      },
    ),
  },
  {
    field: 'log_path',
    label: i18n.translate(
      'wazuh.public.controller.management.config.osquery.resultFile',
      {
        defaultMessage: 'Path to the Osquery results log file',
      },
    ),
  },
  {
    field: 'config_path',
    label: i18n.translate(
      'wazuh.public.controller.management.config.osquery.configFile',
      {
        defaultMessage: 'Path to the Osquery configuration file',
      },
    ),
  },
  {
    field: 'add_labels',
    label: i18n.translate(
      'wazuh.public.controller.management.config.osquery.labels',
      {
        defaultMessage: 'Use defined labels as decorators',
      },
    ),
  },
];

const helpLinks = [
  {
    text: i18n.translate(
      'wazuh.public.controller.management.config.osquery.documentation',
      {
        defaultMessage: 'Osquery module documentation',
      },
    ),
    href: webDocumentationLink('user-manual/capabilities/osquery.html'),
  },
  {
    text: i18n.translate(
      'wazuh.public.controller.management.config.osquery.refence',
      {
        defaultMessage: 'Osquery module reference',
      },
    ),
    href: webDocumentationLink(
      'user-manual/reference/ossec-conf/wodle-osquery.html',
    ),
  },
];

const columns = [
  {
    field: 'name',
    name: i18n.translate(
      'wazuh.public.controller.management.config.osquery.Name',
      {
        defaultMessage: 'Name',
      },
    ),
  },
  {
    field: 'path',
    name: i18n.translate(
      'wazuh.public.controller.management.config.osquery.Path',
      {
        defaultMessage: 'Path',
      },
    ),
  },
];

class WzConfigurationOsquery extends Component {
  constructor(props) {
    super(props);
    this.wodleConfig = wodleBuilder(this.props.currentConfig, 'osquery');
  }
  componentDidMount() {
    this.props.updateBadge(this.badgeEnabled());
  }
  badgeEnabled() {
    return (
      this.wodleConfig &&
      this.wodleConfig.osquery &&
      this.wodleConfig.osquery.disabled === 'no'
    );
  }
  render() {
    const { currentConfig } = this.props;
    return (
      <Fragment>
        {currentConfig['wmodules-wmodules'] &&
          isString(currentConfig['wmodules-wmodules']) && (
            <WzNoConfig
              error={currentConfig['wmodules-wmodules']}
              help={helpLinks}
            />
          )}
        {currentConfig &&
          !this.wodleConfig.osquery &&
          !isString(currentConfig['wmodules-wmodules']) && (
            <WzNoConfig error='not-present' help={helpLinks} />
          )}
        {currentConfig && this.wodleConfig && this.wodleConfig.osquery && (
          <WzConfigurationSettingsTabSelector
            title={i18n.translate(
              'wazuh.public.controller.management.config.osquery.Mainsettings',
              {
                defaultMessage: 'Main settings',
              },
            )}
            description={i18n.translate(
              'wazuh.public.controller.management.config.osquery.intergration',
              {
                defaultMessage: 'General Osquery integration settings',
              },
            )}
            currentConfig={this.wodleConfig}
            minusHeight={this.props.agent.id === '000' ? 260 : 355}
            helpLinks={helpLinks}
          >
            <WzConfigurationSettingsGroup
              config={this.wodleConfig.osquery}
              items={mainSettings}
              ks
            />
            {this.wodleConfig.osquery.packs &&
              isArray(this.wodleConfig.osquery.packs) &&
              this.wodleConfig.osquery.packs.length && (
                <Fragment>
                  <WzConfigurationSettingsHeader
                    title={i18n.translate(
                      'wazuh.public.controller.management.config.osquery.packs',
                      {
                        defaultMessage: 'Osquery packs',
                      },
                    )}
                    description={i18n.translate(
                      'wazuh.public.controller.management.config.osquery.queries',
                      {
                        defaultMessage:
                          'A pack contains multiple queries to quickly retrieve system information',
                      },
                    )}
                  />
                  <EuiBasicTable
                    items={this.wodleConfig.osquery.packs}
                    columns={columns}
                  />
                </Fragment>
              )}
          </WzConfigurationSettingsTabSelector>
        )}
      </Fragment>
    );
  }
}

const sections = [{ component: 'wmodules', configuration: 'wmodules' }];

WzConfigurationOsquery.propTypes = {
  // currentConfig: PropTypes.object.isRequired
};

export default withWzConfig(sections)(WzConfigurationOsquery);
