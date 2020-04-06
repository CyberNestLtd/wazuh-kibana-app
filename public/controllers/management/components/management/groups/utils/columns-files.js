import React from 'react';
import { EuiToolTip, EuiButtonIcon } from '@elastic/eui';
import GroupsHandler from '../utils/groups-handler';
import beautifier from '../../../../../../utils/json-beautifier';

export default class GroupsFilesColumns {
  constructor(tableProps) {
    this.tableProps = tableProps;
    this.adminMode = this.tableProps.state.adminMode;

    const { itemDetail } = this.tableProps.state;
    this.groupsHandler = GroupsHandler;

    this.buildColumns = () => {
      this.columns = [
        {
          field: 'filename',
          name: 'File',
          align: 'left',
          sortable: true,
        },
        {
          field: 'hash',
          name: 'Checksum',
          align: 'left',
          sortable: true,
        },
      ];
      this.columns.push({
        name: 'Actions',
        align: 'left',
        render: item => {
          return (
            <div>
              <EuiToolTip position="top" content={`See file content`}>
                <EuiButtonIcon
                  aria-label="See file content"
                  iconType="eye"
                  onClick={async () => {
                    const result = await this.groupsHandler.getFileContent(
                      `/groups/${itemDetail.name}/files/${item.filename}/xml`
                    );

                    const isEditable = item.filename === 'agent.conf';
                    const data = !isEditable
                      ? typeof result === 'object' ? JSON.stringify(result, null, 2) : result.toString()
                      : this.autoFormat(result);
                    const file = {
                      name: item.filename,
                      content: data,
                      isEditable: isEditable,
                      groupName: itemDetail.name,
                    };
                    this.tableProps.updateFileContent(file);
                  }}
                  color="primary"
                />
              </EuiToolTip>
            </div>
          );
        },
      });
    };

    this.buildColumns();
  }

  autoFormat = xml => {
    var reg = /(>)\s*(<)(\/*)/g;
    var wsexp = / *(.*) +\n/g;
    var contexp = /(<.+>)(.+\n)/g;
    xml = xml
      .replace(reg, '$1\n$2$3')
      .replace(wsexp, '$1\n')
      .replace(contexp, '$1\n$2');
    var formatted = '';
    var lines = xml.split('\n');
    var indent = 0;
    var lastType = 'other';
    var transitions = {
      'single->single': 0,
      'single->closing': -1,
      'single->opening': 0,
      'single->other': 0,
      'closing->single': 0,
      'closing->closing': -1,
      'closing->opening': 0,
      'closing->other': 0,
      'opening->single': 1,
      'opening->closing': 0,
      'opening->opening': 1,
      'opening->other': 1,
      'other->single': 0,
      'other->closing': -1,
      'other->opening': 0,
      'other->other': 0,
    };

    for (var i = 0; i < lines.length; i++) {
      var ln = lines[i];
      if (ln.match(/\s*<\?xml/)) {
        formatted += ln + '\n';
        continue;
      }
      var single = Boolean(ln.match(/<.+\/>/)); // is this line a single tag? ex. <br />
      var closing = Boolean(ln.match(/<\/.+>/)); // is this a closing tag? ex. </a>
      var opening = Boolean(ln.match(/<[^!].*>/)); // is this even a tag (that's not <!something>)
      var type = single ? 'single' : closing ? 'closing' : opening ? 'opening' : 'other';
      var fromTo = lastType + '->' + type;
      lastType = type;
      var padding = '';

      indent += transitions[fromTo];
      for (var j = 0; j < indent; j++) {
        padding += '\t';
      }
      if (fromTo == 'opening->closing')
        formatted = formatted.substr(0, formatted.length - 1) + ln + '\n';
      // substr removes line break (\n) from prev loop
      else formatted += padding + ln + '\n';
    }
    return formatted.trim();
  };
}
