# [Kauntah SVG]

![kauntah](https://kauntah-svg.mikumiku.moe/counter.svg)

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

### PaaS

| Heroku                          | Azure                         | now                       | Bluemix                           |
| :-----------------------------: | :---------------------------: | :-----------------------: | :-------------------------------: |
| [![HerokuButton]][HerokuDeploy] | [![AzureButton]][AzureDeploy] | [![nowButton]][nowDeploy] | [![BluemixButton]][BluemixDeploy] |
| [Heroku Demo]                   | [Azure Demo]                  | [now Demo]                | [Bluemix Demo]                    |

[HerokuButton]: https://www.herokucdn.com/deploy/button.svg
[HerokuDeploy]: https://heroku.com/deploy?template=https://github.com/3846masa/kauntah-svg
[Heroku Demo]: https://kauntah-svg.herokuapp.com

[AzureButton]: https://azuredeploy.net/deploybutton.svg
[AzureDeploy]: https://azuredeploy.net/?repository=https://github.com/3846masa/kauntah-svg
[Azure Demo]: https://kauntah-svg.azurewebsites.net

[nowButton]: https://deploy.now.sh/static/button.svg
[nowDeploy]: https://deploy.now.sh/?repo=https://github.com/3846masa/kauntah-svg&env=MONGODB_URL
[now Demo]: https://kauntah-svg.now.sh

[BluemixButton]: https://bluemix.net/deploy/button.png
[BluemixDeploy]: https://bluemix.net/deploy?repository=https://github.com/3846masa/kauntah-svg
[Bluemix Demo]: https://kauntah-svg.mybluemix.net

### Docker

[![Docker Hub](https://img.shields.io/badge/docker%20build-3846masa%2Fkauntah--svg-blue.svg?style=flat-square)](https://hub.docker.com/r/3846masa/kauntah-svg/)

```bash
docker run --name some-mongo -d mongo

docker run -d -p 3000:3000 --name kauntah-svg \
  --link some-mongo:mongodb 3846masa/kauntah-svg
```

## Usage

Insert this html tag to your page.

```html
<img src="https://<YOUR_KAUNTAH_DOMAIN>/counter.svg">
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
