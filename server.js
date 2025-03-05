import jsonServer from "json-server";
import cors from "cors";

const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

server.use(cors());
server.use(middlewares);
server.use(jsonServer.bodyParser);

const db = router.db;
const users = db.get("users").value();
const authors = db.get("authors").value();
const quotes = db.get("quotes").value();

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

server.get("/author", (req, res) => {
  const token = req.query.token;
  const user = users.find(u => u.token === token);
  
  if (!user) {
    return res.status(401).json({ success: false, data: { message: "Access denied." } });
  }

  const randomAuthor = authors[Math.floor(Math.random() * authors.length)];
  
  res.json({ success: true, data: randomAuthor });
});

server.get("/quote", (req, res) => {
  const { token, authorId } = req.query;

  const user = users.find(u => u.token === token);
  if (!user) {
    return res.status(401).json({ success: false, data: { message: "Access denied." } });
  }

  const author = authors.find(a => a.authorId === Number(authorId));
  if (!author) {
    return res.status(404).json({ success: false, data: { message: "Author not found." } });
  }

  const authorQuotes = quotes.filter(q => q.authorId === Number(authorId));
  if (authorQuotes.length === 0) {
    return res.status(404).json({ success: false, data: { message: "No quotes found for this author." } });
  }

  const randomQuote = authorQuotes[Math.floor(Math.random() * authorQuotes.length)];

  res.json({ success: true, data: randomQuote });
});

server.delete("/logout", (req, res) => {
  const token = req.query.token;
  const user = users.find(u => u.token === token);

  if (user) {
    res.json({ success: true, data: {} });
  } else {
    res.status(401).json({ success: false, data: { message: "Invalid token or already logged out." } });
  }
});

server.use(router);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`JSON Server is running on http://localhost:${PORT}`);
});
