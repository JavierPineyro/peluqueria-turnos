import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "./ui/dropdown-menu";
import LogOutButton from "@/components/logout.client";

import { Settings } from 'lucide-react'

export default function Dropdown({ user = "usuario" }: { user: string | undefined }) {

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <span className="text-white"> {user}</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-30 sm:w-40">
        <DropdownMenuItem>
          <Settings className="mr-2 h-4 w-4" />
          <DropdownMenuLabel>
            Precios
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