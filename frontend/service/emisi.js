export async function getEmisi() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/api/faktoremisi`, {
    method: "GET",
  });
  
  const data = await res.json();
  return data;
}