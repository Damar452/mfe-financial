import jsonServer from 'json-server';
import jwt from 'jsonwebtoken';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, 'db.json'));
const middlewares = jsonServer.defaults();

const SECRET_KEY = 'oz#b@tqhQ56x)XjEdd8xM]c8*5&rB8';
const EXPIRES_IN = '9h';

server.use(cors());
server.use(middlewares);
server.use(jsonServer.bodyParser);

/**
 * SRP: Generate token
 */
function generateToken(payload) {
  return jwt.sign(payload, SECRET_KEY, { expiresIn: EXPIRES_IN });
}

/**
 * SRP: Validate token
 * @return El validate payload or null is invalid
 */
function verifyToken(token) {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch (error) {
    return null;
  }
}

/**
 * SRP: list users
 */
function getUsersFromDB() {
  const dbFilePath = path.join(__dirname, 'db.json');
  const dbData = JSON.parse(fs.readFileSync(dbFilePath, 'utf-8'));
  return dbData.users || [];
}

/**
 * Login:
 * 1. Validate email/password
 * 2. Generate Jwt and return data user
 */
server.post('/login', (req, res) => {
  
  const { email, password } = req.body;
  const users = getUsersFromDB();

  const user = users.find(u => u.email === email && u.password === password);
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  // Generar token
  const token = generateToken({ userId: user.id, email: user.email });

  return res.status(200).json({
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    token: token
  });
});

/**
 * Middleware :
 */
server.use((req, res, next) => {
  if (req.path === '/login') {
    return next();
  }

  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];
  const verified = verifyToken(token);
  if (!verified) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
  req.user = verified;
  next();
});


server.use(router);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`JSON Server is running on port ${PORT}`);
});


