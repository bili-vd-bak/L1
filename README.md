# L1

A tool to parse the title of bangumi etc. Its name and function logic originate from L1(LabelFirstTitleParser) of open-ani/ani.  
这是一个解析番剧标题的工具，它的名字和功能逻辑源自于 [open-ani/ani](https://github.com/open-ani/ani) 中的L1(LabelFirstTitleParser)。  

## Usage 使用

[npm](https://www.npmjs.com/package/@bili-vd-bak/l1)  
[jsr](https://jsr.io/@bvd/l1)  

The lib is written in TypeScript, and the usage is detailed in the code hint after import.  
本库使用TypeScript编写，使用方法详见导入后的代码提示。  

```sh
pnpm add @bvd/l1
```

```ts
import L1 from '@bvd/l1';

const result = L1("[DBD-Raws][约会大作战 第一季/Date a Live S1/デート・ア・ライブ][导演剪辑版/Director's Cut/ディレクターズカット版][01-12TV全集+OAD][1080P][BDRip][HEVC-10bit][简繁外挂][FLAC][MKV]");

console.log(result);
```

## Contribution 贡献

Welcome Issue or PR.  
欢迎提交Issue和Pull Request。  

Logic function are also suggested to be submitted to the upstream open-ani/Ani.
逻辑功能建议同时向上游 open-ani/Ani 提交。  

## LICENSE 许可证

Released under the GUN 3.0 License.  
本库采用 GNU 3.0 许可证发布。  
