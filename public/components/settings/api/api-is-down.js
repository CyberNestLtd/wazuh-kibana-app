/*
 * Wazuh app - React component for the adding an API entry form.
 *
 * Copyright (C) 2015-2022 Wazuh, Inc.
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * Find more information about this on the LICENSE file.
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  EuiFlexGroup,
  EuiFlexItem,
  EuiCodeBlock,
  EuiText,
  EuiSpacer,
  EuiCode,
  EuiButton,
  EuiButtonEmpty,
  EuiSteps,
  EuiBasicTable,
  EuiHealth,
  EuiCallOut,
  EuiLoadingSpinner,
  EuiToolTip,
  EuiButtonIcon,
  EuiPanel,
} from '@elastic/eui';
import { withErrorBoundary } from '../../common/hocs';
import { UI_ERROR_SEVERITIES } from '../../../react-services/error-orchestrator/types';
import {
  UI_LOGGER_LEVELS,
  PLUGIN_PLATFORM_NAME,
} from '../../../../common/constants';
import { getErrorOrchestrator } from '../../../react-services/common-services';
import { getPluginDataPath } from '../../../../common/plugin';
import { i18n } from '@kbn/i18n';

const Title1 = i18n.translate(
  'wazuh.components.addModule.guide.wazuhApiServiceStatus',
  {
    defaultMessage: 'Check the Wazuh API service status',
  },
);
const name1 = i18n.translate('wazuh.public.components.setting.api.down.name1', {
  defaultMessage: 'ID',
});
const name2 = i18n.translate('wazuh.public.components.setting.api.down.name2', {
  defaultMessage: 'Host',
});
const name3 = i18n.translate('wazuh.public.components.setting.api.down.name3', {
  defaultMessage: 'Port',
});
export const ApiIsDown = withErrorBoundary(
  class ApiIsDown extends Component {
    constructor(props) {
      super(props);
      this.state = {
        status: 'incomplete',
        fetchingData: false,
        apiEntries: [],
        refreshingEntries: false,
      };
    }

    componentDidMount() {
      this.setState({
        apiEntries: [...this.props.apiEntries],
      });
    }

    /**
     * Checks again the connection in order to know the state of the API entries
     */
    async checkConnection() {
      try {
        let status = 'complete';
        this.setState({ error: false });
        const hosts = await this.props.getHosts();
        this.setState({
          fetchingData: true,
          refreshingEntries: true,
          apiEntries: hosts,
        });
        const entries = this.state.apiEntries;
        let numErr = 0;
        for (let idx in entries) {
          const entry = entries[idx];
          try {
            const data = await this.props.testApi(entry, true); // token refresh is forced
            const clusterInfo = data.data || {};
            const id = entries[idx].id;
            entries[idx].status = 'online';
            entries[idx].cluster_info = clusterInfo;
            //Updates the cluster info in the registry
            await this.props.updateClusterInfoInRegistry(id, clusterInfo);
            this.props.setDefault(entry);
          } catch (error) {
            numErr = numErr + 1;
            const code = ((error || {}).data || {}).code;
            const downReason =
              typeof error === 'string'
                ? error
                : (error || {}).message ||
                  ((error || {}).data || {}).message ||
                  'Wazuh is not reachable';
            const status = code === 3099 ? 'down' : 'unknown';
            entries[idx].status = { status, downReason };
          }
        }
        if (numErr) {
          status = numErr >= entries.length ? 'danger' : 'warning';
        }
        this.setState({
          apiEntries: entries,
          fetchingData: false,
          status: status,
          refreshingEntries: false,
        });
      } catch (error) {
        if (
          error &&
          error.data &&
          error.data.message &&
          error.data.code === 2001
        ) {
          this.setState({ error: error.data.message, status: 'danger' });
        }

        const options = {
          context: `${ApiIsDown.name}.checkConnection`,
          level: UI_LOGGER_LEVELS.ERROR,
          severity: UI_ERROR_SEVERITIES.UI,
          store: true,
          error: {
            error: error,
            message: error.message || error,
            title: error.message || error,
          },
        };

        getErrorOrchestrator().handleError(options);
      }
    }

    render() {
      const apiExample = `# Example Wazuh API configuration
hosts:
    - production:
        url: https://172.16.1.2
        port: 55000
        username: wazuh-wui
        password: wazuh-wui
        run_as: false
`;

      const checkConnectionChildren = (
        <div>
          <EuiText>
            {i18n.translate('wazuh.components.setting.api.down.that', {
              defaultMessage: 'Check that the ',
            })}
            {PLUGIN_PLATFORM_NAME}{' '}
            {i18n.translate('wazuh.components.setting.api.down.wazuhapi', {
              defaultMessage: 'server can reach the configured Wazuh API',
            })}
            (s).
          </EuiText>
          <EuiSpacer />
          <EuiButton
            onClick={async () => await this.checkConnection()}
            isLoading={this.state.fetchingData}
          >
            {i18n.translate('wazuh.components.setting.api.down.check', {
              defaultMessage: 'Check connection',
            })}
          </EuiButton>
          {this.state.status !== 'danger' &&
            this.state.status !== 'incomplete' && (
              <EuiButtonEmpty onClick={() => this.props.closeApiIsDown()}>
                {i18n.translate(
                  'wazuh.public.components.setting.api.down.Close',
                  {
                    defaultMessage: 'Close',
                  },
                )}
              </EuiButtonEmpty>
            )}
          <EuiSpacer />
          <EuiText>
            {i18n.translate('wazuh.components.setting.api.down.already', {
              defaultMessage: 'Already configured Wazuh API',
            })}
            (s)
          </EuiText>
          <EuiSpacer />
          {(!this.state.error && (
            <EuiBasicTable
              loading={this.state.refreshingEntries}
              items={this.state.apiEntries}
              columns={[
                { field: 'id', name: name1 },
                { field: 'url', name: name2 },
                { field: 'port', name: name3 },
                {
                  field: 'status',
                  name: i18n.translate(
                    'wazuh.public.components.setting.api.down.Status',
                    {
                      defaultMessage: 'Status',
                    },
                  ),
                  render: item => {
                    if (item) {
                      return item === 'online' ? (
                        <EuiHealth color='success'>
                          {i18n.translate(
                            'wazuh.components.setting.api.down.',
                            {
                              defaultMessage: 'Empty field',
                            },
                          )}
                          Online
                        </EuiHealth>
                      ) : item.status === 'down' ? (
                        <span>
                          <EuiHealth color='warning'>
                            {i18n.translate(
                              'wazuh.component.setting.api.down.Warning',
                              {
                                defaultMessage: 'Warning',
                              },
                            )}
                          </EuiHealth>
                          <EuiToolTip position='top' content={item.downReason}>
                            <EuiButtonIcon
                              color='primary'
                              style={{ marginTop: '-12px' }}
                              iconType='questionInCircle'
                              aria-label={i18n.translate(
                                'wazuh.public.components.setting.api.down.infoError',
                                {
                                  defaultMessage: 'Info about the error',
                                },
                              )}
                              onClick={() =>
                                this.props.copyToClipBoard(item.downReason)
                              }
                            />
                          </EuiToolTip>
                        </span>
                      ) : (
                        <span>
                          <EuiHealth color='danger'>
                            {i18n.translate(
                              'wazuh.component.setting.api.down.Offline',
                              {
                                defaultMessage: 'Offline',
                              },
                            )}
                          </EuiHealth>
                          <EuiToolTip position='top' content={item.downReason}>
                            <EuiButtonIcon
                              color='primary'
                              style={{ marginTop: '-12px' }}
                              iconType='questionInCircle'
                              aria-label={i18n.translate(
                                'wazuh.public.components.setting.api.down.error',
                                {
                                  defaultMessage: 'Info about the error',
                                },
                              )}
                              onClick={() =>
                                this.props.copyToClipBoard(item.downReason)
                              }
                            />
                          </EuiToolTip>
                        </span>
                      );
                    } else {
                      return (
                        <span>
                          <EuiLoadingSpinner size='s' />
                          <span>
                            &nbsp;&nbsp;
                            {i18n.translate(
                              'wazuh.public.components.setting.api.down.Checking',
                              {
                                defaultMessage: 'Checking',
                              },
                            )}
                          </span>
                        </span>
                      );
                    }
                  },
                },
              ]}
            />
          )) || (
            <EuiCallOut
              color='danger'
              iconType='cross'
              title={this.state.error}
            />
          )}
        </div>
      );

      const steps = [
        {
          title: Title1,
          children: (
            <div>
              <EuiText>
                {i18n.translate('wazuh.components.setting.api.down.systemd', {
                  defaultMessage: 'For Systemd',
                })}
              </EuiText>
              <EuiSpacer />
              <EuiCode>
                {i18n.translate('wazuh.components.setting.api.down.manager', {
                  defaultMessage: '$ sudo systemctl status wazuh-manager',
                })}
              </EuiCode>
              <EuiSpacer />
              <EuiText>
                {i18n.translate('wazuh.components.setting.api.down.sysv', {
                  defaultMessage: 'For SysV Init',
                })}
              </EuiText>
              <EuiSpacer />
              <EuiCode>
                {i18n.translate('wazuh.components.setting.api.down.sudo', {
                  defaultMessage: '$ sudo service wazuh-manager status',
                })}
              </EuiCode>
            </div>
          ),
        },
        {
          title: i18n.translate(
            'wazuh.public.components.setting.api.down.checkConfig',
            {
              defaultMessage: 'Check the configuration',
            },
          ),
          children: (
            <div>
              <EuiText>
                {i18n.translate('wazuh.components.setting.api.down.reviewset', {
                  defaultMessage: 'Review the settings in the',
                })}{' '}
                <EuiCode>{getPluginDataPath('config/wazuh.yml')}</EuiCode>{' '}
                {i18n.translate('wazuh.components.setting.api.down.file', {
                  defaultMessage: 'file.',
                })}
              </EuiText>
              <EuiSpacer />
              <EuiCodeBlock language='yaml'>{apiExample}</EuiCodeBlock>
            </div>
          ),
        },
        {
          title: i18n.translate(
            'wazuh.public.components.setting.api.down.test',
            {
              defaultMessage: 'Test the configuration',
            },
          ),
          children: checkConnectionChildren,
          status: this.state.status,
        },
      ];
      return (
        <EuiFlexGroup>
          <EuiFlexItem />
          <EuiFlexItem className='min-guide-width'>
            <EuiPanel>
              <EuiText>
                <h2>
                  {i18n.translate('wazuh.components.setting.api.down.wazuh', {
                    defaultMessage: ' Wazuh API seems to be down',
                  })}
                </h2>
              </EuiText>
              <EuiSpacer />
              <EuiSteps firstStepNumber={1} steps={steps} />
            </EuiPanel>
          </EuiFlexItem>
          <EuiFlexItem />
        </EuiFlexGroup>
      );
    }
  },
);

ApiIsDown.propTypes = {
  apiEntries: PropTypes.array,
  checkManager: PropTypes.func,
  setDefault: PropTypes.func,
  closeApiIsDown: PropTypes.func,
  updateClusterInfoInRegistry: PropTypes.func,
  getHosts: PropTypes.func,
  copyToClipboard: PropTypes.func,
};
