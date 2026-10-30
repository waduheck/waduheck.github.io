// React 岛：只有档案详情里的「架构」页签需要 React。
// 引擎其余部分保持原生 TS，这里按需动态载入（见 src/engine/main.ts 的 setTab）。
import { createRoot, type Root } from 'react-dom/client';
import '@portfolio/tokens/css';
import C4Diagram from './C4Diagram.jsx';
import './c4.css';

let root: Root | null = null;

export function mountC4(node: HTMLElement) {
  if (root) {
    root.unmount();
    root = null;
  }
  root = createRoot(node);
  root.render(<C4Diagram locale="zh" />);
}

export function unmountC4() {
  if (root) {
    root.unmount();
    root = null;
  }
}
