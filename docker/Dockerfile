FROM node:7.7-alpine

WORKDIR /usr/src/app
COPY package.json /usr/src/app/
RUN npm install && npm cache clean
COPY . /usr/src/app

ENV PORT 3000
EXPOSE 3000

CMD [ "npm", "start" ]
