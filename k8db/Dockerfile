FROM registry.access.redhat.com/ubi8/nodejs-16
WORKDIR /app
COPY ./package.json .
RUN npm install
EXPOSE 8081
COPY . .
CMD ["node", "server.js"]
