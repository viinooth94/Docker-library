FROM node:23.5-alpine3.20 AS builder
WORKDIR /app
COPY package.json package-lock.json ./ 
RUN npm install
COPY . . 
RUN npm run build

FROM nginx:1.27-alpine3.20 AS runtime
COPY --from=builder --chown=nginx:nginx /app/build /usr/share/nginx/html
