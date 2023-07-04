import { useEffect } from "react";
import { useRouter } from "next/router";

function NotFound() {
  const router = useRouter();
  useEffect(() => {
    setTimeout(() => router.push("/"), 3000);
  }, []);
  return (
    <div
      style={{
        background: "#f23d80",
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <h1 style={{ color: "#fff" }}>
        Esta página não existe, vamos te levar de voltar...
      </h1>
    </div>
  );
}

export default NotFound;
