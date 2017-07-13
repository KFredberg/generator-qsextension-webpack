var prompts = [
  {
    name: 'extensionName',
    message: 'What\'s the name of the extension?'
  },
  {
    name: 'extensionDescription',
    message: 'Describe your extension:'
  },
  {
    name: 'authorName',
    message: 'What\'s your name?'
  },
    {
    name: 'extensionNamespace',
    message: 'What\'s the namespace for your extension?'
  },
  {
    type: 'list',
    name: 'extensionType',
    message: 'What\'s the type of your extension? This will define the icon used (Default: extension).',
    default: 'extension',
    choices: [
      'extension',
      'kpi',
      'bar-chart-vertical',
      'line-chart',
      'pie-chart',
      'gauge-chart',
      'scatter-chart',
      'text-image',
      'table',
      'pivot-table',
      'list',
      'filterpane',
      'treemap'
    ]
  },
  {
    type: 'list',
    name: 'extensionTemplate',
    message: 'What\'s template do you want to use? (Default: ng-table).',
    default: 'ng-table',
    choices: [
      'ng-table',
      'ng-hello-world',
      'hello-world',
      'd3-bar-chart',
      'validate-invalidate'
    ]
  },
  {
    type: 'list',
    name: 'license',
    message: 'Choose the desired license. (MIT)',
    default: 'mit',
    choices: [
      'agpl',
      'apache',
      'artistic',
      'bsd-3-clause',
      'bsd',
      'cc0',
      'eclipse',
      'gpl-v2',
      'gpl-v3',
      'isc',
      'lgpl-v2.1',
      'lgpl-v3',
      'mit',
      'mozilla',
      'no-license',
      'unlicense',
      'wtfpl'
    ]
  },
  {
    name: 'gitRepositoryUrl',
    message: 'What\'s the git repository url?'
  },
  {
    name: 'homepageUrl',
    message: 'What\'s your homepage?'
  },
];

module.exports = prompts;
