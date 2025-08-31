export default async function fetchUsers() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users`);
  return res.json();
}
