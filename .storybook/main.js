/** Storybook：只跑组件层，不加载业务页面。 */
export default {
  stories: ['../packages/ui/src/**/*.stories.@(js|jsx)'],
  addons: ['@storybook/addon-docs', '@storybook/addon-a11y'],
  framework: { name: '@storybook/react-vite', options: {} },
};
