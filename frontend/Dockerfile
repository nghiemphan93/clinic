### STAGE 1: Build ###
FROM node:15-alpine3.13 AS build
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install -g @angular/cli@11.2.3 && npm install
COPY . .
RUN ng build --prod

### STAGE 2: Run ###
FROM nginx:1.20.0-alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /usr/src/app/dist/frontend /usr/share/nginx/html
EXPOSE 80
ENTRYPOINT ["nginx","-g","daemon off;"]
