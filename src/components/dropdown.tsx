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

import { Settings } from 'lucide-react'
import Link from "next/link";

export default function Dropdown({ user = "usuario" }: { user: string | undefined }) {

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className={cn("hover:bg-gray-800 transition-colors rounded px-2 py-1 flex items-center justify-center")}>
        <span className="text-white"> {user}</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-30 sm:w-40">
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