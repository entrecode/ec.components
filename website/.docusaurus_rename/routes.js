
import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  
{
  path: '/hello',
  component: ComponentCreator('/hello'),
  exact: true,
  
},
{
  path: '/blog/2019/07/12/visual-regression-tests',
  component: ComponentCreator('/blog/2019/07/12/visual-regression-tests'),
  exact: true,
  
},
{
  path: '/blog/2019/06/28/xui-update',
  component: ComponentCreator('/blog/2019/06/28/xui-update'),
  exact: true,
  
},
{
  path: '/blog/2019/06/14/consistency-update',
  component: ComponentCreator('/blog/2019/06/14/consistency-update'),
  exact: true,
  
},
{
  path: '/blog/2019/06/13/new-docs',
  component: ComponentCreator('/blog/2019/06/13/new-docs'),
  exact: true,
  
},
{
  path: '/',
  component: ComponentCreator('/'),
  exact: true,
  
},
{
  path: '/docs',
  component: ComponentCreator('/docs'),
  
  routes: [
{
  path: '/docs/doc4',
  component: ComponentCreator('/docs/doc4'),
  exact: true,
  
},
{
  path: '/docs/doc3',
  component: ComponentCreator('/docs/doc3'),
  exact: true,
  
},
{
  path: '/docs/doc1',
  component: ComponentCreator('/docs/doc1'),
  exact: true,
  
},
{
  path: '/docs/doc2',
  component: ComponentCreator('/docs/doc2'),
  exact: true,
  
},
{
  path: '/docs/components/entry-list',
  component: ComponentCreator('/docs/components/entry-list'),
  exact: true,
  
},
{
  path: '/docs/tour',
  component: ComponentCreator('/docs/tour'),
  exact: true,
  
},
{
  path: '/docs/style-guide',
  component: ComponentCreator('/docs/style-guide'),
  exact: true,
  
},
{
  path: '/docs/components/crud',
  component: ComponentCreator('/docs/components/crud'),
  exact: true,
  
},
{
  path: '/docs/components/entry-form',
  component: ComponentCreator('/docs/components/entry-form'),
  exact: true,
  
},
{
  path: '/docs/components/entry-pop',
  component: ComponentCreator('/docs/components/entry-pop'),
  exact: true,
  
},
{
  path: '/docs/components/entry-select',
  component: ComponentCreator('/docs/components/entry-select'),
  exact: true,
  
},
{
  path: '/docs/components/notifications',
  component: ComponentCreator('/docs/components/notifications'),
  exact: true,
  
},
{
  path: '/docs/components/loaders',
  component: ComponentCreator('/docs/components/loaders'),
  exact: true,
  
},
{
  path: '/docs/components/icons',
  component: ComponentCreator('/docs/components/icons'),
  exact: true,
  
},
{
  path: '/docs/core-concepts/accounts',
  component: ComponentCreator('/docs/core-concepts/accounts'),
  exact: true,
  
},
{
  path: '/docs/components/modals',
  component: ComponentCreator('/docs/components/modals'),
  exact: true,
  
},
{
  path: '/docs/core-concepts/config-options',
  component: ComponentCreator('/docs/core-concepts/config-options'),
  exact: true,
  
},
{
  path: '/docs/core-concepts/config-pipeline',
  component: ComponentCreator('/docs/core-concepts/config-pipeline'),
  exact: true,
  
},
{
  path: '/docs/development/monorepo',
  component: ComponentCreator('/docs/development/monorepo'),
  exact: true,
  
},
{
  path: '/docs/core-concepts/items',
  component: ComponentCreator('/docs/core-concepts/items'),
  exact: true,
  
},
{
  path: '/docs/development/publishing',
  component: ComponentCreator('/docs/development/publishing'),
  exact: true,
  
},
{
  path: '/docs/development/add-new-package',
  component: ComponentCreator('/docs/development/add-new-package'),
  exact: true,
  
},
{
  path: '/docs/project-setup/authorization',
  component: ComponentCreator('/docs/project-setup/authorization'),
  exact: true,
  
},
{
  path: '/docs/project-setup/overview',
  component: ComponentCreator('/docs/project-setup/overview'),
  exact: true,
  
},
{
  path: '/docs/project-setup/getting-started',
  component: ComponentCreator('/docs/project-setup/getting-started'),
  exact: true,
  
},
{
  path: '/docs/project-setup/routes',
  component: ComponentCreator('/docs/project-setup/routes'),
  exact: true,
  
},
{
  path: '/docs/core-concepts/component-tree',
  component: ComponentCreator('/docs/core-concepts/component-tree'),
  exact: true,
  
},
{
  path: '/docs/development/stackblitz',
  component: ComponentCreator('/docs/development/stackblitz'),
  exact: true,
  
},
{
  path: '/docs/core-concepts/form-options',
  component: ComponentCreator('/docs/core-concepts/form-options'),
  exact: true,
  
},
{
  path: '/docs/core-concepts/list-options',
  component: ComponentCreator('/docs/core-concepts/list-options'),
  exact: true,
  
}],
},
{
  path: '/blog',
  component: ComponentCreator('/blog'),
  exact: true,
  
},
  
  {
    path: '*',
    component: ComponentCreator('*')
  }
];
