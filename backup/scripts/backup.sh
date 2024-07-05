#!/bin/bash

# Параметры подключения к базе данных
PGHOST=${PGHOST:-postgres}
PGPORT=${PGPORT:-5432}
PGUSER=${PGUSER:-postgres}
PGPASSWORD=${PGPASSWORD:-your_password}
PGDATABASE=${PGDATABASE:-site_with_admin}
DATE=$(date +"%Y%m%d%H%M")
BACKUP_FILE="/backup/data/${PGDATABASE}_${DATE}.sql"

# Выполнить резервное копирование
PGPASSWORD=$PGPASSWORD pg_dump --clean -h $PGHOST -p $PGPORT -U $PGUSER $PGDATABASE > $BACKUP_FILE

#pg_dump --username pg_username         [--password pg_password] db_name > /path/on/your/machine/dump.sql
# Проверка успешности выполнения резервного копирования
if [ $? -eq 0 ]; then
  echo "Backup succeeded: $BACKUP_FILE"
else
  echo "Backup failed"
fi
