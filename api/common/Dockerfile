FROM node:20

WORKDIR /usr/src/app

RUN npm install -g pnpm@latest-10 verdaccio

COPY package.json ./

COPY pnpm-lock.yaml ./

RUN pnpm install 

COPY . .

EXPOSE 4873

CMD ["verdaccio"]

RUN npm run build

RUN npm publish

