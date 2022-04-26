FROM registry.access.redhat.com/ubi8/nodejs-16 AS build
USER root
RUN mkdir /app
WORKDIR /app
COPY ./package.json .
RUN npm install
COPY . .
RUN npm run build

FROM registry.redhat.io/rhel8/nginx-116
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 8080
CMD ["nginx","-g", "daemon off;"]

# EXPOSE 3000
# CMD ["npm", "start"]
