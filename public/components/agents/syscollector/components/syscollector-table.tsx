import React, { useState } from 'react';
import {
  EuiPanel,
  EuiFlexGroup,
  EuiButtonEmpty,
  EuiFlexItem,
  EuiText,
  EuiLoadingSpinner,
  EuiFieldSearch,
  EuiHorizontalRule,
  EuiIcon,
  EuiBasicTable,
} from '@elastic/eui';
import { useApiRequest } from '../../../common/hooks/useApiRequest';
import { KeyEquivalence } from '../../../../../common/csv-key-equivalence';
import { AppState } from '../../../../react-services/app-state';
import { i18n } from '@kbn/i18n';

const filter = i18n.translate(
  'wazuh.public.components.agents.syscollector.comptable.filter',
  {
    defaultMessage: 'Filter',
  },
);

export function SyscollectorTable({ tableParams }) {
  const [params, setParams] = useState({ limit: 10, offset: 0 });
  const [pageIndex, setPageIndex] = useState(0);
  const [searchBarValue, setSearchBarValue] = useState('');
  const [pageSize, setPageSize] = useState(10);
  const [sortField, setSortField] = useState('');
  const [timerDelaySearch, setTimerDelaySearch] = useState<NodeJS.Timeout>();
  const [sortDirection, setSortDirection] = useState('');
  const [loading, data, error] = useApiRequest('GET', tableParams.path, params);

  const onTableChange = ({ page = {}, sort = {} }) => {
    const { index: pageIndex, size: pageSize } = page;
    const { field: sortField, direction: sortDirection } = sort;
    setPageIndex(pageIndex);
    setPageSize(pageSize);
    setSortField(sortField);
    setSortDirection(sortDirection);
    const field = sortField === 'os_name' ? '' : sortField;
    const direction = sortDirection === 'asc' ? '+' : '-';
    const newParams = {
      ...params,
      limit: pageSize,
      offset: Math.floor((pageIndex * pageSize) / params.limit) * params.limit,
      ...(!!field ? { sort: `${direction}${field}` } : {}),
    };

    setParams(newParams);
  };

  const buildColumns = () => {
    return (tableParams.columns || []).map(item => {
      return {
        field: item.id,
        name: KeyEquivalence[item.id] || item.id,
        sortable: typeof item.sortable !== 'undefined' ? item.sortable : true,
        width: item.width || undefined,
      };
    });
  };

  const columns = buildColumns();

  const pagination = {
    pageIndex: pageIndex,
    pageSize: pageSize,
    totalItemCount: data.total_affected_items || 0,
    pageSizeOptions: [10, 25, 50],
  };

  const sorting = {
    sort: {
      field: sortField,
      direction: sortDirection,
    },
  };

  const onChange = e => {
    const value = e.target.value;
    setSearchBarValue(value);
    timerDelaySearch && clearTimeout(timerDelaySearch);
    const timeoutId = setTimeout(() => {
      const newParams = { ...params, search: value };
      setParams(newParams);
      setPageIndex(0);
    }, 400);
    setTimerDelaySearch(timeoutId);
  };

  const getTotal = () => {
    if (loading)
      return (
        <>
          {'( '}
          <EuiLoadingSpinner></EuiLoadingSpinner>
          {' )'}
        </>
      );
    else return `(${data.total_affected_items})`;
  };

  const downloadCsv = async () => {
    await AppState.downloadCsv(
      tableParams.path,
      tableParams.exportFormatted,
      !!params.search ? [{ name: 'search', value: params.search }] : [],
    );
  };

  return (
    <EuiPanel paddingSize='m' style={{ margin: '12px 16px 12px 16px' }}>
      <EuiFlexGroup>
        <EuiFlexItem grow={false}>
          <span style={{ display: 'flex' }}>
            {' '}
            <EuiIcon
              type={tableParams.icon}
              style={{ marginTop: 3 }}
            ></EuiIcon>{' '}
            &nbsp;{' '}
            <EuiText>
              {tableParams.title} {tableParams.hasTotal ? getTotal() : ''}
            </EuiText>{' '}
          </span>
        </EuiFlexItem>
      </EuiFlexGroup>
      <EuiHorizontalRule margin='xs' />
      {tableParams.searchBar && (
        <EuiFlexGroup>
          <EuiFlexItem>
            <EuiFieldSearch
              placeholder={`${filter} ${tableParams.title.toLowerCase()}...`}
              value={searchBarValue}
              fullWidth={true}
              onChange={onChange}
              aria-label={`${filter} ${tableParams.title.toLowerCase()}...`}
            />
          </EuiFlexItem>
        </EuiFlexGroup>
      )}
      <EuiFlexGroup>
        <EuiFlexItem>
          <EuiBasicTable
            items={data.affected_items || []}
            columns={columns}
            pagination={pagination}
            loading={loading}
            error={error}
            sorting={sorting}
            onChange={onTableChange}
          />
        </EuiFlexItem>
      </EuiFlexGroup>
      {tableParams.exportFormatted && tableParams.columns && (
        <EuiFlexGroup>
          <EuiFlexItem grow={true} />
          <EuiFlexItem grow={false}>
            <EuiButtonEmpty onClick={downloadCsv} iconType='importAction'>
              {i18n.translate('wazuh.components.agent.fim.ivv.lib.csv', {
                defaultMessage: 'Download CSV',
              })}
            </EuiButtonEmpty>
          </EuiFlexItem>
        </EuiFlexGroup>
      )}
    </EuiPanel>
  );
}
