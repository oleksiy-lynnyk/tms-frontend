#!/bin/bash

echo "Зупинка процесів на порті 3000..."
PID=$(netstat -ano | findstr :3000 | findstr LISTENING | awk '{print $5}')
if [ -n "$PID" ]; then
    taskkill //PID $PID //F
fi

echo "Запуск React-проєкт..."
npm start
