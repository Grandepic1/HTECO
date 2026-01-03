export async function register(
  fullName,
  email,
  password
) {
  const data = {
    username: fullName, email: email, password: password
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/api/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  console.log(true)

  return res.json();
}
