/* eslint-disable */
export default {
  roots:['<rootDir>/src'],
  displayName: 'client',
  preset: '../jest.preset.js',
  transform: {
    '^(?!.*\\.(js|jsx|ts|tsx|css|json)$)': '@nrwl/react/plugins/jest',
    '^.+\\.[tj]sx?$': [
      '@swc/jest',
      { jsc: { transform: { react: { runtime: 'automatic' } } } },
    ],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../coverage/apps/react-client',
  setupFilesAfterEnv: ['<rootDir>/test-setup.ts'],
  verbose: true
};
