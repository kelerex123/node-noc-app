# PROYECTO NOC

El objetivo es crear una serie de tareas usando la Arquitectura limpia con Typescript

# dev
1. Clonar el archivo env.template a .env
2. Configurar las variables de entorno
3. Ejecutar el comando ```npm install```
4. Levantar las bases de datos con el comando 
```
    docker compose up -d
```
5. Ejecutar el comando 
```
    npx prisma migrate dev
```
5. Ejecutar el comando ```npm run dev```