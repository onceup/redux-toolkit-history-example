module.exports = {
    env: {
      browser: true,
      es2021: true,
      node: true
    },
    extends: ['plugin:react/recommended', 'plugin:@typescript-eslint/recommended'],
    overrides: [],
    parserOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parser: '@typescript-eslint/parser',
      project: ['./tsconfig.json']
    },
    plugins: ['react'],
    rules: {
      'react/jsx-uses-react': 'off',
      'react/react-in-jsx-scope': 'off',
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-empty-interface': 'off'
    },
    settings: {
      react: {
        version: 'detect'
      },
      'import/resolver': {
        typescript: {
          project: './tsconfig.json'
        },
        alias: {
          map: [['@', './src']],
          extensions: ['.tsx', '.js', '.ts']
        }
      }
    }
  }
