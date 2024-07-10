# Simple CRM

## Deployment

Приложение распространяется как Docker-контейнер.

Данные параметры можно скорректировать в `.env`.

поменять в /server/index.js 
cors options на тот хост который нужен

поменять в /admin/package.json
для build:prod apiUrl

запустить

Пример:
```
docker compose up -d

chmod +x ./deploy.sh
./deploy.sh
```



## Development

Приложение использует менеджер пакетов `npm`.

- `npm i`
- `npm run dev`
