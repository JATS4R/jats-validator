FROM node:10-alpine

WORKDIR /app

COPY package.json package-lock.json /app/

RUN npm ci --only=production

COPY index.js server.js healthcheck.js /app/

CMD ["npm", "start"]
