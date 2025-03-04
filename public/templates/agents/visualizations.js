/*
 * Wazuh app - Tab name equivalence
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
export const visualizations = {
  general: {
    rows: [
      {
        height: 400,
        vis: [
          {
            title: i18n.translate(
              'wazuh.templates.agents.rows.general.alertGroupTitle',
              {
                defaultMessage: 'Alert groups evolution',
              },
            ),
            id: 'Wazuh-App-Agents-General-Alert-groups-evolution',
            width: 50,
          },
          {
            title: i18n.translate(
              'wazuh.templates.agents.rows.general.agentGeneralAlertTitle',
              {
                defaultMessage: 'Alerts',
              },
            ),
            id: 'Wazuh-App-Agents-General-Alerts',
            width: 50,
          },
        ],
      },
      {
        height: 300,
        vis: [
          {
            title: i18n.translate('wazuh.templates.agents.rows.general.top5Agents', {
              defaultMessage: 'Top 5 agents',
            }),
            id: 'Wazuh-App-Agents-General-Top-5-alerts',
            width: 33,
          },
          {
            title: i18n.translate(
              'wazuh.templates.agents.rows.general.top5RuleGroups',
              {
                defaultMessage: 'Top 5 rule groups',
              },
            ),
            id: 'Wazuh-App-Agents-General-Top-10-groups',
            width: 33,
          },
          {
            title: i18n.translate(
              'wazuh.templates.agents.rows.general.topRequirements',
              {
                defaultMessage: 'Top 5 PCI DSS Requirements',
              },
            ),
            id: 'Wazuh-App-Agents-General-Top-5-PCI-DSS-Requirements',
            width: 33,
          },
        ],
      },
      {
        hide: true,
        vis: [
          {
            title: i18n.translate(
              'wazuh.templates.agents.rows.general.alertSummary',
              {
                defaultMessage: 'Alerts summary',
              },
            ),
            id: 'Wazuh-App-Agents-General-Alerts-summary',
            width: 60,
          },
          {
            title: i18n.translate(
              'wazuh.templates.agents.rows.general.groupSummary',
              {
                defaultMessage: 'Groups summary',
              },
            ),
            id: 'Wazuh-App-Agents-General-Groups-summary',
            width: 40,
          },
        ],
      },
    ],
  },
  fim: {
    rows: [
      {
        height: 300,
        vis: [
          {
            title: i18n.translate('wazuh.templates.agents.rows.fim.activeUsers', {
              defaultMessage: 'Most active users',
            }),
            id: 'Wazuh-App-Agents-FIM-Users',
            width: 30,
          },
          {
            title: i18n.translate('wazuh.templates.agents.rows.fim.actions', {
              defaultMessage: 'Actions',
            }),
            id: 'Wazuh-App-Agents-FIM-Actions',
            width: 30,
          },
          {
            title: i18n.translate('wazuh.templates.agents.rows.fim.events', {
              defaultMessage: 'Events',
            }),
            id: 'Wazuh-App-Agents-FIM-Events',
            width: 40,
          },
        ],
      },
      {
        height: 230,
        vis: [
          {
            title: i18n.translate('wazuh.templates.agents.rows.fim.fileAdded', {
              defaultMessage: 'Files added',
            }),
            id: 'Wazuh-App-Agents-FIM-Files-added',
            width: 33,
          },
          {
            title: i18n.translate('wazuh.templates.agents.rows.fim.filesModified', {
              defaultMessage: 'Files modified',
            }),
            id: 'Wazuh-App-Agents-FIM-Files-modified',
            width: 33,
          },
          {
            title: i18n.translate('wazuh.templates.agents.rows.fim.filesDeleted', {
              defaultMessage: 'Files deleted',
            }),
            id: 'Wazuh-App-Agents-FIM-Files-deleted',
            width: 33,
          },
        ],
      },
      {
        hide: true,
        vis: [
          {
            title: i18n.translate('wazuh.templates.agents.rows.fim.alertSummary', {
              defaultMessage: 'Alerts summary',
            }),
            id: 'Wazuh-App-Agents-FIM-Alerts-summary',
          },
        ],
      },
    ],
  },
  pci: {
    rows: [
      {
        height: 300,
        vis: [
          {
            title: i18n.translate('wazuh.templates.agents.rows.pci.topRuleGroups', {
              defaultMessage: 'Top 5 rule groups',
            }),
            id: 'Wazuh-App-Agents-PCI-Groups',
            width: 33,
          },
          {
            title: i18n.translate('wazuh.templates.agents.rows.pci.topRules', {
              defaultMessage: 'Top 5 rules',
            }),
            id: 'Wazuh-App-Agents-PCI-Rule',
            width: 33,
          },
          {
            title: i18n.translate('wazuh.templates.agents.rows.pci.topRequirements', {
              defaultMessage: 'Top 5 PCI DSS requirements',
            }),
            id: 'Wazuh-App-Agents-PCI-Requirement',
            width: 33,
          },
        ],
      },
      {
        height: 300,
        vis: [
          {
            title: i18n.translate('wazuh.templates.agents.rows.pci.requirements', {
              defaultMessage: 'PCI Requirements',
            }),
            id: 'Wazuh-App-Agents-PCI-Requirements',
            width: 70,
          },
          {
            title: i18n.translate('wazuh.templates.agents.rows.pci.distribution', {
              defaultMessage: 'Rule level distribution',
            }),
            id: 'Wazuh-App-Agents-PCI-Rule-level-distribution',
            width: 30,
          },
        ],
      },
      {
        hide: true,
        vis: [
          {
            title: i18n.translate('wazuh.templates.agents.rows.pci.alertSummary', {
              defaultMessage: 'Alerts summary',
            }),
            id: 'Wazuh-App-Agents-PCI-Last-alerts',
          },
        ],
      },
    ],
  },
  gdpr: {
    rows: [
      {
        height: 300,
        vis: [
          {
            title: i18n.translate('wazuh.templates.agents.rows.gdpr.topRuleGroups', {
              defaultMessage: 'Top 5 rule groups',
            }),
            id: 'Wazuh-App-Agents-GDPR-Groups',
            width: 33,
          },
          {
            title: i18n.translate('wazuh.templates.agents.rows.gdpr.topRules', {
              defaultMessage: 'Top 5 rules',
            }),
            id: 'Wazuh-App-Agents-GDPR-Rule',
            width: 33,
          },
          {
            title: i18n.translate(
              'wazuh.templates.agents.rows.gdpr.topRequirements',
              {
                defaultMessage: 'Top 5 GDPR requirements',
              },
            ),
            id: 'Wazuh-App-Agents-GDPR-Requirement',
            width: 33,
          },
        ],
      },
      {
        height: 300,
        vis: [
          {
            title: i18n.translate('wazuh.templates.agents.rows.gdpr.requirements', {
              defaultMessage: 'GDPR Requirements',
            }),
            id: 'Wazuh-App-Agents-GDPR-Requirements',
            width: 70,
          },
          {
            title: i18n.translate('wazuh.templates.agents.rows.gdpr.distribution', {
              defaultMessage: 'Rule level distribution',
            }),
            id: 'Wazuh-App-Agents-GDPR-Rule-level-distribution',
            width: 30,
          },
        ],
      },
      {
        hide: true,
        vis: [
          {
            title: i18n.translate('wazuh.templates.agents.rows.gdpr.alertSummary', {
              defaultMessage: 'Alerts summary',
            }),
            id: 'Wazuh-App-Agents-GDPR-Last-alerts',
          },
        ],
      },
    ],
  },
  nist: {
    rows: [
      {
        height: 300,
        vis: [
          {
            title: i18n.translate('wazuh.templates.agents.rows.nist.stats', {
              defaultMessage: 'Stats',
            }),
            id: 'Wazuh-App-Agents-NIST-Stats',
            width: 25,
          },
          {
            title: i18n.translate(
              'wazuh.templates.agents.rows.nist.topRequirements',
              {
                defaultMessage: 'Top 10 requirements',
              },
            ),
            id: 'Wazuh-App-Agents-NIST-top-10-requirements',
            width: 25,
          },
          {
            title: i18n.translate('wazuh.templates.agents.rows.nist.distribution', {
              defaultMessage: 'Requirements distributed by level',
            }),
            id: 'Wazuh-App-Agents-NIST-Requirement-by-level',
            width: 50,
          },
        ],
      },
      {
        height: 300,
        vis: [
          {
            title: i18n.translate('wazuh.templates.agents.rows.nist.requirements', {
              defaultMessage: 'Requirements over time',
            }),
            id: 'Wazuh-App-Agents-NIST-Requirements-stacked-overtime',
          },
        ],
      },
      {
        hide: true,
        vis: [
          {
            title: i18n.translate('wazuh.templates.agents.rows.nist.alertSummary', {
              defaultMessage: 'Alerts summary',
            }),
            id: 'Wazuh-App-Agents-NIST-Last-alerts',
          },
        ],
      },
    ],
  },
  tsc: {
    rows: [
      {
        height: 400,
        vis: [
          {
            title: i18n.translate('wazuh.templates.agents.rows.tsc.requirements', {
              defaultMessage: 'TSC requirements',
            }),
            id: 'Wazuh-App-Overview-TSC-requirements',
            width: 50,
          },
          {
            title: i18n.translate('wazuh.templates.agents.rows.tsc.topAgents', {
              defaultMessage: 'Top 10 agents by alerts number',
            }),
            id: 'Wazuh-App-Overview-TSC-Agents',
            width: 50,
          },
        ],
      },
      {
        height: 300,
        vis: [
          {
            title: i18n.translate('wazuh.templates.agents.rows.tsc.topRequirements', {
              defaultMessage: 'Top requirements over time',
            }),
            id: 'Wazuh-App-Overview-TSC-Requirements-over-time',
          },
        ],
      },
      {
        height: 530,
        vis: [
          {
            title: i18n.translate('wazuh.templates.agents.rows.tsc.lastAlert', {
              defaultMessage: 'Last alerts',
            }),
            id: 'Wazuh-App-Overview-TSC-Requirements-Agents-heatmap',
          },
        ],
      },
      {
        height: 255,
        vis: [
          {
            title: i18n.translate(
              'wazuh.templates.agents.rows.tsc.agentRequirement',
              {
                defaultMessage: 'Requirements by agent',
              },
            ),
            id: 'Wazuh-App-Overview-TSC-Requirements-by-agent',
          },
        ],
      },
      {
        hide: true,
        vis: [
          {
            title: i18n.translate('wazuh.templates.agents.rows.tsc.alertSummary', {
              defaultMessage: 'Alerts summary',
            }),
            id: 'Wazuh-App-Overview-TSC-Alerts-summary',
          },
        ],
      },
    ],
  },
  hipaa: {
    rows: [
      {
        height: 300,
        vis: [
          {
            title: i18n.translate(
              'wazuh.templates.agents.rows.hipaa.requirementsOverTime',
              {
                defaultMessage: 'Requirements over time',
              },
            ),
            id: 'Wazuh-App-Agents-HIPAA-Requirements-Stacked-Overtime',
            width: 50,
          },
          {
            title: i18n.translate(
              'wazuh.templates.agents.rows.hipaa.topRequirements',
              {
                defaultMessage: 'Top 10 requirements',
              },
            ),
            id: 'Wazuh-App-Agents-HIPAA-top-10',
            width: 50,
          },
        ],
      },
      {
        height: 300,
        vis: [
          {
            title: i18n.translate('wazuh.templates.agents.rows.hipaa.requirements', {
              defaultMessage: 'HIPAA requirements',
            }),
            id: 'Wazuh-App-Agents-HIPAA-Burbles',
            width: 45,
          },
          {
            title: i18n.translate('wazuh.templates.agents.rows.hipaa.distribution', {
              defaultMessage: 'Requirements distribution by level',
            }),
            id: 'Wazuh-App-Agents-HIPAA-Distributed-By-Level',
            width: 30,
          },
          {
            title: i18n.translate('wazuh.templates.agents.rows.hipaa.commonAlert', {
              defaultMessage: 'Most common alerts',
            }),
            id: 'Wazuh-App-Agents-HIPAA-Most-Common',
            width: 25,
          },
        ],
      },
      {
        hide: true,
        vis: [
          {
            title: i18n.translate('wazuh.templates.agents.rows.hipaa.alertSummary', {
              defaultMessage: 'Alerts summary',
            }),
            id: 'Wazuh-App-Agents-HIPAA-Last-alerts',
          },
        ],
      },
    ],
  },
  virustotal: {
    rows: [
      {
        height: 250,
        vis: [
          {
            title: i18n.translate('wazuh.templates.agents.rows.virus.scannedFiles', {
              defaultMessage: 'Last scanned files',
            }),
            id: 'Wazuh-App-Agents-Virustotal-Last-Files-Pie',
            width: 33,
          },
          {
            title: i18n.translate(
              'wazuh.templates.agents.rows.virus.maliciousFiles',
              {
                defaultMessage: 'Malicious files alerts Evolution',
              },
            ),
            id: 'Wazuh-App-Agents-Virustotal-Malicious-Evolution',
            width: 67,
          },
        ],
      },
      {
        height: 570,
        vis: [
          {
            title: i18n.translate('wazuh.templates.agents.rows.virus.lastFiles', {
              defaultMessage: 'Last files',
            }),
            id: 'Wazuh-App-Agents-Virustotal-Files-Table',
          },
        ],
      },
      {
        hide: true,
        vis: [
          {
            title: i18n.translate('wazuh.templates.agents.rows.virus.alertSummary', {
              defaultMessage: 'Alerts summary',
            }),
            id: 'Wazuh-App-Agents-Virustotal-Alerts-summary',
          },
        ],
      },
    ],
  },
  osquery: {
    rows: [
      {
        height: 300,
        vis: [
          {
            title: i18n.translate('wazuh.templates.agents.rows.osquery.actions', {
              defaultMessage: 'Most common Osquery actions',
            }),
            id: 'Wazuh-App-Agents-Osquery-most-common-osquery-actions',
            width: 30,
          },
          {
            title: i18n.translate('wazuh.templates.agents.rows.osquery.evolution', {
              defaultMessage: 'Evolution of Osquery events per pack over time',
            }),
            id: 'Wazuh-App-Agents-Osquery-Evolution',
            width: 70,
          },
        ],
      },
      {
        height: 300,
        vis: [
          {
            title: i18n.translate('wazuh.templates.agents.rows.osquery.packs', {
              defaultMessage: 'Most common Osquery packs being used',
            }),
            id: 'Wazuh-App-Agents-Osquery-top-5-packs-being-used',
            width: 30,
          },
          {
            title: i18n.translate('wazuh.templates.agents.rows.osquery.rules', {
              defaultMessage: 'Most common rules',
            }),
            id: 'Wazuh-App-Agents-Osquery-monst-common-rules-being-fired',
            width: 70,
          },
        ],
      },
      {
        hide: true,
        vis: [
          {
            title: i18n.translate(
              'wazuh.templates.agents.rows.osquery.alertSummary',
              {
                defaultMessage: 'Alerts summary',
              },
            ),
            id: 'Wazuh-App-Overview-Osquery-Alerts-summary',
          },
        ],
      },
    ],
  },
  docker: {
    rows: [
      {
        height: 300,
        vis: [
          {
            title: i18n.translate('wazuh.templates.agents.rows.docker.images', {
              defaultMessage: 'Top 5 images',
            }),
            id: 'Wazuh-App-Agents-Docker-top-5-images',
            width: 25,
          },
          {
            title: i18n.translate('wazuh.templates.agents.rows.docker.events', {
              defaultMessage: 'Top 5 events',
            }),
            id: 'Wazuh-App-Agents-Docker-top-5-actions',
            width: 25,
          },
          {
            title: i18n.translate('wazuh.templates.agents.rows.docker.resources', {
              defaultMessage: 'Resources usage over time',
            }),
            id: 'Wazuh-App-Agents-Docker-Types-over-time',
            width: 50,
          },
        ],
      },
      {
        height: 300,
        vis: [
          {
            title: i18n.translate('wazuh.templates.agents.rows.docker.evolution', {
              defaultMessage: 'Events occurred evolution',
            }),
            id: 'Wazuh-App-Agents-Docker-Actions-over-time',
          },
        ],
      },
      {
        hide: true,
        vis: [
          {
            title: i18n.translate('wazuh.templates.agents.rows.docker.alertSummary', {
              defaultMessage: 'Alerts summary',
            }),
            id: 'Wazuh-App-Agents-Docker-Events-summary',
          },
        ],
      },
    ],
  },
  oscap: {
    rows: [
      {
        height: 230,
        vis: [
          {
            title: i18n.translate('wazuh.templates.agents.rows.oscap.scans', {
              defaultMessage: 'Top 5 Scans',
            }),
            id: 'Wazuh-App-Agents-OSCAP-Scans',
            width: 25,
          },
          {
            title: i18n.translate('wazuh.templates.agents.rows.oscap.profile', {
              defaultMessage: 'Top 5 Profiles',
            }),
            id: 'Wazuh-App-Agents-OSCAP-Profiles',
            width: 25,
          },
          {
            title: i18n.translate('wazuh.templates.agents.rows.oscap.content', {
              defaultMessage: 'Top 5 Content',
            }),
            id: 'Wazuh-App-Agents-OSCAP-Content',
            width: 25,
          },
          {
            title: i18n.translate('wazuh.templates.agents.rows.oscap.severity', {
              defaultMessage: 'Top 5 Severity',
            }),
            id: 'Wazuh-App-Agents-OSCAP-Severity',
            width: 25,
          },
        ],
      },
      {
        height: 230,
        vis: [
          {
            title: i18n.translate('wazuh.templates.agents.rows.oscap.evolution', {
              defaultMessage: 'Daily scans evolution',
            }),
            id: 'Wazuh-App-Agents-OSCAP-Daily-scans-evolution',
          },
        ],
      },
      {
        height: 250,
        vis: [
          {
            title: i18n.translate('wazuh.templates.agents.rows.oscap.alerts', {
              defaultMessage: 'Top 5 - Alerts',
            }),
            id: 'Wazuh-App-Agents-OSCAP-Top-5-Alerts',
            width: 50,
          },
          {
            title: i18n.translate('wazuh.templates.agents.rows.oscap.highRisk', {
              defaultMessage: 'Top 5 - High risk alerts',
            }),
            id: 'Wazuh-App-Agents-OSCAP-Top-5-High-risk-alerts',
            width: 50,
          },
        ],
      },
      {
        hide: true,
        vis: [
          {
            title: i18n.translate('wazuh.templates.agents.rows.oscap.alertSummary', {
              defaultMessage: 'Alerts summary',
            }),
            id: 'Wazuh-App-Agents-OSCAP-Last-alerts',
          },
        ],
      },
    ],
  },
  ciscat: {
    rows: [
      {
        height: 320,
        vis: [
          {
            title: i18n.translate('wazuh.templates.agents.rows.ciscat.groups', {
              defaultMessage: 'Top 5 CIS-CAT groups',
            }),
            id: 'Wazuh-app-Agents-CISCAT-top-5-groups',
            width: 60,
          },
          {
            title: i18n.translate('wazuh.templates.agents.rows.ciscat.evolution', {
              defaultMessage: 'Scan result evolution',
            }),
            id: 'Wazuh-app-Agents-CISCAT-scan-result-evolution',
            width: 40,
          },
        ],
      },
      {
        hide: true,
        vis: [
          {
            title: i18n.translate('wazuh.templates.agents.rows.ciscap.alertSummary', {
              defaultMessage: 'Alerts summary',
            }),
            id: 'Wazuh-app-Agents-CISCAT-alerts-summary',
          },
        ],
      },
    ],
  },
  pm: {
    rows: [
      {
        height: 290,
        vis: [
          {
            title: i18n.translate('wazuh.templates.agents.rows.pm.alert', {
              defaultMessage: 'Alerts over time',
            }),
            id: 'Wazuh-App-Agents-PM-Events-over-time',
            width: 50,
          },
          {
            title: i18n.translate('wazuh.templates.agents.rows.pm.distribution', {
              defaultMessage: 'Rule distribution',
            }),
            id: 'Wazuh-App-Agents-PM-Top-5-rules',
            width: 50,
          },
        ],
      },
      {
        height: 240,
        vis: [
          {
            title: i18n.translate('wazuh.templates.agents.rows.pm.evolution', {
              defaultMessage: 'Events per control type evolution',
            }),
            id: 'Wazuh-App-Agents-PM-Events-per-agent-evolution',
          },
        ],
      },
      {
        hide: true,
        vis: [
          {
            title: i18n.translate('wazuh.templates.agents.rows.pm.alertSummary', {
              defaultMessage: 'Alerts summary',
            }),
            id: 'Wazuh-App-Agents-PM-Alerts-summary',
          },
        ],
      },
    ],
  },
  audit: {
    rows: [
      {
        height: 250,
        vis: [
          {
            title: i18n.translate('wazuh.templates.agents.rows.audit.groups', {
              defaultMessage: 'Groups',
            }),
            id: 'Wazuh-App-Agents-Audit-Groups',
            width: 33,
          },
          {
            title: i18n.translate('wazuh.templates.agents.rows.audit.commands', {
              defaultMessage: 'Commands',
            }),
            id: 'Wazuh-App-Agents-Audit-Commands',
            width: 33,
          },
          {
            title: i18n.translate('wazuh.templates.agents.rows.audit.files', {
              defaultMessage: 'Files',
            }),
            id: 'Wazuh-App-Agents-Audit-Files',
            width: 33,
          },
        ],
      },
      {
        height: 310,
        vis: [
          {
            title: i18n.translate('wazuh.templates.agents.rows.audit.alert', {
              defaultMessage: 'Alerts over time',
            }),
            id: 'Wazuh-App-Agents-Audit-Alerts-over-time',
          },
        ],
      },
      {
        hide: true,
        vis: [
          {
            title: i18n.translate('wazuh.templates.agents.rows.audit.alertSummary', {
              defaultMessage: 'Alerts summary',
            }),
            id: 'Wazuh-App-Agents-Audit-Last-alerts',
          },
        ],
      },
    ],
  },
};
