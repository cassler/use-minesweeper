module.exports = {
  root: true,
  extends: ["airbnb", "airbnb-typescript"],
  parser: '@typescript-eslint/parser',
  plugins: ["@typescript-eslint"],
  parserOptions: {
    project: ['./tsconfig.json'], // Specify it only for TypeScript files
  },
  rules: {
    "react/react-in-jsx-scope": "off",
    "react/jsx-props-no-spreading": "off"
  },
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      node: {
        paths: ['src', 'lib'],
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
};
