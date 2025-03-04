/*
 * Wazuh app - React component for show configuration of log collection - logs tab.
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

import WzNoConfig from '../util-components/no-config';
import WzConfigurationSettingsTabSelector from '../util-components/configuration-settings-tab-selector';
import WzConfigurationListSelector from '../util-components/configuration-settings-list-selector';
import {
  isString,
  renderValueOrDefault,
  renderValueOrNoValue,
} from '../utils/utils';
import { settingsListBuilder } from '../utils/builders';
import { i18n } from '@kbn/i18n';

import helpLinks from './help-links';

const renderTargetField = item => (item ? item.join(', ') : 'agent');

const mainSettings = [
  {
    field: 'logformat',
    label: i18n.translate(
      'wazuh.public.controller.management.config.log.collection.logs.format',
      {
        defaultMessage: 'Log format',
      },
    ),
  },
  {
    field: 'file',
    label: i18n.translate(
      'wazuh.public.controller.management.config.log.collection.logs.location',
      {
        defaultMessage: 'Log location',
      },
    ),
    render: renderValueOrNoValue,
  },
  {
    field: 'only-future-events',
    label: i18n.translate(
      'wazuh.public.controller.management.config.log.collection.logs.occured',
      {
        defaultMessage: 'Only receive logs occured after start',
      },
    ),
    when: 'agent',
  },
  {
    field: 'reconnect_time',
    label: i18n.translate(
      'wazuh.public.controller.management.config.log.collection.logs.',
      {
        defaultMessage:
          'Time in seconds to try to reconnect with Windows Event Channel when it has fallen',
      },
    ),
    when: 'agent',
  },
  {
    field: 'query',
    label: i18n.translate(
      'wazuh.public.controller.management.config.log.collection.logs.XPATH',
      {
        defaultMessage: 'Filter logs using this XPATH query',
      },
    ),
    render: renderValueOrNoValue,
    when: 'agent',
  },
  {
    field: 'labels',
    label: i18n.translate(
      'wazuh.public.controller.management.config.log.collection.logs.after',
      {
        defaultMessage: 'Only receive logs occured after start',
      },
    ),
    render: renderValueOrNoValue,
    when: 'agent',
  },
  {
    field: 'target',
    label: i18n.translate(
      'wazuh.public.controller.management.config.log.collection.logs.socket',
      {
        defaultMessage: 'Redirect output to this socket',
      },
    ),
    render: renderTargetField,
  },
];

const getMainSettingsAgentOrManager = agent =>
  agent && agent.id === '000'
    ? mainSettings.filter(setting => setting.when !== 'agent')
    : mainSettings.filter(setting =>
        setting.when === 'agent'
          ? agent && agent.os && agent.os.platform === 'windows'
          : true,
      );
class WzConfigurationLogCollectionLogs extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { currentConfig, agent } = this.props;
    const items =
      currentConfig['logcollector-localfile'] &&
      currentConfig['logcollector-localfile']['localfile-logs']
        ? settingsListBuilder(
            currentConfig['logcollector-localfile']['localfile-logs'],
            [
              'file',
              'alias',
              'commnad',
              item =>
                `${item.logformat}${
                  item.target ? ` - ${item.target.join(', ')}` : ''
                }`,
            ],
          )
        : [];
    return (
      <Fragment>
        {currentConfig['logcollector-localfile'] &&
          isString(currentConfig['logcollector-localfile']) && (
            <WzNoConfig
              error={currentConfig['logcollector-localfile']}
              help={helpLinks}
            />
          )}
        {currentConfig['logcollector-localfile'] &&
        !isString(currentConfig['logcollector-localfile']) &&
        !(currentConfig['logcollector-localfile']['localfile-logs'] || [])
          .length ? (
          <WzNoConfig error='not-present' help={helpLinks} />
        ) : null}
        {currentConfig['logcollector-localfile'] &&
        !isString(currentConfig['logcollector-localfile']) &&
        currentConfig['logcollector-localfile']['localfile-logs'] &&
        currentConfig['logcollector-localfile']['localfile-logs'].length ? (
          <WzConfigurationSettingsTabSelector
            title={i18n.translate(
              'wazuh.public.controller.management.config.log.collection.logs.files',
              {
                defaultMessage: 'Logs files',
              },
            )}
            description={i18n.translate(
              'wazuh.public.controller.management.config.log.collection.logs.analyzed',
              {
                defaultMessage: 'List of log files that will be analyzed',
              },
            )}
            currentConfig={currentConfig}
            minusHeight={this.props.agent.id === '000' ? 320 : 415}
            helpLinks={helpLinks}
          >
            <WzConfigurationListSelector
              items={items}
              settings={getMainSettingsAgentOrManager(agent)}
            />
          </WzConfigurationSettingsTabSelector>
        ) : null}
      </Fragment>
    );
  }
}

WzConfigurationLogCollectionLogs.propTypes = {
  // currentConfig: PropTypes.object.isRequired
};

export default WzConfigurationLogCollectionLogs;
