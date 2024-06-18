# Chat Room

## Descripción

Este es un proyecto de Chat Room que utiliza tecnologías modernas tanto en el frontend como en el backend para proporcionar una experiencia de chat en tiempo real.

### Frontend

- Vue 3
- Vite
- Vuex
- Vue-Router
- Socket.io

### Backend

- NestJS
- MongoDB
- JWT Auth
- Socket.io

## Instrucciones

### Requisitos

- Node.js versión 18.18.0
- Docker instalado

### Instalación

1. Clona el repositorio:

    ```bash
    git clone https://github.com/tu-usuario/chat-room.git
    cd chat-room
    ```

2. Instala las dependencias en cada carpeta (frontend y backend):

    ```bash
    cd frontend
    npm install
    cd ../backend
    npm install
    ```

3. En el proyecto del backend, ejecuta el siguiente comando para levantar el contenedor de Docker:

    ```bash
    docker-compose up -d --build
    ```

## Funcionalidades

### Frontend

- Módulo de inicio de sesión.
- Módulo de registro de usuario.
- Módulo de contactos.
- Módulo de chats y mensajes.

### Backend

- API de inicio de sesión.
- API de registro de usuario.
- API de contactos.
- API de búsqueda de contactos.
- API de chats.
- API de mensajes.

## Guía de Inicio

### Crear cuentas

Para comenzar a usar la aplicación, es necesario crear al menos dos cuentas de usuario.

### Registro de usuario

-Registro #1
![image](https://github.com/alicarlo/selliaChatRoom/assets/27228316/ef5e728a-dc0e-481f-a53d-7bd09fcbac9c)

-Registro #2
![image](https://github.com/alicarlo/selliaChatRoom/assets/27228316/c375cb40-f868-4558-b868-472fe6b43b0e)


### Inicio de sesión

![image](https://github.com/alicarlo/selliaChatRoom/assets/27228316/e61ce778-a0c3-40a8-8686-85a0d9a1f3a6)


### Agregar Contacto

![image](https://github.com/alicarlo/selliaChatRoom/assets/27228316/8345b22a-e3fb-42bc-a674-ffbd29490b47)

![image](https://github.com/alicarlo/selliaChatRoom/assets/27228316/9c67bf80-06d5-45f5-ae38-ae6d378d3460)

![image](https://github.com/alicarlo/selliaChatRoom/assets/27228316/7afaf71f-7bc9-4679-9d81-135ebc02ed4a)


### Iniciar chat

1. Selecciona uno de tus contactos.
   
   ![image](https://github.com/alicarlo/selliaChatRoom/assets/27228316/61a0e04f-eaf5-4276-a4ba-eb752a042ecb)

   ![image](https://github.com/alicarlo/selliaChatRoom/assets/27228316/e5c9309c-bd62-4f10-8f65-85dd8685ba5b)

   ![image](https://github.com/alicarlo/selliaChatRoom/assets/27228316/f4348e94-01ec-406b-bdea-8c14928a5d73)

   ![image](https://github.com/alicarlo/selliaChatRoom/assets/27228316/a82a6db7-e757-4935-94e4-cc085bf7cee5)



3. Envía un mensaje al contacto. Se soportan textos e imágenes.
   
   ![image](https://github.com/alicarlo/selliaChatRoom/assets/27228316/181d99ab-accd-43f4-8f8e-b39961fe6435)

   ![image](https://github.com/alicarlo/selliaChatRoom/assets/27228316/f5043641-6a2f-4e28-b1fc-7227a37af33a)

   ![image](https://github.com/alicarlo/selliaChatRoom/assets/27228316/727f2642-658d-4428-b650-218f7435c179)


## Descripción del flujo

- Para iniciar un chat es necesario tener un contacto agregado. 
- La búsqueda de contactos se realiza por nombre de usuario. 
- Al seleccionar un contacto, se crea automáticamente un chat en MongoDB. 
- Al enviar un mensaje al contacto, se inicia la conexión con el socket y se crea un `joinRoom` con el `chatId` creado al abrir la conversación. 
- Al abrir los chats, se crea un socket que escucha si se crea un chat para notificarlo.
