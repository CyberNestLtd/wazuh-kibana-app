/*
 * Wazuh app - Table with search bar
 * Copyright (C) 2015-2022 Wazuh, Inc.
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * Find more information about this on the LICENSE file.
 */

import React, { useState, useEffect } from 'react';
import { EuiBasicTable } from '@elastic/eui';
import { UI_ERROR_SEVERITIES } from '../../../react-services/error-orchestrator/types';
import { UI_LOGGER_LEVELS } from '../../../../common/constants';
import { getErrorOrchestrator } from '../../../react-services/common-services';
import { i18n } from '@kbn/i18n';

const fatchingItems = i18n.translate(
  'wazuh.public.components.common.table.export.fatchingItems',
  {
    defaultMessage: ': Error fetching items',
  },
);
export function TableDefault({
  onSearch,
  tableColumns,
  tablePageSizeOptions = [15, 25, 50, 100],
  tableInitialSortingDirection = 'asc',
  tableInitialSortingField = '',
  tableProps = {},
  reload,
  endpoint,
}) {
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: tablePageSizeOptions[0],
  });

  const [sorting, setSorting] = useState({
    sort: {
      field: tableInitialSortingField,
      direction: tableInitialSortingDirection,
    },
  });

  function tableOnChange({ page = {}, sort = {} }) {
    const { index: pageIndex, size: pageSize } = page;
    const { field, direction } = sort;
    setPagination({
      pageIndex,
      pageSize,
    });
    setSorting({
      sort: {
        field,
        direction,
      },
    });
  }

  useEffect(() => {
    // Reset the page index when the endpoint changes.
    // This will cause that onSearch function is triggered because to changes in pagination in the another effect.
    setPagination({ pageIndex: 0, pageSize: pagination.pageSize });
  }, [endpoint]);

  useEffect(() => {
    (async function () {
      try {
        setLoading(true);
        const { items, totalItems } = await onSearch(
          endpoint,
          [],
          pagination,
          sorting,
        );
        setItems(items);
        setTotalItems(totalItems);
      } catch (error) {
        setItems([]);
        setTotalItems(0);
        const options = {
          context: `${TableDefault.name}.useEffect`,
          level: UI_LOGGER_LEVELS.ERROR,
          severity: UI_ERROR_SEVERITIES.BUSINESS,
          error: {
            error: error,
            message: error.message || error,
            title: `${error.name}${fatchingItems}`,
          },
        };
        getErrorOrchestrator().handleError(options);
      }
      setLoading(false);
    })();
  }, [endpoint, pagination, sorting, reload]);

  const tablePagination = {
    ...pagination,
    totalItemCount: totalItems,
    pageSizeOptions: tablePageSizeOptions,
  };
  return (
    <EuiBasicTable
      columns={tableColumns}
      items={items}
      loading={loading}
      pagination={tablePagination}
      sorting={sorting}
      onChange={tableOnChange}
      {...tableProps}
    />
  );
}
