/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
import React from 'react';
import { i18n } from '@kbn/i18n';

interface Props {
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  onPageNext: () => void;
  onPagePrevious: () => void;
}

export function ToolBarPagerButtons(props: Props) {
  return (
    <div className="kuiButtonGroup">
      <button
        className="kuiButton kuiButton--basic kuiButton--icon"
        onClick={() => props.onPagePrevious()}
        disabled={!props.hasPreviousPage}
        data-test-subj="btnPrevPage"
        aria-label={i18n.translate(
          'wazuh.discover.docTable.pager.toolbarPagerButtons.previousButtonAriaLabel',
          {
            defaultMessage: 'Previous page in table',
          }
        )}
      >
        <span className="kuiButton__icon kuiIcon fa-chevron-left" />
      </button>
      <button
        className="kuiButton kuiButton--basic kuiButton--icon"
        onClick={() => props.onPageNext()}
        disabled={!props.hasNextPage}
        data-test-subj="btnNextPage"
        aria-label={i18n.translate(
          'wazuh.discover.docTable.pager.toolbarPagerButtons.nextButtonAriaLabel',
          {
            defaultMessage: 'Next page in table',
          }
        )}
      >
        <span className="kuiButton__icon kuiIcon fa-chevron-right" />
      </button>
    </div>
  );
}
