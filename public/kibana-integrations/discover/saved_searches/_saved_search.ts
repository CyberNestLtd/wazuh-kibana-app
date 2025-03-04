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

import {
  SavedObject,
  SavedObjectsStart,
} from '../../../../../../src/plugins/saved_objects/public';
import { i18n } from '@kbn/i18n';

export function createSavedSearchClass(savedObjects: SavedObjectsStart) {
  class SavedSearch extends savedObjects.SavedObjectClass {
    public static type: string = 'search';
    public static mapping = {
      title: i18n.translate(
        'wazuh.public.kibana.intergrations.discover.saved.searches.text',
        {
          defaultMessage: 'text',
        },
      ),
      description: i18n.translate(
        'wazuh.public.kibana.intergrations.discover.saved.searches.text',
        {
          defaultMessage: 'text',
        },
      ),
      hits: 'integer',
      columns: 'keyword',
      sort: 'keyword',
      version: 'integer',
    };
    // Order these fields to the top, the rest are alphabetical
    public static fieldOrder = ['title', 'description'];
    public static searchSource = true;

    public id: string;
    public showInRecentlyAccessed: boolean;

    constructor(id: string) {
      super({
        id,
        type: 'search',
        mapping: {
          title: i18n.translate(
            'wazuh.public.kibana.intergrations.discover.saved.searches.text',
            {
              defaultMessage: 'text',
            },
          ),
          description: i18n.translate(
            'wazuh.public.kibana.intergrations.discover.saved.searches.text',
            {
              defaultMessage: 'text',
            },
          ),
          hits: 'integer',
          columns: 'keyword',
          sort: 'keyword',
          version: 'integer',
        },
        searchSource: true,
        defaults: {
          title: '',
          description: '',
          columns: [],
          hits: 0,
          sort: [],
          version: 1,
        },
      });
      this.showInRecentlyAccessed = true;
      this.id = id;
      this.getFullPath = () => `/app/discover#/view/${String(id)}`;
    }
  }

  return SavedSearch as new (id: string) => SavedObject;
}
