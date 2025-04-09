FROM node:20

WORKDIR /app

RUN npm install -g pnpm@latest

COPY package.json .

RUN pnpm install

COPY . .

EXPOSE 3000

CMD ["pnpm", "start", "api-gateway"]