import prettier from 'eslint-config-prettier'
import eslintPluginPrettier from 'eslint-plugin-prettier'

export default [
  { ignores: ['dist'] },
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: { ecmaFeatures: { jsx: true } }
    },
    plugins: {
      prettier: eslintPluginPrettier
    },
    extends: [
      'standard',   // Aplica reglas de Standard JS
      'prettier'    // Desactiva reglas que chocan con Prettier
    ],
    rules: {
      'prettier/prettier': 'error'  // Marca errores de formato como errores ESLint
    }
  }
]
