/*
 * Wazuh app - Module for Overview/AWS visualizations
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

export default [
  {
    _id: 'Wazuh-App-Agents-AWS-Top-5-rules',
    _type: 'visualization',
    _source: {
      title: i18n.translate('wazuh.server.integrationvis.agent.aws.Toprules', {
        defaultMessage: 'Top rules',
      }),
      visState: JSON.stringify({
        title: i18n.translate(
          'wazuh.server.integrationvis.agent.aws.Toprules',
          {
            defaultMessage: 'Top rules',
          },
        ),
        type: 'table',
        params: {
          perPage: 10,
          showPartialRows: false,
          showMetricsAtAllLevels: false,
          sort: { columnIndex: 2, direction: 'desc' },
          showTotal: false,
          showtoolbar: true,
          totalFunc: 'sum',
        },
        aggs: [
          {
            id: '1',
            enabled: true,
            type: 'count',
            schema: 'metric',
            params: {},
          },
          {
            id: '3',
            enabled: true,
            type: 'terms',
            schema: 'bucket',
            params: {
              field: 'rule.id',
              size: 500,
              order: 'desc',
              orderBy: '1',
              otherBucket: false,
              otherBucketLabel: 'Other',
              missingBucket: false,
              missingBucketLabel: 'Missing',
              customLabel: 'Rule ID',
            },
          },
          {
            id: '2',
            enabled: true,
            type: 'terms',
            schema: 'bucket',
            params: {
              field: 'rule.description',
              size: 10,
              order: 'desc',
              orderBy: '1',
              otherBucket: false,
              otherBucketLabel: 'Other',
              missingBucket: false,
              missingBucketLabel: 'Missing',
              customLabel: 'Event',
            },
          },
        ],
      }),
      uiStateJSON: JSON.stringify({
        vis: { params: { sort: { columnIndex: 2, direction: 'desc' } } },
      }),
      description: '',
      version: 1,
      kibanaSavedObjectMeta: {
        searchSourceJSON: JSON.stringify({
          index: 'wazuh-alerts',
          query: { query: '', language: 'lucene' },
          filter: [],
        }),
      },
    },
  },
  {
    _id: 'Wazuh-App-Agents-AWS-geo',
    _type: 'visualization',
    _source: {
      title: i18n.translate(
        'wazuh.server.integrationvis.agent.aws.Geolocationmap',
        {
          defaultMessage: 'Geolocation map',
        },
      ),
      visState: JSON.stringify({
        title: i18n.translate(
          'wazuh.server.integrationvis.agent.aws.Geolocationmap',
          {
            defaultMessage: 'Geolocation map',
          },
        ),
        type: 'tile_map',
        params: {
          colorSchema: 'Green to Red',
          mapType: 'Scaled Circle Markers',
          isDesaturated: false,
          addTooltip: true,
          heatClusterSize: 1.5,
          legendPosition: 'bottomright',
          mapZoom: 1,
          mapCenter: [0, 0],
          wms: {
            enabled: false,
            options: { format: 'image/png', transparent: true },
          },
          dimensions: {
            metric: {
              accessor: 1,
              format: { id: 'number' },
              params: {},
              aggType: 'count',
            },
            geohash: {
              accessor: 0,
              format: { id: 'string' },
              params: { precision: 2, useGeocentroid: true },
              aggType: 'geohash_grid',
            },
            geocentroid: {
              accessor: 2,
              format: { id: 'string' },
              params: {},
              aggType: 'geo_centroid',
            },
          },
        },
        aggs: [
          {
            id: '1',
            enabled: true,
            type: 'count',
            schema: 'metric',
            params: {},
          },
          {
            id: '2',
            enabled: true,
            type: 'geohash_grid',
            schema: 'segment',
            params: {
              field: 'GeoLocation.location',
              autoPrecision: true,
              precision: 2,
              useGeocentroid: true,
              isFilteredByCollar: true,
              mapZoom: 1,
              mapCenter: [0, 0],
            },
          },
        ],
      }),
      uiStateJSON: JSON.stringify({
        mapZoom: 2,
        mapCenter: [38.685509760012025, -31.816406250000004],
      }),
      description: '',
      version: 1,
      kibanaSavedObjectMeta: {
        searchSourceJSON: JSON.stringify({
          index: 'wazuh-alerts',
          query: { query: '', language: 'lucene' },
          filter: [],
        }),
      },
    },
  },
  {
    _id: 'Wazuh-App-Agents-AWS-Events-by-source',
    _type: 'visualization',
    _source: {
      title: i18n.translate('wazuh.server.integrationvis.agent.aws.eventTime', {
        defaultMessage: 'Events by source over time',
      }),
      visState: JSON.stringify({
        title: i18n.translate('wazuh.server.integrationvis.agent.aws.time', {
          defaultMessage: 'Alerts by action over time',
        }),
        type: 'area',
        params: {
          type: 'area',
          grid: {
            categoryLines: true,
            style: { color: '#eee' },
            valueAxis: 'ValueAxis-1',
          },
          categoryAxes: [
            {
              id: 'CategoryAxis-1',
              type: 'category',
              position: 'bottom',
              show: true,
              style: {},
              scale: { type: 'linear' },
              labels: { show: true, filter: true, truncate: 100 },
              title: {},
            },
          ],
          valueAxes: [
            {
              id: 'ValueAxis-1',
              name: i18n.translate(
                'wazuh.server.integrationvis.agent.aws.LeftAxis-1',
                {
                  defaultMessage: 'LeftAxis-1',
                },
              ),
              type: 'value',
              position: 'left',
              show: true,
              style: {},
              scale: { type: 'linear', mode: 'normal' },
              labels: { show: true, rotate: 0, filter: false, truncate: 100 },
              title: { text: 'Count' },
            },
          ],
          seriesParams: [
            {
              show: 'true',
              type: 'area',
              mode: 'stacked',
              data: { label: 'Count', id: '1' },
              drawLinesBetweenPoints: true,
              showCircles: true,
              interpolate: 'cardinal',
              valueAxis: 'ValueAxis-1',
            },
          ],
          addTooltip: true,
          addLegend: true,
          legendPosition: 'left',
          times: [],
          addTimeMarker: false,
        },
        aggs: [
          {
            id: '1',
            enabled: true,
            type: 'count',
            schema: 'metric',
            params: {},
          },
          {
            id: '2',
            enabled: true,
            type: 'date_histogram',
            schema: 'segment',
            params: {
              field: 'timestamp',
              timeRange: { from: 'now-24h', to: 'now', mode: 'quick' },
              useNormalizedEsInterval: true,
              interval: 'auto',
              time_zone: 'Europe/Berlin',
              drop_partials: false,
              customInterval: '2h',
              min_doc_count: 1,
              extended_bounds: {},
            },
          },
          {
            id: '3',
            enabled: true,
            type: 'terms',
            schema: 'group',
            params: {
              field: 'data.aws.source',
              size: 5,
              order: 'desc',
              orderBy: '1',
              otherBucket: false,
              otherBucketLabel: 'Other',
              missingBucket: false,
              missingBucketLabel: 'Missing',
            },
          },
        ],
      }),
      uiStateJSON: '{}',
      description: '',
      version: 1,
      kibanaSavedObjectMeta: {
        searchSourceJSON: JSON.stringify({
          index: 'wazuh-alerts',
          query: { query: '', language: 'lucene' },
          filter: [],
        }),
      },
    },
  },
  {
    _id: 'Wazuh-App-Agents-AWS-Top-accounts',
    _type: 'visualization',
    _source: {
      title: i18n.translate('wazuh.server.integrationvis.agent.aws.Accounts', {
        defaultMessage: 'Accounts',
      }),
      visState: JSON.stringify({
        title: i18n.translate(
          'wazuh.server.integrationvis.agent.aws.Accounts',
          {
            defaultMessage: 'Accounts',
          },
        ),
        type: 'pie',
        params: {
          type: 'pie',
          addTooltip: true,
          addLegend: true,
          legendPosition: 'right',
          isDonut: true,
          labels: {
            show: false,
            values: true,
            last_level: true,
            truncate: 100,
          },
        },
        aggs: [
          {
            id: '1',
            enabled: true,
            type: 'count',
            schema: 'metric',
            params: {},
          },
          {
            id: '2',
            enabled: true,
            type: 'terms',
            schema: 'segment',
            params: {
              field: 'data.aws.accountId',
              size: 5,
              order: 'desc',
              orderBy: '1',
              otherBucket: false,
              otherBucketLabel: 'Other',
              missingBucket: false,
              missingBucketLabel: 'Missing',
            },
          },
        ],
      }),
      uiStateJSON: '{}',
      description: '',
      version: 1,
      kibanaSavedObjectMeta: {
        searchSourceJSON: JSON.stringify({
          index: 'wazuh-alerts',
          query: { query: '', language: 'lucene' },
          filter: [],
        }),
      },
    },
  },
  {
    _id: 'Wazuh-App-Agents-AWS-Top-sources',
    _type: 'visualization',
    _source: {
      title: i18n.translate('wazuh.server.integrationvis.agent.aws.Sources', {
        defaultMessage: 'Sources',
      }),
      visState: JSON.stringify({
        title: i18n.translate('wazuh.server.integrationvis.agent.aws.Sources', {
          defaultMessage: 'Sources',
        }),
        type: 'pie',
        params: {
          type: 'pie',
          addTooltip: true,
          addLegend: true,
          legendPosition: 'right',
          isDonut: true,
          labels: {
            show: false,
            values: true,
            last_level: true,
            truncate: 100,
          },
        },
        aggs: [
          {
            id: '1',
            enabled: true,
            type: 'count',
            schema: 'metric',
            params: {},
          },
          {
            id: '2',
            enabled: true,
            type: 'terms',
            schema: 'segment',
            params: {
              field: 'data.aws.source',
              size: 5,
              order: 'desc',
              orderBy: '1',
              otherBucket: false,
              otherBucketLabel: 'Other',
              missingBucket: false,
              missingBucketLabel: 'Missing',
            },
          },
        ],
      }),
      uiStateJSON: '{}',
      description: '',
      version: 1,
      kibanaSavedObjectMeta: {
        searchSourceJSON: JSON.stringify({
          index: 'wazuh-alerts',
          query: { query: '', language: 'lucene' },
          filter: [],
        }),
      },
    },
  },
  {
    _id: 'Wazuh-App-Agents-AWS-Top-buckets',
    _type: 'visualization',
    _source: {
      title: i18n.translate('wazuh.server.integrationvis.agent.aws.Buckets', {
        defaultMessage: 'Buckets',
      }),
      visState: JSON.stringify({
        title: i18n.translate('wazuh.server.integrationvis.agent.aws.Buckets', {
          defaultMessage: 'Buckets',
        }),
        type: 'pie',
        params: {
          type: 'pie',
          addTooltip: true,
          addLegend: true,
          legendPosition: 'right',
          isDonut: true,
          labels: {
            show: false,
            values: true,
            last_level: true,
            truncate: 100,
          },
        },
        aggs: [
          {
            id: '1',
            enabled: true,
            type: 'count',
            schema: 'metric',
            params: {},
          },
          {
            id: '2',
            enabled: true,
            type: 'terms',
            schema: 'segment',
            params: {
              field: 'data.aws.log_info.s3bucket',
              size: 5,
              order: 'desc',
              orderBy: '1',
              otherBucket: false,
              otherBucketLabel: 'Other',
              missingBucket: false,
              missingBucketLabel: 'Missing',
            },
          },
        ],
      }),
      uiStateJSON: '{}',
      description: '',
      version: 1,
      kibanaSavedObjectMeta: {
        searchSourceJSON: JSON.stringify({
          index: 'wazuh-alerts',
          query: { query: '', language: 'lucene' },
          filter: [],
        }),
      },
    },
  },
  {
    _id: 'Wazuh-App-Agents-AWS-Top-regions',
    _type: 'visualization',
    _source: {
      title: i18n.translate('wazuh.server.integrationvis.agent.aws.Regions', {
        defaultMessage: 'Regions',
      }),
      visState: JSON.stringify({
        title: i18n.translate('wazuh.server.integrationvis.agent.aws.Regions', {
          defaultMessage: 'Regions',
        }),
        type: 'pie',
        params: {
          type: 'pie',
          addTooltip: true,
          addLegend: true,
          legendPosition: 'right',
          isDonut: true,
          labels: {
            show: false,
            values: true,
            last_level: true,
            truncate: 100,
          },
        },
        aggs: [
          {
            id: '1',
            enabled: true,
            type: 'count',
            schema: 'metric',
            params: {},
          },
          {
            id: '2',
            enabled: true,
            type: 'terms',
            schema: 'segment',
            params: {
              field: 'data.aws.region',
              size: 5,
              order: 'desc',
              orderBy: '1',
              otherBucket: false,
              otherBucketLabel: 'Other',
              missingBucket: false,
              missingBucketLabel: 'Missing',
            },
          },
        ],
      }),
      uiStateJSON: '{}',
      description: '',
      version: 1,
      kibanaSavedObjectMeta: {
        searchSourceJSON: JSON.stringify({
          index: 'wazuh-alerts',
          query: { query: '', language: 'lucene' },
          filter: [],
        }),
      },
    },
  },
  {
    _id: 'Wazuh-App-Agents-AWS-Events-by-s3-bucket',
    _type: 'visualization',
    _source: {
      title: i18n.translate('wazuh.server.integrationvis.agent.aws.overtime', {
        defaultMessage: 'Events by S3 bucket over time',
      }),
      visState: JSON.stringify({
        title: i18n.translate('wazuh.server.integrationvis.agent.aws.alert', {
          defaultMessage: 'Alerts by action over time',
        }),
        type: 'area',
        params: {
          type: 'area',
          grid: {
            categoryLines: true,
            style: { color: '#eee' },
            valueAxis: 'ValueAxis-1',
          },
          categoryAxes: [
            {
              id: 'CategoryAxis-1',
              type: 'category',
              position: 'bottom',
              show: true,
              style: {},
              scale: { type: 'linear' },
              labels: { show: true, filter: true, truncate: 100 },
              title: {},
            },
          ],
          valueAxes: [
            {
              id: 'ValueAxis-1',
              name: i18n.translate(
                'wazuh.server.integrationvis.agent.aws.LeftAxis-1',
                {
                  defaultMessage: 'LeftAxis-1',
                },
              ),
              type: 'value',
              position: 'left',
              show: true,
              style: {},
              scale: { type: 'linear', mode: 'normal' },
              labels: { show: true, rotate: 0, filter: false, truncate: 100 },
              title: { text: 'Count' },
            },
          ],
          seriesParams: [
            {
              show: 'true',
              type: 'area',
              mode: 'stacked',
              data: { label: 'Count', id: '1' },
              drawLinesBetweenPoints: true,
              showCircles: true,
              interpolate: 'cardinal',
              valueAxis: 'ValueAxis-1',
            },
          ],
          addTooltip: true,
          addLegend: true,
          legendPosition: 'right',
          times: [],
          addTimeMarker: false,
        },
        aggs: [
          {
            id: '1',
            enabled: true,
            type: 'count',
            schema: 'metric',
            params: {},
          },
          {
            id: '2',
            enabled: true,
            type: 'date_histogram',
            schema: 'segment',
            params: {
              field: 'timestamp',
              timeRange: { from: 'now-24h', to: 'now', mode: 'quick' },
              useNormalizedEsInterval: true,
              interval: 'auto',
              time_zone: 'Europe/Berlin',
              drop_partials: false,
              customInterval: '2h',
              min_doc_count: 1,
              extended_bounds: {},
            },
          },
          {
            id: '3',
            enabled: true,
            type: 'terms',
            schema: 'group',
            params: {
              field: 'data.aws.log_info.s3bucket',
              size: 5,
              order: 'desc',
              orderBy: '1',
              otherBucket: false,
              otherBucketLabel: 'Other',
              missingBucket: false,
              missingBucketLabel: 'Missing',
            },
          },
        ],
      }),
      uiStateJSON: '{}',
      description: '',
      version: 1,
      kibanaSavedObjectMeta: {
        searchSourceJSON: JSON.stringify({
          index: 'wazuh-alerts',
          query: { query: '', language: 'lucene' },
          filter: [],
        }),
      },
    },
  },
  {
    _id: 'Wazuh-App-Agents-AWS-Alerts-summary',
    _type: 'visualization',
    _source: {
      title: i18n.translate(
        'wazuh.server.integrationvis.agent.aws.alertSummary',
        {
          defaultMessage: 'Alerts summary',
        },
      ),
      visState: JSON.stringify({
        title: i18n.translate(
          'wazuh.server.integrationvis.agent.aws.alertSummary',
          {
            defaultMessage: 'Alerts summary',
          },
        ),
        type: 'table',
        params: {
          perPage: 10,
          showPartialRows: false,
          showMeticsAtAllLevels: false,
          sort: { columnIndex: 3, direction: 'desc' },
          showTotal: false,
          showToolbar: true,
          totalFunc: 'sum',
        },
        aggs: [
          {
            id: '1',
            enabled: true,
            type: 'count',
            schema: 'metric',
            params: {},
          },
          {
            id: '2',
            enabled: true,
            type: 'terms',
            schema: 'bucket',
            params: {
              field: 'rule.id',
              otherBucket: false,
              otherBucketLabel: 'Other',
              missingBucket: false,
              missingBucketLabel: 'Missing',
              size: 50,
              order: 'desc',
              orderBy: '1',
              customLabel: 'Rule ID',
            },
          },
          {
            id: '3',
            enabled: true,
            type: 'terms',
            schema: 'bucket',
            params: {
              field: 'rule.description',
              otherBucket: false,
              otherBucketLabel: 'Other',
              missingBucket: false,
              missingBucketLabel: 'Missing',
              size: 1,
              order: 'desc',
              orderBy: '1',
              customLabel: 'Description',
            },
          },
          {
            id: '4',
            enabled: true,
            type: 'terms',
            schema: 'bucket',
            params: {
              field: 'rule.level',
              otherBucket: false,
              otherBucketLabel: 'Other',
              missingBucket: false,
              missingBucketLabel: 'Missing',
              size: 1,
              order: 'desc',
              orderBy: '1',
              customLabel: 'Level',
            },
          },
        ],
      }),
      uiStateJSON: JSON.stringify({
        vis: { params: { sort: { columnIndex: 3, direction: 'desc' } } },
      }),
      description: '',
      version: 1,
      kibanaSavedObjectMeta: {
        searchSourceJSON: JSON.stringify({
          index: 'wazuh-alerts',
          filter: [],
          query: { query: '', language: 'lucene' },
        }),
      },
    },
  },
];
