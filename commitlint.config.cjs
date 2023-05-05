module.exports = {
  extends: ['@commitlint/config-conventional'],
  plugins: ['commitlint-plugin-function-rules'],
  rules: {
    'type-case': [2, 'always', 'lower-case'],
    'subject-empty': [2, 'never'],
    'subject-min-length': [2, 'always', 5],
    'subject-full-stop': [2, 'never', '.'],
    'subject-case': [2, 'always', 'lower-case']
  }
};
