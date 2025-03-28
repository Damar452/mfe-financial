# JSON Server Banking API

Este proyecto simula un backend bancario con JSON Server, manejando usuarios, cuentas y transacciones, con autenticación JWT.

## Requisitos
- Node.js >= 18
- npm >= 6

## Instalación
1. Clona este repositorio
2. Ejecuta `npm install` para instalar dependencias
3. Ejecuta `npm start` para iniciar el servidor

## Uso
- **Login**: 
  - `POST /login`
  - Body: `{"email": "john.doe@example.com", "password": "password123"}`
  - Retorna un token JWT.
- **Rutas Protegidas**:
  - `/users`, `/accounts`, `/transactions`
  - Añade el header `Authorization: Bearer <token>` en cada petición.

## Estructura de Datos
- **users**: campos id, email, password, firstName, lastName, etc.
- **accounts**: campos accountId, userId, accountNumber, accountType, balance.
- **transactions**: campos transactionId, userId, sourceAccountId, destinationAccountId, amount, type, description, timestamp.

## Ejemplo de Peticiones
- `GET /accounts`
- `GET /transactions/5`
- `GET /accounts?id=1001`
- `POST /accounts`
- `PUT /accounts/1`
- `DELETE /accounts/1`
