import jsonServer from "json-server";
import cors from "cors";

const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

server.use(cors());
server.use(middlewares);
server.use(jsonServer.bodyParser);

const users = [
  { id: 1, email: "aleksei@example.com", password: "lkJlkn8hj", fullname: "Aleksei K", token: "fb566635a66295da0c8ad3f467c32dcf" }
];

server.post("/login", (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);

  if (user) {
    res.json({ success: true, data: { token: user.token } });
  } else {
    res.status(401).json({ success: false, data: { message: "Invalid email or password" } });
  }
});

server.get("/profile", (req, res) => {
  const token = req.query.token;
  const user = users.find(u => u.token === token);

  if (user) {
    res.json({ success: true, data: { fullname: user.fullname, email: user.email } });
  } else {
    res.status(401).json({ success: false, data: { message: "Access denied." } });
  }
});

server.use(router);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`JSON Server is running on http://localhost:${PORT}`);
});
