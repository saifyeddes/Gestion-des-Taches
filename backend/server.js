const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const { setIoInstance } = require("./sockets/socketInstance");

dotenv.config();
const app = express();
<<<<<<< HEAD
=======
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });
>>>>>>> 728ca21d3437ec59d9f61ee0d1cb7c2e1c984632

app.use(express.json());
app.use(cors());

// Connexion à MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
<<<<<<< HEAD
  .then(() => console.log("✅ MongoDB connecté"))
  .catch((err) => console.log("Erreur de connexion :", err));
=======
  .then(() => console.log("✅ MongoDB Connecté"))
  .catch((err) => console.log(err));
>>>>>>> 728ca21d3437ec59d9f61ee0d1cb7c2e1c984632

// Routes Authentification
app.use("/api/auth/signup", require("./routes/auth/signup"));
app.use("/api/auth/login", require("./routes/auth/login"));
app.use("/api/tasks", require("./routes/tasks/taskRoutes"));

<<<<<<< HEAD
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Serveur lancé sur http://localhost:${PORT}`)
);
=======
// WebSocket
io.on("connection", (socket) => {
  console.log("🟢 Un utilisateur s'est connecté au WebSocket");

  // Définir l'instance de Socket.IO
  setIoInstance(io);

  socket.on("disconnect", () => {
    console.log("🔴 Un utilisateur s'est déconnecté");
  });
});

// Démarrage du serveur
const PORT = process.env.PORT || 5001;
server.listen(PORT, () => console.log(`🚀 Serveur sur le port ${PORT}`));
>>>>>>> 728ca21d3437ec59d9f61ee0d1cb7c2e1c984632
