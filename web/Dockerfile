### STAGE 1: Build ###
FROM node:12.18.3-alpine3.12 AS build
RUN mkdir ImageStorage
WORKDIR /web
ENV PATH /web/node_modules/.bin:$PATH
COPY package.json ./
COPY package-lock.json ./
RUN npm install
COPY . .
RUN  npm run build

### STAGE 2: Run ###
FROM nginx:1.17.1-alpine
COPY nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /web/build /usr/share/nginx/html

#fire up nginx
EXPOSE 80 
CMD ["nginx","-g","daemon off;"]