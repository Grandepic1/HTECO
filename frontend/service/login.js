export async function login(username, password) {
  const data = { username: username, password: password };

  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/api/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok || result.error) {
    throw new Error(result.message || "Login gagal. Username atau password salah.");
  }

  localStorage.setItem("data", JSON.stringify(result));

  return result;
}