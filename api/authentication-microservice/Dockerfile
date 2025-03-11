FROM node:20

WORKDIR /usr/src/app

RUN npm install -g pnpm@latest-10

COPY package.json ./

COPY pnpm-lock.yaml ./

RUN pnpm install

COPY . .

RUN pnpm build

EXPOSE 3000

CMD ["node", "dist/main"]
