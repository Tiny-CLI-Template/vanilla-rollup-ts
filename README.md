# vanilla-rollup-ts
vanilla-rollup-ts（用于写utils时纯净的rollup+ts配置）

- eslint-config-prettier 可以关闭 eslint 与 prettier之间的冲突
- ts + eslint 需要以下两个包：（这两个包版本需要一致）
   - @typescript-eslint/eslint-plugin
   - @typescript-eslint/parser
- eslint ts规则已经融合，请参考：https://github.com/prettier/eslint-config-prettier/blob/main/CHANGELOG.md#version-800-2021-02-21
- ts 3.4+ 请使用rollup-plugin-typescript2包
- tsconfig 已设置默认打出types文件夹
# Command: npm run <script>
 - dev 配合 npm link 使用更佳
 - build
 - lintfix 
 - prettier
 - check 组合lintfix 与 prettier
 - pub 发布至私有cnpm

# Branch 

 - main 分支 模板示例
 - daily  分支 用于配合脚手架模板拉取纯净配置
