# Backend — Entrevista técnica de Wortise 🚀

Este es el backend para la entrevista técnica de Wortise. 💻✨

## 🤖 Uso de inteligencia artificial

Durante el desarrollo del proyecto utilicé **Codex** como herramienta de inteligencia artificial, principalmente para agilizar tareas repetitivas y comprender conceptos que desconocía y que debía aplicar. 🧠⚡

Todo el código generado o asistido por IA fue revisado y auditado cuidadosamente, corroborando que cada implementación fuera correcta y que el proyecto mantuviera una arquitectura limpia, mantenible y escalable. 🔍✅🏗️

## 📥 Instalación y ejecución

### 1. Clonar el repositorio

Cloná el proyecto ejecutando el siguiente comando en una terminal: 📦

```bash
git clone https://github.com/matigames765/backend-wortise.git
```

Luego, ingresá al directorio del proyecto:

```bash
cd backend-wortise
```

### 2. Instalar las dependencias

Instalá todas las dependencias necesarias con npm: 🧩

```bash
npm install
```

### 3. Configurar las variables de entorno

Creá un archivo `.env` en la raíz del proyecto tomando como referencia el archivo `.env.example`. 🔐⚙️

```env
# Puerto en el que se ejecutará el servidor. Si no se especifica, se utilizará el puerto 3000.
PORT=3000

# URI de conexión a la instancia o clúster de MongoDB.
MONGO_URI=mongodb://localhost:27017

# Nombre de la base de datos que utilizará la aplicación.
MONGO_DB_NAME=wortise

# URL del frontend autorizada para realizar solicitudes al backend mediante CORS.
FRONTEND_URL=http://localhost:5173

# URL pública/base del backend, utilizada por el sistema de autenticación.
API_URL=http://localhost:3000
```

> 💡 Los valores anteriores son ejemplos para un entorno local. Reemplazalos según la configuración de tu entorno y nunca publiques credenciales sensibles. 🛡️

### 4. Iniciar la aplicación

Finalmente, ejecutá el servidor en modo desarrollo: ▶️🔥

```bash
npm run dev
```


