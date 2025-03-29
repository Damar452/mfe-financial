# 📌 Proyecto MF-Financial

Este proyecto es un sistema de micro frontends (MFE) que integra aplicaciones en **Angular** y **React** utilizando **Single SPA**.

## 🚀 Requisitos

### 🔹 Node.js
- **Versión mínima:** 18.13.0
- **Versión recomendada:** 18.17.0 o superior

Para verificar tu versión de Node.js, ejecuta:
```sh
node -v
```
Si necesitas actualizar Node.js, descárgalo desde [nodejs.org](https://nodejs.org/) o usa **nvm** (Node Version Manager).

### 🔹 Angular
- **Versión mínima:** 16.2.12
- **Versión recomendada:** 19.2.5 o superior

### 🔹 React.js
- **Versión mínima:** 17.0.2

## 📦 Instalación

Puedes instalar todas las dependencias a la vez o hacerlo de manera individual.

### 🔹 Instalación completa
Ejecuta el siguiente comando para instalar todas las dependencias:
```sh
npm run install:all
```

### 🔹 Instalación por separado
Si prefieres instalar cada módulo individualmente, usa:
```sh
npm run install:root   # Instala dependencias del root
npm run install:backend   # Instala dependencias del server de backend
npm run install:angular  # Instala dependencias del micro frontend Angular
npm run install:react  # Instala dependencias del micro frontend React
```

## 🏃‍♂️ Levantar los servidores

Puedes iniciar todos los servidores en paralelo o hacerlo individualmente.

### 🔹 Levantar todo el sistema
```sh
npm run start:all
```

### 🔹 Levantar cada servicio por separado
```sh
npm run start:backend    # Inicia el servidor de backend
npm run start:root    # Inicia el servidor principal
npm run start:angular  # Inicia el micro frontend Angular
npm run start:react  # Inicia el micro frontend React
```

**Si prefieres instalar las dependencias de cada aplicación usando sus propios comandos:**
- **Iniciar servidor raíz:**
  ```sh
  npm run start
  ```
- **Iniciar Backend:**
  ```sh
  cd backend
  npm run start
  ```
- **Iniciar Angular:**
  ```sh
  cd mf-angular/team-angular
  npm run start:spa
  ```
- **Iniciar React:**
  ```sh
  cd mf-react
  npm run start
  ```

### 🔹 Script para pruebas unitarias en Angular
  ```sh
  cd mf-angular/team-angular
  ng test
  ```


  
### 🔹 Puertos por cada MFE
- **Backend:** [http://localhost:3000](http://localhost:3000)
- **Root:** [http://localhost:9000](http://localhost:9000) <= **Puerto de despliegue de la app**
- **Angular:** [http://localhost:4200](http://localhost:4200)
- **React:** [http://localhost:8080](http://localhost:8080)

## ⚙️ Scripts disponibles

### 📌 Instalación de dependencias
| Comando              | Descripción |
|----------------------|-------------|
| `npm run install:root`   | Instala dependencias del proyecto raíz |
| `npm run install:angular` | Instala dependencias del MFE en Angular |
| `npm run install:react`   | Instala dependencias del MFE en React |
| `npm run install:all`     | Instala todas las dependencias en serie |

### 📌 Levantar los servidores
| Comando              | Descripción |
|----------------------|-------------|
| `npm run start:root`    | Inicia el servidor del proyecto raíz |
| `npm run start:angular` | Inicia el MFE en Angular |
| `npm run start:react`   | Inicia el MFE en React |
| `npm run start:all`     | Inicia todos los servidores en paralelo |

📌 **Nota:** Los scripts manejan automáticamente los cambios de directorio (`cd`), por lo que no es necesario moverse manualmente entre carpetas.

---

## 📄 Notas adicionales
- Este proyecto usa **Single SPA** para la integración de micro frontends.
- Asegúrate de que todos los servicios estén corriendo correctamente antes de probar la aplicación en el navegador. si todo sale bien ve a esta url: [http://localhost:9000](http://localhost:9000) 


📌 **Datos de prueba para iniciar sesión:** 

- **Email:** john.doe@example.com
- **password:** password123


📌 ¡Listo! Ahora puedes comenzar a trabajar en tu proyecto 🎉

