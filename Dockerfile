FROM node:12-alpine

ENV PORT=4000

WORKDIR /app

COPY package.json tsconfig.json /app/

RUN npm install

COPY . .

RUN npm run build

EXPOSE ${PORT}

CMD [ "node", "/app/build/server.js" ]