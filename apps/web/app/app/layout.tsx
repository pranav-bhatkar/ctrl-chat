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
                    asChild
                  >
                    <Link href="/app">
                      <MessageCircle className="size-5" />
                    </Link>
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
                    asChild
                  >
                    <Link href="/app/settings">
                      <Settings className="size-5" />
                    </Link>
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right" sideOffset={5}>
                  Settings
                </TooltipContent>
              </Tooltip>
            </nav>
          </div>
        </aside>
      </TooltipProvider>

      <div className="flex flex-col">
        <header className="sticky top-0 z-10 flex h-[53px] items-center gap-1 border-b bg-background px-4">
          <h1 className="text-xl font-semibold">
            <span className="text-primary font-bold">Ctrl</span> Chat
          </h1>
        </header>
        <main>{children}</main>
      </div>
    </div>
  );
}
