FROM node:10-alpine

WORKDIR /app

COPY package.json package-lock.json /app/

RUN npm ci

COPY index.js server.js /app/

ENTRYPOINT ['node', 'server.js']
