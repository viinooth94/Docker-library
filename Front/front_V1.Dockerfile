FROM node:23.5-alpine3.20
WORKDIR /app
COPY . .
RUN npm install
RUN chown -R node:node .
USER node
CMD ["npm", "start"]
       