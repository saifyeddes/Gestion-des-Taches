import { useState } from "react";
import axios from "../../utils/api";
import { useRouter } from "next/router";
import Link from "next/link";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/auth/login", { email, password });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      setMessage("Connexion réussie !");
      router.push("/dashboard");
    } catch (error) {
      setMessage(error.response?.data?.msg || "Erreur lors de la connexion");
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{ backgroundColor: "#007bff" }}
    >
      <div
        className="card shadow p-4"
        style={{ maxWidth: "400px", width: "100%" }}
      >
        <h3 className="text-center mb-4">Connexion</h3>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Se connecter
          </button>
        </form>
        <p className="mt-3 text-center">{message}</p>
        <p className="mt-3 text-center">
          Pas encore de compte ?{" "}
          <Link href="/auth/signup" legacyBehavior>
            <a className="text-primary">Inscrivez-vous</a>
          </Link>
        </p>
      </div>
      <div className="d-flex flex-column align-items-center justify-content-center ms-4">
        <h1 className="text-white fw-bold">Formulaire de Connexion</h1>
      </div>
    </div>
  );
}
