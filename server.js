import express from 'express';
import fs from 'fs';
import path from 'path';
import cors from 'cors';

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(cors());

const __dirname = path.resolve(); // Necesario en ES Modules

// Ruta para obtener usuarios
app.get('/api/users', (req, res) => {
  const filePath = path.join(__dirname, 'users.json');
  if (fs.existsSync(filePath)) {
    const usersData = fs.readFileSync(filePath);
    res.json(JSON.parse(usersData));
  } else {
    res.json([]);
  }
});

// Ruta para registrar un nuevo usuario
app.post('/api/register', (req, res) => {
  const { username, password } = req.body;
  const filePath = path.join(__dirname, 'users.json');
  
  let users = [];
  if (fs.existsSync(filePath)) {
    const usersData = fs.readFileSync(filePath);
    users = JSON.parse(usersData);
  }

  const newUser = { username, password, role: 'user' };
  users.push(newUser);

  fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
  res.json({ message: 'Usuario registrado exitosamente', user: newUser });
});

app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
