FROM debian:latest
WORKDIR /backup
# Установите необходимые пакеты
RUN apt-get update && apt-get install -y --no-install-recommends \
    bash \
    curl \
    postgresql-client \
    cron


# Создайте каталоги для скриптов и резервных копий
RUN mkdir -p /backup/scripts /backup/data

# Скопируйте скрипты в контейнер
COPY scripts/backup.sh /backup/scripts/backup.sh
COPY scripts/restore.sh /backup/scripts/restore.sh
#COPY cronjob /etc/crontabs/root

# Установите права на выполнение скриптов
RUN chmod +x /backup/scripts/backup.sh /backup/scripts/restore.sh

# Запуск cron в фоновом режиме
#CMD ["cron", "-f"]
#CMD ["/backup/scripts/backup.sh"]
#CMD ["/backup/scripts/restore.sh"]
