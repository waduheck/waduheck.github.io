# NOTICE

本站的三维档案柜引擎（`src/engine/`、`src/engine/*.css`、`public/assets/archive-cassette.glb`、
`public/fonts/misans-webfont-4.3.1/`、`public/audio/*.ogg`）移植自开源项目：

- **RhineLabUI** — https://github.com/LBEILC/RhineLabUI — MIT License
  Copyright (c) 2026 LBEILC

移植时的改动：品牌记号与卡片标签改为本站自己的图形与文字；移除 2D 开场动画、开场字体与配乐自动播放；
键盘短音改为程序合成（不再使用参考项目里取自外部影像的采样）；移除 360° 模型查看器入口；
档案数据换成本站内容；列内档案数量允许不等并循环复用。

## 第三方依赖

| 依赖 | 许可 |
| --- | --- |
| [Three.js](https://threejs.org) | MIT |
| [@kitlangton/rolling-number](https://github.com/kitlangton/rolling-number) | MIT（`public/licenses-rolling-number.txt`） |
| [React](https://react.dev) | MIT |
| [MiSans](https://hyperos.mi.com/font/download)（小米） | MiSans 字体许可（`public/fonts/MiSans-license.pdf`） |

## 原创内容

`content/archives.json` 中的档案文本、`src/c4/` 中的系统架构图与 `public/audio/*.ogg`
（沿用参考项目的原创配乐，MIT）以外的所有个人内容版权归作者本人所有。
