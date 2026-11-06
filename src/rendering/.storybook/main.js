module.exports = {
  stories: ['../src/stories/Pages/HomePage.stories.tsx', '../src/**/*.stories.@(mdx|js|jsx|ts|tsx)'],
  staticDirs: ['../public'],
  addons: [],
  framework: {
    name: '@storybook/nextjs',
    options: {},
  },
  docs: {},
};
