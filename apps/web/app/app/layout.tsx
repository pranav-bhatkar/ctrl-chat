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

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid h-screen w-full pl-[53px]">
      <TooltipProvider>
        <aside className="inset-y fixed flex h-full left-0 z-20">
          <div className="flex h-full flex-col border-r">
            <div className="border-b p-2">
              <Button variant="outline" size="icon" aria-label="Home">
                <Triangle className="size-5 fill-foreground" />
              </Button>
            </div>
            <nav className="grid gap-1 p-2">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-lg bg-muted"
                    aria-label="Chat"
                  >
                    <MessageCircle className="size-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right" sideOffset={5}>
                  Chat
                </TooltipContent>
              </Tooltip>
            </nav>
            <nav className="mt-auto grid gap-1 p-2">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="mt-auto rounded-lg"
                    aria-label="settings"
                  >
                    <Settings className="size-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right" sideOffset={5}>
                  Settings
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="mt-auto rounded-lg"
                    aria-label="Account"
                  >
                    <UserCircle className="size-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right" sideOffset={5}>
                  Account
                </TooltipContent>
              </Tooltip>
            </nav>
          </div>
          <div className="hidden border-r md:block min-h-[calc(100vh-53px)] overflow-scroll no-scrollbar mt-[53px]">
            <div className="flex md:w-[270px] lg:w-[333px] max-h-screen flex-col gap-2">
              <div className="flex-1 ">
                <nav className="grid items-start px-2 text-sm font-medium lg:px-4 py-4 gap-4">
                  {Array.from({ length: 10 }).map((_, index) => (
                    <ChatButton key={index} index={index} />
                  ))}
                </nav>
              </div>
            </div>
          </div>
        </aside>
      </TooltipProvider>

      <div className="flex flex-col">
        <header className="sticky top-0 z-10 flex h-[53px] items-center gap-1 border-b bg-background px-4">
          <h1 className="text-xl font-semibold">
            <span className="text-primary font-bold">Ctrl</span> Chat
          </h1>
        </header>
        <main className="grid w-full md:grid-cols-[273px_1fr] lg:grid-cols-[333px_1fr]">
          <div className=""></div>
          <div>{children}</div>
        </main>
      </div>
    </div>
  );
}

function ChatButton({ index }: { index: number }) {
  return (
    <Link
      href={"/app/chat/" + index}
      className={cn(
        "bg-muted/40 px-4 py-2 rounded-md flex justify-between items-center",
        "hover:bg-muted transition-all duration-300 ease-in-out hover:shadow-md hover:ring-2 hover:ring-primary hover:ring-opacity-50",
        "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50",
      )}
    >
      <div className="flex justify-start items-center gap-4">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="">
          <h1 className="text-sm font-semibold" aria-label="username">
            Pranit Adgokar
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
