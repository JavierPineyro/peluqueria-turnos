import { cn } from "@/lib/utils";
import { Skeleton } from "./ui/skeleton";

export default function LoadingLogin() {
  return (
    <main className='text-white h-screen flex flex-col justify-center items-center gap-3 bg-gray-800 p-4'>
      <Skeleton className={cn("h-[125px] w-[250px] rounded-xl opacity-85 bg-slate-500")} />
    </main>
  )
}
