FROM node:20-alpine

WORKDIR /app

COPY Task5/package*.json ./

RUN npm install

COPY Task5/ ./

EXPOSE 3000
CMD ["node", "app.js"]