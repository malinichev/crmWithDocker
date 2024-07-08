# Build environment
FROM node:18.17-alpine as build
WORKDIR /admin

ENV PATH /admin/node_modules/.bin:$PATH

COPY package.json package-lock.json ./
RUN npm i --legacy-peer-deps
COPY . .
RUN npm run build:prod

# Production environment
FROM nginx:stable-alpine
COPY --from=build /admin/build /var/www/production_project/html
COPY --from=build /admin/nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
