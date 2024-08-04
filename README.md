# L1

[![Build and Publish Package](https://github.com/bili-vd-bak/L1/actions/workflows/release.yml/badge.svg)](https://github.com/bili-vd-bak/L1/actions/workflows/release.yml)  

A tool to parse the title of bangumi etc. Its name and function logic originate from L1(LabelFirstTitleParser) of open-ani/ani.  
这是一个解析番剧标题的工具，它的名字和功能逻辑源自于 [open-ani/ani](https://github.com/open-ani/ani) 中的L1(LabelFirstTitleParser)。  

## Usage 使用

View in [NPM(npmjs.com)](https://www.npmjs.com/package/@bili-vd-bak/l1) or [JSR(jsr.io)](https://jsr.io/@bvd/l1).  

The lib is written in TypeScript, and the usage is detailed in the code hint after import.  
本库使用TypeScript编写，使用方法详见导入后的代码提示。  

> [!CAUTION]  
npmjs源(@bili-vd-bak/l1)入口文件经编译处理，可直接在各环境(含浏览器)使用(见`dist`目录)。  
jsr源(@bvd/l1)入口文件为TypeScript源码，需编译后使用(见`src`目录)。  

### Node/Deno (Tested)

```sh
# use @bili-vd-bak from npmjs.com
pnpm add @bili-vd-bak/l1
# use @bvd/l1 from jsr.io
pnpm dlx jsr add @bvd/l1
bunx jsr add @bvd/l1
# use @bvd/l1 with Deno
deno add @bvd/l1
```

```ts
// npmjs.com
import L1 from '@bili-vd-bak/l1';
// Deno/jsr.io
import L1 from '@bvd/l1';

const result = L1("[DBD-Raws][约会大作战 第一季/Date a Live S1/デート・ア・ライブ][导演剪辑版/Director's Cut/ディレクターズカット版][01-12TV全集+OAD][1080P][BDRip][HEVC-10bit][简繁外挂][FLAC][MKV]");

console.log(result);
```

### Browser (Not tested)

```html
<script src="https://cdn.jsdelivr.net/npm/@bili-vd-bak/l1@1/dist/index.min.js"></script>
```

Or

```html
<script type="module" src="https://cdn.jsdelivr.net/npm/@bvd/l1@1/dist/index.js">
  const result = L1("[DBD-Raws][约会大作战 第一季/Date a Live S1/デート・ア・ライブ][导演剪辑版/Director's Cut/ディレクターズカット版][01-12TV全集+OAD][1080P][BDRip][HEVC-10bit][简繁外挂][FLAC][MKV]");
  console.log(result);
</script>
```

## Contribution 贡献

Use `pnpm run test` or `pnpm run test:ui` to test.  
使用 `pnpm run test` 或 `pnpm run test:ui` 进行测试。  

Use `pnpm run lint` to check codes.  
使用 `pnpm run lint` 检查代码检查。  

Use `pnpm run build` to build (You have to build before push).  
使用 `pnpm run build` 进行构建(推送前必须先构建)。  

Welcome Issue or PR.  
欢迎提交Issue和Pull Request。  

Logic function are also suggested to be submitted to the upstream [open-ani/ani](https://github.com/open-ani/ani).
逻辑功能建议同时向上游 [open-ani/ani](https://github.com/open-ani/ani) 提交。  

Current Upstream SHA: `09c9075`(master)、`130f84e`([PR](https://github.com/open-ani/ani/pull/672/commits/130f84e764cd0cf8e5a86396faee7bf87a5416f1))
当前上游SHA: `09c9075`(master)、`130f84e`([PR](https://github.com/open-ani/ani/pull/672/commits/130f84e764cd0cf8e5a86396faee7bf87a5416f1))

## License 许可证

Released under the GUN 3.0 License.  
本库采用 GNU 3.0 许可证发布。  
