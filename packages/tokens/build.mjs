// 设计令牌构建：tokens/*.json → dist/tokens.css（CSS 变量）+ dist/tokens.mjs（JS）
// 三层：primitive（原始值）→ semantic（语义别名 + 组件别名）。
// 组件只允许消费 semantic 层，不许直接引用 color.neutral.*。
import StyleDictionary from 'style-dictionary';

const sd = new StyleDictionary({
  source: ['tokens/**/*.json'],
  platforms: {
    css: {
      transformGroup: 'css',
      buildPath: 'dist/',
      files: [
        {
          destination: 'tokens.css',
          format: 'css/variables',
          options: { selector: ':root', outputReferences: true },
        },
      ],
    },
    js: {
      transformGroup: 'js',
      buildPath: 'dist/',
      files: [{ destination: 'tokens.mjs', format: 'javascript/esm' }],
    },
  },
});

await sd.buildAllPlatforms();
console.log('[tokens] built dist/tokens.css + dist/tokens.mjs');
