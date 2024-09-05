# DocsHub - Docker

## Docker compose

Start and build the DocsHub app with the following compose.

```yml
# docker-compose.yml
services:
  docshub-watch:
    container_name: docshub
    image: <in_coming>:candidate
    ports:
      - "4321:4321"
    restart: unless-stopped
    volumes:
      - ./docs:/app/src/content/docs
      - ./images:/app/public/images
    environment:
      DOCUMENTATION_TITLE: "Example Documentation title"
      VERSION: "0.0.1"
      REPOSITORY_TYPE: "github"
      REPOSITORY_URL: "https://github.com/atmgrupomaggioli/docshub"
```

```bash
docker compose up -d --build
```

## Docker run

Alternatively, if you don't have Docker Compose

You can start the DocsHub Docker environment using the following docker run command.

```bash
docker run -d \
  --name docshub \
  -p 4321:4321 \
  --restart unless-stopped \
  -v ./docs:/app/src/content/docs \
  -v ./images:/app/public/images \
  -e DOCUMENTATION_TITLE="Example Documentation title" \
  -e VERSION="0.0.1" \
  -e REPOSITORY_TYPE="github" \
  -e REPOSITORY_URL="https://github.com/atmgrupomaggioli/docshub" \
  <in_coming>:candidate
```