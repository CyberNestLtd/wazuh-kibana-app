/*
 * Wazuh app - React component for show configuration of AWS S3 - general tab.
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

import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import WzConfigurationSettingsTabSelector from '../util-components/configuration-settings-tab-selector';
import WzConfigurationSettingsGroup from '../util-components/configuration-settings-group';
import WzNoConfig from '../util-components/no-config';

import { renderValueNoThenEnabled, isString } from '../utils/utils';

import helpLinks from './help-links';

const mainSettings = [
  {
    field: 'disabled',
    label: i18n.translate(
      'wazuh.public.controller.management.config.aws.s3.general.amazon',
      {
        defaultMessage: 'Amazon S3 integration status',
      },
    ),
    render: renderValueNoThenEnabled,
  },
  {
    field: 'interval',
    label: i18n.translate(
      'wazuh.public.controller.management.config.aws.s3.general.frequency',
      {
        defaultMessage: 'Frequency for reading from S3 buckets',
      },
    ),
  },
  {
    field: 'run_on_start',
    label: i18n.translate(
      'wazuh.public.controller.management.config.aws.s3.general.start',
      {
        defaultMessage: 'Run on start',
      },
    ),
  },
  {
    field: 'remove_from_bucket',
    label: i18n.translate(
      'wazuh.public.controller.management.config.aws.s3.general.read',
      {
        defaultMessage: 'Remove bucket logs after being read',
      },
    ),
  },
  {
    field: 'skip_on_error',
    label: i18n.translate(
      'wazuh.public.controller.management.config.aws.s3.general.skip',
      {
        defaultMessage: "Skip logs that can't be processed",
      },
    ),
  },
];

class WzConfigurationAmazonS3General extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { currentConfig, wodleConfig } = this.props;
    return (
      <Fragment>
        {currentConfig &&
          currentConfig['wmodules-wmodules'] &&
          isString(currentConfig['wmodules-wmodules']) && (
            <WzNoConfig
              error={currentConfig['wmodules-wmodules']}
              help={helpLinks}
            />
          )}
        {currentConfig &&
          !wodleConfig['aws-s3'] &&
          !isString(currentConfig['wmodules-wmodules']) && (
            <WzNoConfig error='not-present' help={helpLinks} />
          )}
        {currentConfig && wodleConfig['aws-s3'] && (
          <WzConfigurationSettingsTabSelector
            title={i18n.translate(
              'wazuh.public.controller.management.config.aws.s3.general.main',
              {
                defaultMessage: 'Main settings',
              },
            )}
            description={i18n.translate(
              'wazuh.public.controller.management.config.aws.s3.general.common',
              {
                defaultMessage:
                  'Common settings applied to all Amazon S3 buckets',
              },
            )}
            currentConfig={wodleConfig}
            minusHeight={320}
            helpLinks={helpLinks}
          >
            <WzConfigurationSettingsGroup
              config={wodleConfig['aws-s3']}
              items={mainSettings}
            />
          </WzConfigurationSettingsTabSelector>
        )}
      </Fragment>
    );
  }
}

WzConfigurationAmazonS3General.propTypes = {
  // currentConfig: PropTypes.object.isRequired,
  wazuhNotReadyYet: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
};

export default WzConfigurationAmazonS3General;
