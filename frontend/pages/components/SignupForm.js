import { useState } from "react";
import Link from "next/link";
import axios from "../../utils/api";

export default function SignupForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/auth/signup", { name, email, password });
      setMessage(res.data.msg);
    } catch (error) {
      setMessage(error.response?.data?.msg || "Erreur lors de l'inscription");
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
        <h3 className="text-center mb-4">Inscription</h3>
        <form onSubmit={handleSignup}>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Nom"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
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
          <div className="form-check mb-3">
            <input
              type="checkbox"
              className="form-check-input"
              id="terms"
              required
            />
            <label className="form-check-label" htmlFor="terms">
              J'accepte les termes et conditions
            </label>
          </div>
          <button type="submit" className="btn btn-primary w-100">
            S'inscrire maintenant
          </button>
        </form>
        <p className="mt-3 text-center">{message}</p>
        <p className="mt-3 text-center">
          Déjà un compte ?{" "}
          <Link href="/auth/login" legacyBehavior>
            <a className="text-primary">Connectez-vous</a>
          </Link>
        </p>
      </div>
      <div className="d-flex flex-column align-items-center justify-content-center ms-4">
        <h1 className="text-white fw-bold">Formulaire d'Inscription</h1>
      </div>
    </div>
  );
}
