FROM node:20-alpine AS runtime
WORKDIR /app

COPY . .

RUN npm i
# RUN npm run build

ENV HOST=0.0.0.0
ENV PORT=4321
EXPOSE 4321
CMD npm run build && node ./dist/server/entry.mjs
