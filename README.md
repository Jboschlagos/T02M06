# 📦 Gestión de Productos - API REST con Node.js
## 🎯 Objetivo del Proyecto
### Implementar un servidor web en Node.js con API REST para gestionar productos, incluyendo un cliente web interactivo que consuma los endpoints.

📁 Estructura de Archivos
text
proyecto/
├── server.js          # Servidor principal (API)
├── productos.txt      # Base de datos de productos
├── package.json       # Dependencias
├── public/           # Cliente web
│   ├── index.html    # Interfaz principal
│   └── style.css     # Estilos
└── README.md         # Este archivo
## 🚀 Instalación Rápida
bash
# 1. Instalar dependencias
npm install

# 2. Iniciar servidor
node server.js

# 3. Acceder:
# API:      http://localhost:3000/api/productos
# Cliente:  http://localhost:3000
🔌 Endpoints Disponibles
GET /api/productos
Descripción: Obtiene todos los productos

Método: GET

Respuesta: 200 OK con lista de productos en JSON

POST /api/productos
Descripción: Agrega un nuevo producto

Método: POST

Body requerido: JSON con { "nombre": "string", "precio": number }

Respuestas:

201 Created: Producto agregado

400 Bad Request: Datos inválidos

Otros métodos
PUT, DELETE, PATCH: 405 Method Not Allowed

Solo se permiten GET y POST

🎨 Características del Cliente Web
Lista productos desde la API

Ordena por nombre o precio

Formulario para agregar nuevos productos

Imágenes automáticas según tipo de producto

Validación en tiempo real

Mensajes de estado del servidor

🛠️ Tecnologías
Backend: Node.js, Express, CORS

Frontend: HTML5, CSS3, JavaScript (ES6+)

Persistencia: Archivo de texto (productos.txt)

🧪 Pruebas Recomendadas
Usa Thunder Client en VSCode para probar:

GET /api/productos

POST con datos válidos

POST con datos inválidos (nombre vacío, precio negativo)

PUT (debería dar error 405)

⚠️ Errores Comunes
Puerto 3000 en uso: Cambiar puerto en server.js

CORS errors: El servidor ya incluye CORS configurado

Archivo no se guarda: Verificar permisos de escritura

📝 Notas
Los datos se guardan en productos.txt (formato: nombre, precio)

Cada producto recibe un ID automático

El cliente se sirve desde la carpeta public/

La API responde siempre en formato JSON

Proyecto educativo - Curso Full Stack JavaScript
Autor: Jorge Bosc
