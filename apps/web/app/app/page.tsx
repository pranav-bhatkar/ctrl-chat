import { MessageCircle, Settings, Triangle, UserCircle } from "lucide-react";
import { Button } from "@ctrl-chat/ui/components/ui/button";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@ctrl-chat/ui/components/ui/tooltip";
import Link from "next/link";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@ctrl-chat/ui/components/ui/avatar";
import { cn } from "@ctrl-chat/ui/lib/utils";

export default function page() {
  return (
    <div className="grid relative  w-full">
      <TooltipProvider>
        <aside className="inset-y fixed flex h-full top-0 z-20 ">
          <div className="hidden border-r md:block min-h-[calc(100vh-53px)] overflow-scroll no-scrollbar mt-[53px]">
            <div className="flex md:w-[270px] lg:w-[333px] max-h-screen flex-col gap-2">
              <div className="flex-1 ">
                <nav className="grid items-start px-2 text-sm font-medium lg:px-4 py-4 gap-4">
                  {Array.from({ length: 2 }).map((_, index) => (
                    <ChatButton key={index} index={index} />
                  ))}
                </nav>
              </div>
            </div>
          </div>
        </aside>
      </TooltipProvider>

      <div className="flex flex-col mt-[53px]">
        <main className="grid w-full md:grid-cols-[273px_1fr] lg:grid-cols-[333px_1fr]">
          <div className=""></div>
          <div className="h-[calc(100vh-200px)] flex justify-center items-center">
            <div className="flex flex-col justify-center items-center w-full container">
              <p className="text-lg font-semibold">Select a chat to continue</p>
              <div className="mt-4 flex flex-col w-full justify-center space-y-2 md:flex-row md:gap-2 md:items-center md:space-y-0">
                <Button variant="default" size="lg" asChild>
                  <Link href="/app/chat/1">Start a new chat</Link>
                </Button>

                <Button variant="outline" size="lg">
                  <Link href="/app/chat/1">Join a chat</Link>
                </Button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

function ChatButton({ index }: { index: number }) {
  return (
    <Link
      href={`/app/chat/${index + 1}`}
      className={cn(
        "bg-muted/40 px-4 py-2 rounded-md flex justify-between items-center",
        "hover:bg-muted transition-all duration-300 ease-in-out hover:shadow-md hover:ring-2 hover:ring-primary hover:ring-opacity-50",
        "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50",
      )}
    >
      <div className="flex justify-start items-center gap-4">
        <Avatar>
          <AvatarImage
            src={
              index % 2 === 0
                ? "https://github.com/pranav-bhatkar.png"
                : "https://github.com/PranitAdgokar.png"
            }
          />
          <AvatarFallback>
            <UserCircle />
          </AvatarFallback>
        </Avatar>
        <div className="">
          <h1 className="text-sm font-semibold" aria-label="username">
            {/* randomly show Pranav bhatkar or Pranit Adgokar */}
            {index % 2 === 0 ? "Pranav Bhatkar" : "Pranit Adgokar"}
          </h1>
          <p
            className="text-xs text-muted-foreground"
            aria-label="last message..."
          >
            last message...
          </p>
        </div>
      </div>
      <div className="self-start">
        <p className="text-xs text-muted-foreground">10:30 AM</p>
      </div>
    </Link>
  );
}
