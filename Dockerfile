FROM node:lts-bookworm-slim
WORKDIR /usr/src/app
COPY . .
RUN npm install
RUN npm run deploy
