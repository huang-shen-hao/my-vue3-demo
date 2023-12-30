module.exports = {
  "env": {
    "browser": true,
    "es2021": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:vue/vue3-essential"
  ],
  "overrides": [
    {
      "env": {
        "node": true
      },
      "files": [
        ".eslintrc.{js,cjs}"
      ],
      "parserOptions": {
        "sourceType": "script"
      }
    }
  ],
  "parserOptions": {
    "ecmaVersion": "latest",
    "parser": "@typescript-eslint/parser",
    "sourceType": "module"
  },
  "plugins": [
    "@typescript-eslint",
    "vue"
  ],
  "rules": {
    // 关闭驼峰写法警告
    "vue/multi-word-component-names": "off",
    // 保存代码时缩进4个空格
    "indent": ["error", 4],
    "@typescript-eslint/no-use-before-define": "off",
    // 此规则允许你设置要在代码库中允许哪些指令注释。
    "@typescript-eslint/ban-ts-comment": "off",
    "@typescript-eslint/ban-types": "off",
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-unused-vars": "warn",
    "space-before-function-paren": "off",
    // 禁止出现多行空行
    "no-multiple-empty-lines": ["off", { "max": 1 }]
  }
};
