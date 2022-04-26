FROM registry.access.redhat.com/ubi8/nodejs-16
USER root
RUN mkdir /app
WORKDIR /app
COPY ./package.json .
RUN npm install
EXPOSE 8080
COPY . .
CMD ["node", "server.js"]
