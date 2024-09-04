FROM node:20-alpine AS build
WORKDIR /app
COPY . .
RUN npm i
COPY . .

CMD ["npm", "run", "dev:watch"]
EXPOSE 4321