export async function login(
  username,
  password
) {
  const data = {username: username, password: password}

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/api/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((data) => data.json()).then((data) => localStorage.setItem("data", JSON.stringify(data)));

  return res.json();
}
