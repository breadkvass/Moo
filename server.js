import jsonServer from "json-server";
import cors from "cors";

const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

server.use(cors());
server.use(middlewares);
server.use(jsonServer.bodyParser); // Позволяет работать с `req.body`

// Моковые данные пользователей (как в `db.json`)
const users = [
  { id: 1, email: "aleksei@example.com", password: "lkJlkn8hj", fullname: "Aleksei K", token: "mock-token-123" }
];

// Обрабатываем вход в систему
server.post("/login", (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);

  if (user) {
    res.json({ success: true, data: { token: user.token } });
  } else {
    res.status(401).json({ success: false, data: { message: "Invalid email or password" } });
  }
});

// Подключаем стандартный роутер JSON Server
server.use(router);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`JSON Server is running on http://localhost:${PORT}`);
});
