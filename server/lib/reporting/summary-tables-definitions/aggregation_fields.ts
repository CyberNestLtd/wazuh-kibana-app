export const AggregationFields = {
  'rule.id': {
    field: 'rule.id',
    size: 50,
    order: 'desc',
    orderBy: '1',
    customLabel: 'Rule ID',
  },
  'rule.description': {
    field: 'rule.description',
    size: 20,
    order: 'desc',
    orderBy: '1',
    customLabel: 'Description',
  },
  'rule.level': {
    field: 'rule.level',
    size: 12,
    order: 'desc',
    orderBy: '1',
    customLabel: 'Level',
  },
  'rule.groups': {
    field: 'rule.groups',
    size: 50,
    order: 'desc',
    orderBy: '1',
    customLabel: 'Groups',
  },
  'agent.name': {
    field: 'agent.name',
    size: 1000,
    order: 'desc',
    orderBy: '1',
    customLabel: 'Agent name',
  },
  'syscheck.path': {
    field: 'syscheck.path',
    size: 20,
    order: 'desc',
    orderBy: '1',
    customLabel: 'Path',
  },
  'syscheck.event': {
    field: 'syscheck.event',
    size: 12,
    order: 'desc',
    orderBy: '1',
    customLabel: 'Action',
  },
  'rule.pci_dss': {
    field: 'rule.pci_dss',
    size: 10,
    order: 'desc',
    orderBy: '1',
    customLabel: 'Requirement',
  },
  'rule.gdpr': {
    field: 'rule.gdpr',
    size: 10,
    order: 'desc',
    orderBy: '1',
    customLabel: 'Requirement',
  },
  'rule.nist_800_53': {
    field: 'rule.nist_800_53',
    size: 10,
    order: 'desc',
    orderBy: '1',
    customLabel: 'Requirement',
  },
  'rule.hipaa': {
    field: 'rule.hipaa',
    size: 10,
    order: 'desc',
    orderBy: '1',
    customLabel: 'Requirement',
  },
  'rule.tsc': {
    field: 'rule.tsc',
    size: 10,
    order: 'desc',
    orderBy: '1',
    customLabel: 'Requirement',
  },
  'data.audit.exe': {
    field: 'data.audit.exe',
    otherBucket: false,
    otherBucketLabel: 'Other',
    missingBucket: false,
    missingBucketLabel: 'Missing',
    size: 10,
    order: 'desc',
    orderBy: '1',
    customLabel: 'Command',
  },
  'data.audit.type': {
    field: 'data.audit.type',
    otherBucket: false,
    otherBucketLabel: 'Other',
    missingBucket: false,
    missingBucketLabel: 'Missing',
    size: 5,
    order: 'desc',
    orderBy: '1',
    customLabel: 'Type',
  },
  'data.osquery.name': {
    field: 'data.osquery.name',
    size: 20,
    order: 'desc',
    orderBy: '1',
    customLabel: 'Name',
  },
  'data.osquery.action': {
    field: 'data.osquery.action',
    size: 5,
    order: 'desc',
    orderBy: '1',
    customLabel: 'Action',
  },
  'data.osquery.pack': {
    field: 'data.osquery.pack',
    size: 5,
    order: 'desc',
    orderBy: '1',
    customLabel: 'Pack',
  },
  'data.osquery.calendarTime': {
    field: 'data.osquery.calendarTime',
    size: 2,
    order: 'desc',
    orderBy: '1',
    customLabel: 'Date',
  },
  'data.cis.rule_title': {
    field: 'data.cis.rule_title',
    size: 50,
    order: 'desc',
    orderBy: '1',
    customLabel: 'Rule title',
  },
  'data.cis.group': {
    field: 'data.cis.group',
    size: 50,
    order: 'desc',
    orderBy: '1',
    customLabel: 'Group',
  },
  'data.cis.result': {
    field: 'data.cis.result',
    size: 10,
    order: 'desc',
    orderBy: '1',
    customLabel: 'Result',
  },
  'data.title': {
    field: 'data.title',
    size: 10,
    order: 'desc',
    orderBy: '1',
    customLabel: 'Control',
  },
  'data.docker.Actor.Attributes.name': {
    field: 'data.docker.Actor.Attributes.name',
    size: 50,
    order: 'desc',
    orderBy: '1',
    customLabel: 'Container',
  },
  'data.docker.Action': {
    field: 'data.docker.Action',
    size: 20,
    order: 'desc',
    orderBy: '1',
    customLabel: 'Action',
  },
  'timestamp': {
    field: 'timestamp',
    size: 5,
    order: 'desc',
    orderBy: '1',
    customLabel: 'Date',
  },
  'data.github.org': {
    field: 'data.github.org',
    size: 10,
    order: 'desc',
    orderBy: '1',
    customLabel: 'Organization',
  },
  'data.oscap.check.title': {
    field: 'data.oscap.check.title',
    size: 5,
    order: 'desc',
    orderBy: '1',
    customLabel: 'Title',
  },
  'data.oscap.scan.profile.title': {
    field: 'data.oscap.scan.profile.title',
    size: 5,
    order: 'desc',
    orderBy: '1',
    customLabel: 'Profile',
  },
};
