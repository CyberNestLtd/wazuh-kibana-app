import React, { useEffect, useState, useRef } from 'react';
import {
  EuiTitle,
  EuiFlyout,
  EuiFlyoutHeader,
  EuiFlyoutBody,
  EuiForm,
  EuiFormRow,
  EuiSpacer,
  EuiFlexGroup,
  EuiFlexItem,
  EuiComboBox,
  EuiFieldText,
  EuiOverlayMask,
  EuiOutsideClickDetector,
  EuiConfirmModal,
} from '@elastic/eui';
import { ErrorHandler } from '../../../../react-services/error-handler';
import { RuleEditor } from './rule-editor';
import RulesServices from '../../rules/services';
import RolesServices from '../../roles/services';
import { UI_LOGGER_LEVELS } from '../../../../../common/constants';
import { UI_ERROR_SEVERITIES } from '../../../../react-services/error-orchestrator/types';
import { getErrorOrchestrator } from '../../../../react-services/common-services';
import { WzFlyout } from '../../../common/flyouts';
import { i18n } from '@kbn/i18n';

export const RolesMappingCreate = ({
  closeFlyout,
  rolesEquivalences,
  roles,
  internalUsers,
  onSave,
  currentPlatform,
}) => {
  const [selectedRoles, setSelectedRoles] = useState<any[]>([]);
  const [ruleName, setRuleName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasChangeMappingRules, setHasChangeMappingRules] = useState(false);
  const [initialSelectedRoles] = useState<any[]>([]);
  const [initialRuleName] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const getRolesList = () => {
    const list = roles.map(item => {
      return { label: rolesEquivalences[item.id], id: item.id };
    });
    return list;
  };

  const createRule = async toSaveRule => {
    try {
      setIsLoading(true);
      const formattedRoles = selectedRoles.map(item => {
        return item.id;
      });
      const newRule = await RulesServices.CreateRule({
        name: ruleName,
        rule: toSaveRule,
      });
      await Promise.all(
        formattedRoles.map(
          async role => await RolesServices.AddRoleRules(role, [newRule.id]),
        ),
      );
      ErrorHandler.info('Role mapping was successfully created');
    } catch (error) {
      const options = {
        context: `${RolesMappingCreate.name}.createRule`,
        level: UI_LOGGER_LEVELS.ERROR,
        severity: UI_ERROR_SEVERITIES.BUSINESS,
        store: true,
        error: {
          error: error,
          message: error.message || error,
          title: error.name || error,
        },
      };
      getErrorOrchestrator().handleError(options);
    }
    onSave();
    closeFlyout(false);
  };

  let modal;
  if (isModalVisible) {
    modal = (
      <EuiOverlayMask>
        <EuiConfirmModal
          title={i18n.translate(
            'wazuh.public.components.security.role.mapping.create.Unsubmittedchanges',
            {
              defaultMessage: 'Unsubmitted changes',
            },
          )}
          onConfirm={() => {
            setIsModalVisible(false);
            closeFlyout(false);
            setHasChanges(false);
          }}
          onCancel={() => setIsModalVisible(false)}
          cancelButtonText={i18n.translate(
            'wazuh.public.components.security.role.mapping.create.no',
            {
              defaultMessage: "No, don't do it",
            },
          )}
          confirmButtonText={i18n.translate(
            'wazuh.public.components.security.role.mapping.create.yes',
            {
              defaultMessage: 'Yes, do it',
            },
          )}
        >
          <p style={{ textAlign: 'center' }}>
            {i18n.translate('wazuh.components.overview.unsaved', {
              defaultMessage:
                'There are unsaved changes. Are you sure you want to proceed?',
            })}
          </p>
        </EuiConfirmModal>
      </EuiOverlayMask>
    );
  }

  useEffect(() => {
    if (
      initialSelectedRoles.length != selectedRoles.length ||
      initialRuleName != ruleName ||
      hasChangeMappingRules
    ) {
      setHasChanges(true);
    } else {
      setHasChanges(false);
    }
  }, [selectedRoles, ruleName, hasChangeMappingRules]);

  const onClose = () => {
    hasChanges ? setIsModalVisible(true) : closeFlyout(false);
  };

  return (
    <>
      <WzFlyout flyoutProps={{ className: 'wzApp' }} onClose={onClose}>
        <EuiFlyoutHeader hasBorder={false}>
          <EuiTitle size='m'>
            <h2>
              {i18n.translate('wazuh.components.overview.mitre.mapping', {
                defaultMessage: 'Create new role mapping',
              })}{' '}
              &nbsp;
            </h2>
          </EuiTitle>
        </EuiFlyoutHeader>
        <EuiFlyoutBody>
          <EuiForm component='form' style={{ padding: 24 }}>
            <EuiFormRow
              label={i18n.translate(
                'wazuh.public.components.security.role.mapping.create.mappingName',
                {
                  defaultMessage: 'Role mapping name',
                },
              )}
              isInvalid={false}
              error={i18n.translate(
                'wazuh.public.components.security.role.mapping.create.provideRole',
                {
                  defaultMessage: 'Please provide a role mapping name',
                },
              )}
              helpText={i18n.translate(
                'wazuh.public.components.security.role.mapping.create.introName',
                {
                  defaultMessage: 'Introduce a name for this role mapping.',
                },
              )}
            >
              <EuiFieldText
                placeholder={i18n.translate(
                  'wazuh.public.components.security.role.mapping.create.rolesName',
                  {
                    defaultMessage: 'Role name',
                  },
                )}
                value={ruleName}
                onChange={e => setRuleName(e.target.value)}
              />
            </EuiFormRow>
            <EuiFormRow
              label={i18n.translate(
                'wazuh.public.components.security.role.mapping.create.roles',
                {
                  defaultMessage: 'Roles',
                },
              )}
              isInvalid={false}
              error={i18n.translate(
                'wazuh.public.components.security.role.mapping.create.selected',
                {
                  defaultMessage: 'At least one role must be selected.',
                },
              )}
              helpText={i18n.translate(
                'wazuh.public.components.security.role.mapping.create.assiginRoles',
                {
                  defaultMessage: 'Assign roles to your users.',
                },
              )}
            >
              <EuiComboBox
                placeholder={i18n.translate(
                  'wazuh.public.components.security.role.mapping.create.SelectRoles',
                  {
                    defaultMessage: 'Select roles',
                  },
                )}
                options={getRolesList()}
                isDisabled={false}
                selectedOptions={selectedRoles}
                onChange={roles => {
                  setSelectedRoles(roles);
                }}
                isClearable={true}
                data-test-subj='demoComboBox'
              />
            </EuiFormRow>
            <EuiSpacer />
          </EuiForm>
          <EuiFlexGroup style={{ padding: '0px 24px 24px 24px' }}>
            <EuiFlexItem>
              <RuleEditor
                save={rule => createRule(rule)}
                initialRule={false}
                isReserved={false}
                isLoading={isLoading}
                internalUsers={internalUsers}
                currentPlatform={currentPlatform}
                onFormChange={hasChange => {
                  setHasChangeMappingRules(hasChange);
                }}
              ></RuleEditor>
            </EuiFlexItem>
          </EuiFlexGroup>
        </EuiFlyoutBody>
      </WzFlyout>
      {modal}
    </>
  );
};
