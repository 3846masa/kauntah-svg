const fs = require('fs');
const path = require('path');
const ejs = require('ejs');
const marked = require('marked');
const beautify = require('js-beautify').html;
const cheerio = require('cheerio');

const compiledHTML =
  ejs.render(
    fs.readFileSync(path.join(__dirname, '../template/index.html.ejs'), 'utf8'), {
      markdown: marked(fs.readFileSync(path.join(__dirname, '../README.md'), 'utf8')),
    }
  );

const $ = cheerio.load(compiledHTML);
$('img[alt="kauntah"]').attr('src', '/counter.svg');

fs.writeFileSync(path.join(__dirname, '../public/index.html'), beautify($.html({ decodeEntities: false }), {
  indent_size: 2,
  unescape_strings: true,
}));
