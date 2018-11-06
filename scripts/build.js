const fs = require('fs-extra');
const path = require('path');
const ejs = require('ejs');
const unified = require('unified');
const remarkParse = require('remark-parse');
const remarkSlug = require('remark-slug');
const rehypeParse = require('rehype-parse');
const remarkRehype = require('remark-rehype');
const rehypeHighlight = require('rehype-highlight');
const rehypeFormat = require('rehype-format');
const rehypeStringify = require('rehype-stringify');
const find = require('unist-util-find');

const md2html = unified()
  .use(remarkParse)
  .use(remarkSlug)
  .use(remarkRehype)
  .use(() => (ast) => {
    const img = find(ast, (node) => {
      return node.type === 'element' && node.tagName === 'img' && node.properties.alt === 'kauntah';
    });
    img.properties.src = '/counter.svg';
    return ast;
  })
  .use(rehypeHighlight)
  .use(rehypeStringify);

const htmlBeautify = unified()
  .use(rehypeParse)
  .use(rehypeFormat)
  .use(rehypeStringify);

(async () => {
  const markdown = await fs.readFile(path.join(__dirname, '../README.md'), 'utf8');
  const mdHTML = await md2html.process(markdown);
  const ejsHTML = ejs.render(await fs.readFileSync(path.join(__dirname, '../template/index.html.ejs'), 'utf8'), {
    markdown: mdHTML,
  });
  const HTML = await htmlBeautify.process(ejsHTML);
  await fs.writeFile(path.join(__dirname, '../public/index.html'), HTML);
})().catch((err) => console.error(err));
