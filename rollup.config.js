/* prod 配置 */
import { nodeResolve } from "@rollup/plugin-node-resolve"
import commonjs from "@rollup/plugin-commonjs"
import typescript from "rollup-plugin-typescript2"
import { terser } from "rollup-plugin-terser"

export default {
  input: "src/index.ts",
  output: [
    {
      file: "./lib/bundle.js",
      format: "cjs",
      banner: injectDateForBuild
    },
    {
      file: "./esm/bundle.js",
      format: "es",
      banner: injectDateForBuild
    }
  ],
  plugins: [
    nodeResolve(),
    commonjs(),
    terser(),
    typescript({
      tsconfig: "tsconfig.json",
      useTsconfigDeclarationDir: true
    })
  ]
}
/* 已失效，terser将去掉注释 */
function injectDateForBuild() {
  return new Promise((resolve) => {
    const v = new Date()
    const buildDate = `${v.getFullYear()}-${
      v.getMonth() + 1
    }-${v.getDate()} ${v.getHours()}:${v.getMinutes()}:${v.getSeconds()}`
    resolve("/* You version is:" + "pkg-version" + " " + "Build Date:" + buildDate + "*/")
  })
}
