# build environment
FROM node:13.12.0-alpine as build
WORKDIR /admin
ENV PATH /admin/node_modules/.bin:$PATH
COPY package.json ./admin
COPY package-lock.json ./admin
RUN npm ci --silent
RUN npm install react-scripts@3.4.1 -g --silent
COPY . ./admin
RUN npm run build

# production environment
FROM nginx:stable-alpine
COPY --from=build /admin/build /usr/share/nginx/html
# new
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
