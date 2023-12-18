# Nombre del Proyecto

3ra preentrega

## Objetivo de esta preentrega

- Continuar la separacion de arquitectura del proyecto aplicando DAO, Repository y DTO
- Aplicar middleware para autorizacion de rutas segun role
- Agregar modelo de ticket, generar un ticket que compruebe stock de productos

## Iniciar el Proyecto

Para iniciar el proyecto, sigue los siguientes pasos:

1. Instala las dependencias:

npm install

    "bcrypt": "^5.1.1",
    "commander": "^11.1.0",
    "connect-mongo": "^5.1.0",
    "cookie-parser": "^1.4.6",
    "dotenv": "^16.3.1",
    "express": "^4.18.2",
    "express-handlebars": "^7.1.2",
    "express-session": "^1.17.3",
    "mongodb-connection-string-url": "^3.0.0",
    "mongoose": "^6.10.0",
    "multer": "^1.4.5-lts.1",
    "passport": "^0.6.0",
    "passport-github2": "^0.1.12",
    "passport-local": "^1.0.0",
    "session-file-store": "^1.5.0",
    "socket.io": "^4.7.2",
    "uuid": "^9.0.1"

2. Inicia el servidor

npm start

## Interaccion con los modelos

Para esta entrega se agregó una vista para que e administrador pueda agregar productos:

http://localhost:8080/addProducts

Para carts, users y tickets la interaccion se hace desde postman

## Rutas para interactuar con postman

# Agregar Producto

Ruta POST
http://localhost:8080/api/products

Cuerpo de la solicitud

{
"name": "nombre del producto",
"description": "descripcion del producto",
"price": 2000,
"stock": 20,
"category": "categoria",
"thumbnail": "url de la imagen en png"
}

# Agregar Carrito

Ruta POST
http://localhost:8080/api/carts

Cuerpo de la solicitud

{
"name": "nombre carrito",
"description": "descripcion carrito",
"products": []
}

# Agregar Producto a un Carrito

Ruta POST
http://localhost:8080/api/carts/<cid>/products/<pid>

Cuerpo de la solicitud
{
"id": "<pid>",
"cantidad": 1
}

# Ruta para Agregar Ticket

POST
http://localhost:8080/api/carts/<cid>/purchase

## Usuarios de Prueba

Usuario Admin
Email: p@gmail.com
Contraseña: 1

Usuario Regular
Email: puser@gmail.com
Contraseña: 1

## Carritos de Prueba

Para productos con stock
ID: 65804fabfa5eb4929dd1ecea

Para productos sin stock
ID: 65805c4dbc17875eca98d93d

Productos de Prueba con stock
ID: 65804717fa5eb4929dd1ec8e
ID: 6580439568ab20da69fad8bb

Producto de Prueba sin Stock
ID: 65805c4dbc17875eca98d93d
