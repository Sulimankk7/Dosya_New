import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function AdminPage() {
  const cookieStore = cookies();
  const adminToken = cookieStore.get("admin-token");

  if (!adminToken) {
    redirect("/admin/login");
  }

  redirect("/admin/orders");
}
