// 品牌记号：一个自绘的 "W" 折线，界面上和档案盒印刷标签上共用同一个记号。
// 参考实现里的图形属于原作者的项目，这里换成自绘图形，只借用引擎的动效与布局。

const markPaths =
  '<path d="M34 22 L64 122 L95 52 L126 122 L156 22" fill="none" stroke="currentColor" stroke-width="16" stroke-linejoin="miter" stroke-linecap="square"/>' +
  '<path d="M196 22 H276 M196 48 H244" fill="none" stroke="currentColor" stroke-width="9" stroke-linecap="square"/>';

/** 印刷在档案盒标签上的记号：只含路径，作为位图载入时也不依赖字体。 */
export const labelMarkSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 310 145" color="#171713">${markPaths}</svg>`;

/** 载入画面与开场用的整枚标志（含文字，内联在 DOM 里，字体可用）。 */
export const logo = `<svg viewBox="0 0 310 185" aria-label="Ethan Wang" role="img">${markPaths}<text x="155" y="172" text-anchor="middle" font-family="MiSans,sans-serif" font-size="16" font-weight="700" letter-spacing="10">王逸浩 · ETHAN</text></svg>`;

/** 开场描边动画用的连续轮廓；开场已停用，这里只保留一条合法路径。 */
export const bootMarkContour = "M34 22 L64 122 L95 52 L126 122 L156 22";

/** 左上角品牌块：姓名、身份、档案编号。 */
export const brandHeading = `<h1>王逸浩</h1><div>ETHAN WANG · 软件工程师</div><p><span>ARCHIVE</span><b>2026</b></p>`;
