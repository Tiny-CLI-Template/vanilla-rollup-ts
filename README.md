# vanilla-rollup-ts
本项目由 tiny-cli 模板vanilla-rollup-ts创建，vanilla-rollup-ts（用于写utils时纯净的rollup+ts配置）


- eslint-config-prettier 可以关闭 eslint 与 prettier之间的冲突
- ts + eslint 需要以下两个包：（这两个包版本需要一致）
   - @typescript-eslint/eslint-plugin
   - @typescript-eslint/parser

- eslint ts规则已经融合，请参考：https://github.com/prettier/eslint-config-prettier/blob/main/CHANGELOG.md#version-800-2021-02-21


# Command: npm run <script>
 - dev 配合 npm link 使用更佳
 - build
 - lintfix 
 - prettier
 - check 组合lintfix 与 prettier
 - pub 发布至私有cnpm