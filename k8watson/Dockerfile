FROM node:14-alpine
WORKDIR /app
COPY ./package.json .
RUN npm install
EXPOSE 8082
COPY . .
CMD ["node", "server.js"]