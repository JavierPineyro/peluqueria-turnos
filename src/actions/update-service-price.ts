import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export async function updatePrice(id: string, formData: FormData) {
  const name = formData.get("name") as string;
  const price = Number(formData.get("price"));

  if (!name || !price) {
    throw new Error("Invalid inputs at updatePrice action");
  }

  const supabase = createServerActionClient({ cookies });
  // DO SUPABASE STUFF HERE
}
