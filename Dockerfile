FROM node:18 as build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:18-slim as production

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY --from=Build /app/dist ./dist

CMD [ "npm", "run", "start:prod" ]
