import { useRouter } from "next/router";

export default function HomePage() {
  const router = useRouter();

  const goToLogin = () => {
    router.push("/auth/login");
  };

  return (
    <div>
      <h1>Bienvenue sur Next.js</h1>
      <button onClick={goToLogin}>Aller à la Connexion</button>
    </div>
  );
}
