FROM node:10-alpine

WORKDIR /opt

COPY package.json package-lock.json ./

RUN npm ci --only=production

COPY app ./app/

CMD ["npm", "start"]
