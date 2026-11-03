// API simulada para el laboratorio. Solo para desarrollo: no usar en producción.
// Uso: node mock-api/server.mjs
// Variables opcionales: PORT (8080) y TOKEN_TTL_SECONDS (3600)
import { createHmac, randomUUID } from 'node:crypto';
import { createServer } from 'node:http';

const PORT = Number(process.env.PORT ?? 8080);
const TOKEN_TTL_SECONDS = Number(process.env.TOKEN_TTL_SECONDS ?? 3600);
const SECRET = 'mock-secret-no-usar-en-produccion';
const STATUSES = ['todo', 'in-progress', 'done'];

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE, OPTIONS',
};

const users = new Map([
  ['demo@tasks.test', { name: 'Demo', email: 'demo@tasks.test', password: 'Demo1234' }],
]);
const tasksByUser = new Map();

const seedFor = () => {
  const createdAt = new Date().toISOString();
  return [
    { id: randomUUID(), title: 'Aprender JSX', status: 'done', createdAt },
    { id: randomUUID(), title: 'Practicar hooks', status: 'in-progress', createdAt },
    { id: randomUUID(), title: 'Crear mi primer componente', status: 'todo', createdAt },
  ];
};

const base64url = (text) => Buffer.from(text).toString('base64url');
const signature = (data) => createHmac('sha256', SECRET).update(data).digest('base64url');

const createToken = (user) => {
  const header = base64url(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const exp = Math.floor(Date.now() / 1000) + TOKEN_TTL_SECONDS;
  const payload = base64url(JSON.stringify({ email: user.email, name: user.name, exp }));
  return `${header}.${payload}.${signature(`${header}.${payload}`)}`;
};

const verifyToken = (token) => {
  const [header, payload, sig] = token.split('.');
  if (!header || !payload || !sig || signature(`${header}.${payload}`) !== sig) return null;
  const data = JSON.parse(Buffer.from(payload, 'base64url').toString());
  return data.exp > Math.floor(Date.now() / 1000) ? data : null;
};

const send = (res, status, body) => {
  res.writeHead(status, { 'Content-Type': 'application/json', ...corsHeaders });
  res.end(body === undefined ? undefined : JSON.stringify(body));
};

const readJson = (req) =>
  new Promise((resolve, reject) => {
    let data = '';
    req.on('data', (chunk) => (data += chunk));
    req.on('end', () => {
      try {
        resolve(data ? JSON.parse(data) : {});
      } catch {
        reject(new Error('JSON inválido'));
      }
    });
  });

const isText = (value) => typeof value === 'string' && value.trim() !== '';

const authenticate = (req) => {
  const header = req.headers.authorization ?? '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : '';
  try {
    return token ? verifyToken(token) : null;
  } catch {
    return null;
  }
};

const handle = async (req, res) => {
  const { pathname } = new URL(req.url ?? '/', 'http://localhost');

  if (req.method === 'OPTIONS') return send(res, 204);

  if (req.method === 'POST' && pathname === '/register') {
    const { name, email, password } = await readJson(req);
    if (![name, email, password].every(isText)) {
      return send(res, 400, { code: 40001, message: 'Nombre, correo y contraseña son obligatorios' });
    }
    if (users.has(email)) {
      return send(res, 409, { code: 40901, message: 'Ese correo ya está registrado' });
    }
    users.set(email, { name, email, password });
    return send(res, 201, { email, name });
  }

  if (req.method === 'POST' && pathname === '/login') {
    const { email, password } = await readJson(req);
    const user = users.get(email);
    if (!user || user.password !== password) {
      return send(res, 401, { code: 40101, message: 'Correo o contraseña incorrectos' });
    }
    return send(res, 200, { email: user.email, name: user.name, token: createToken(user) });
  }

  if (pathname.startsWith('/api/')) {
    const identity = authenticate(req);
    if (!identity) {
      return send(res, 401, { code: 40103, message: 'Sesión inválida o expirada' });
    }
    if (!tasksByUser.has(identity.email)) {
      tasksByUser.set(identity.email, seedFor());
    }
    const list = tasksByUser.get(identity.email);

    if (req.method === 'GET' && pathname === '/api/tasks') {
      return send(res, 200, list);
    }
    if (req.method === 'POST' && pathname === '/api/tasks') {
      const { title } = await readJson(req);
      if (!isText(title) || title.trim().length < 3) {
        return send(res, 400, { code: 40002, message: 'El título debe tener al menos 3 caracteres' });
      }
      const created = { id: randomUUID(), title: title.trim(), status: 'todo', createdAt: new Date().toISOString() };
      list.push(created);
      return send(res, 201, created);
    }
    const match = pathname.match(/^\/api\/tasks\/([^/]+)$/);
    if (match) {
      const index = list.findIndex((task) => task.id === match[1]);
      if (index === -1) return send(res, 404, { code: 40401, message: 'Tarea no encontrada' });

      if (req.method === 'PATCH') {
        const { status } = await readJson(req);
        if (!STATUSES.includes(status)) {
          return send(res, 400, { code: 40003, message: 'Estado inválido' });
        }
        list[index] = { ...list[index], status };
        return send(res, 200, list[index]);
      }
      if (req.method === 'DELETE') {
        list.splice(index, 1);
        return send(res, 204);
      }
    }
  }

  return send(res, 404, { code: 40400, message: 'Ruta no encontrada' });
};

createServer((req, res) => {
  handle(req, res)
    .catch((error) => send(res, 400, { code: 40000, message: error.message }))
    .finally(() => console.log(`${req.method} ${req.url} -> ${res.statusCode}`));
}).listen(PORT, () => {
  console.log(`API simulada en http://localhost:${PORT} (token válido ${TOKEN_TTL_SECONDS} s)`);
  console.log('Usuario de prueba: demo@tasks.test / Demo1234');
});