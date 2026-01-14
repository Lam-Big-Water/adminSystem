import {supabaseAdmin} from "./supabase";

export async function listUsers() {
  const {
    data: { users },
    error,
  } = await supabaseAdmin.auth.admin.listUsers();

  if (error) {
    console.error("Error fetching users:", error);
    return;
  }

  console.log("Users:", users);
  return users;
}
