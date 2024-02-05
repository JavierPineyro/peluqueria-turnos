'use client'

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LogOutButton() {
  const supabase = createClientComponentClient()
  const router = useRouter()

  const handleLogOut = async () => {
    await supabase.auth.signOut()
    router.push("/login")
  }

  return (
    <div className="flex items-center justify-center gap-1" onClick={handleLogOut}>
      <LogOut className="mr-2 h-4 w-4" />
      <span className="text-white">Cerrar sesión</span>
    </div>
  )
}

