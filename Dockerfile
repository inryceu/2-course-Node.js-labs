FROM node:20-alpine

WORKDIR /app

COPY Task4/package*.json ./

RUN npm install

COPY Task4/ ./

EXPOSE 3000
CMD ["node", "app.js"]