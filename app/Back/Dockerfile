FROM node:23.5-alpine3.20 AS builder
WORKDIR /app
COPY package.json package-lock.json ./ 
RUN npm install
COPY tsconfig.json ./
COPY src ./src
RUN npm run build && \
    npm prune --production

FROM node:23.5-alpine3.20 AS runtime
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./
RUN chown -R node:node .
USER node
CMD node index.js
