import { defineConfig } from 'dumi';

export default defineConfig({
  navs: [
    null, // null 值代表保留约定式生成的导航，只做增量配置
    {
      title: 'GitHub',
      path: 'https://github.com/umijs/dumi',
    },
  ],
  menus: {
    '/sunmao-editor': [
      {
        title: '榫卯设计器',
        path: '/sunmao-editor',
        children: ['SunmaoEditor/demo/dashboard.md'],
      },
    ],
    '/designer': [
      {
        title: '设计器',
        path: '/designer',
        children: ['Designer/index.md', 'Designer/basic.md'],
      },
    ],
    '/components': [
      {
        title: '组件',
        path: '/components',
        // children: ['Designer/index.md', 'Designer/basic.md'],
      },
    ],
  },
  title: 'editor',
  favicon:
    'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png',
  logo: 'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png',
  outputPath: 'docs-dist',
  mode: 'site',
  mfsu: {},
  webpack5: {},
  extraPostCSSPlugins: [
    require('tailwindcss')({ config: './tailwind.config.js' }),
    require('autoprefixer'),
  ],
  // more config: https://d.umijs.org/config
  chainWebpack(config, {}) {
    config.module
      .rule('wasm-loader')
      .test(/\.wasm(\.bin)?$/)
      .use('file-loader')
      .loader('file-loader');
    (config as any).experiments = (config as any).experiments || {};
    (config as any).experiments.syncWebAssembly = true;
    return config;
  },
});
