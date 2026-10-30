# 王逸浩 · 档案库

个人作品集：一个**可翻阅的三维档案柜**。

五类档案（系统 / 作品 / 工作 / 教育 / 奖项）按列排布；`←` `→` 切列、`↑` `↓` 翻阅、`ENTER` 读取、`ESC` 返回。
上下翻阅与左右切列都持续循环，切回某列时保留该列上次的选择。选中时档案抬起、阵列同时起一道波浪，
标题与编号跟着输入滚动；返回阵列时档案先转正、再下降。读取档案不跳新页面：档案从阵列里升起、转向正面，
镜头推近，正文在右侧就地解密展开，阵列留在背后作为场景。

## 技术栈

- **引擎**：TypeScript + Three.js + Vite，实时渲染档案盒与阵列（`src/engine/`）
- **React 岛**：只有 X-001 的「架构」页签用 React 渲染 C4 图，按需动态载入（`src/c4/`）
- **内容**：`content/archives.json` 是唯一数据源；改内容不用碰代码
- **设计令牌 / Storybook**：`packages/tokens`、`packages/ui` 保留在仓库里，服务组件文档，不驱动主页

## 内容维护

改 `content/archives.json`：`categories` / `columns` 是五个分类，`records` 是档案数组。
列内档案数量可以不等——不足一列的列会把已有档案循环复用，不需要凑满。

```sh
npm install --include=dev     # 本机 npm 全局配置了 omit=dev
npm run dev                   # 生成令牌 + 导出可下载文本 + 起开发服务器
npm run build                 # tsc + vite build，产物在 dist/
```

`npm run archives` 会把每份档案导出成 `public/archives/PORTFOLIO-X-00N.txt`（详情页的 EXPORT 按钮下载它）。

## 键盘

| 按键 | 作用 |
| --- | --- |
| `←` `→` | 切换档案类别（循环） |
| `↑` `↓` | 翻阅同类档案（循环） |
| `ENTER` | 读取当前档案 |
| `ESC` | 返回阵列 / 关闭浮层 |
| `/` | 检索档案 |
| 详情内 `←` `→` | 切换页签 |

## 部署

推 `main` 触发 GitHub Actions，构建后发布到 GitHub Pages（`.github/workflows/deploy.yml`）。

## 版权与来源

三维档案柜的引擎、动效与布局移植自开源项目
[LBEILC/RhineLabUI](https://github.com/LBEILC/RhineLabUI)（MIT），已去除其品牌标志、开场动画与配乐默认开启行为，
换成自己的品牌记号与内容。字体使用 MiSans（小米，见 `public/fonts/MiSans-license.pdf`）。
详见 [NOTICE.md](NOTICE.md)。
