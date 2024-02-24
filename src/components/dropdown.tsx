import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "./ui/dropdown-menu";
import LogOutButton from "@/components/logout.client";
import { cn } from "@/lib/utils";

import { Settings, UserCircle } from 'lucide-react'
import Link from "next/link";

export default function Dropdown({ user = "usuario" }: { user: string | undefined }) {

  return (
    <DropdownMenu>
      <DropdownMenuTrigger title={user} className={cn("hover:bg-gray-800 transition-colors rounded-full flex items-center justify-center")}>
        <span className="text-white rounded-full text-center"> <UserCircle className="h-8 w-8" /></span>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-30 sm:w-40">
        <DropdownMenuLabel>
          <span className="font-md font-thin">{user.split("@")[0]}</span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Settings className="mr-2 h-4 w-4" />
          <DropdownMenuLabel>
            <Link className="text-white" href="/dashboard/precios">Precios</Link>
          </DropdownMenuLabel>
        </DropdownMenuItem>
        <DropdownMenuSeparator></DropdownMenuSeparator>
        <DropdownMenuItem>
          <LogOutButton />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}