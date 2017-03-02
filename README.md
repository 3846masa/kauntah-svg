# [Kauntah SVG]

![kauntah](https://kauntah-svg.herokuapp.com/counter.svg)

[![standard-readme compliant](https://img.shields.io/badge/standard--readme-OK-green.svg?style=flat-square)](https://github.com/RichardLitt/standard-readme)

> Very easiest access counter inspired by [shimobayashi/kauntah]

[Kauntah SVG]: https://github.com/3846masa/kauntah-svg
[shimobayashi/kauntah]: https://github.com/shimobayashi/kauntah

## Table of Contents

- [Install](#install)
- [Usage](#usage)
- [API](#api)
- [Contribute](#contribute)
- [License](#license)

## Install

### Heroku

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/3846masa/kauntah-svg)

**DEMO** | https://kauntah-svg.herokuapp.com

### now

[![Deploy to now](https://deploy.now.sh/static/button.svg)](https://deploy.now.sh/?repo=https://github.com/3846masa/kauntah-svg&env=MONGODB_URL)

```sh
now -e MONGODB_URL="mongodb://{user}:{pass}@mongo.example.com/kauntah" 3846masa/kauntah-svg
```

**DEMO** | https://kauntah-svg.now.sh

## Usage

Insert this html tag to your page.

```html
<img src="https://yourdomain.example.com/counter.svg">
```

That's all.

## API

### ``/counter.svg``

Returns counter image.

#### Query

- `offset` (number, default: 0)
  - Offset of counts.
- `color` (none or any, default: none)
  - Color-Cats mode.

## Contribute

PRs accepted.

## License

### Programs

[MIT © 3846masa](https://3846masa.mit-license.org)

### Cats images

[© KK'ｓWS](https://web.archive.org/web/20090831104303/http://kokagex.hp.infoseek.co.jp/)

> 商用以外なら魔改造でも文字変えでもアイコンでもなんでもどうぞー（´∀｀三´∀｀）
