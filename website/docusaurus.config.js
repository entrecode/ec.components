/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

module.exports = {
  title: 'ec.components',
  tagline: 'UI Components for the entrecode datamanager',
  url: 'https://components.entrecode.de',
  baseUrl: '/',
  favicon: 'img/favicon.ico',
  themes: ['@docusaurus/theme-live-codeblock'],
  themeConfig: {
    navbar: {
      title: 'ec.components',
      logo: {
        alt: 'entrecode logo',
        src: 'img/ec_logo.png',
      },
      links: [
        { to: 'docs/project-setup/getting-started', label: 'Docs', position: 'left' },
        { to: 'blog', label: 'Blog', position: 'left' },
        {
          href: 'https://github.com/facebook/docusaurus',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Docs',
              to: 'project-setup/getting-started',
            },
            {
              label: 'API Docs',
              href: 'https://entrecode.github.io/ec.components/',
            },
            {
              label: 'Changelog',
              href: 'https://entrecode.github.io/ec.components/changelog.html',
            },
            {
              label: 'Demos',
              href: 'https://components.entrecode.de/',
            },
          ],
        },
        {
          title: 'Other Resources',
          items: [
            {
              label: 'x.ui',
              href: 'https://entrecode.github.io/x.ui/',
            },
            {
              label: 'ec.sdk',
              href: 'https://github.com/entrecode/ec.sdk',
            },
            {
              label: 'ec.doc',
              href: 'https://doc.entrecode.de/',
            },
            {
              label: 'entrecode',
              href: 'https://entrecode.de/',
            },
          ],
        },
        {
          title: 'Social',
          items: [
            {
              label: 'Blog',
              to: 'blog',
            },
            {
              label: 'Github',
              href: 'https://github.com/entrecode/ec.components',
            },
          ],
        },
      ],
      /* logo: {
        alt: 'entrecode',
        src: 'img/ec_logo.png',
      }, */
      copyright: `Copyright © ${new Date().getFullYear()} entrecode`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.json'),
        },
      },
    ],
  ],
};
