"use client";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@ctrl-chat/ui/components/ui/avatar";
import { UserCircle, PhoneOff, MicOff, Video } from "lucide-react";
import React from "react";
import { TooltipProvider } from "@ctrl-chat/ui/components/ui/tooltip";
import { cn } from "@ctrl-chat/ui/lib/utils";

function page() {
  return (
    <div className="relative h-[calc(100vh-53px)]">
      <div className="h-full p-4 w-full flex flex-col justify-center items-center ">
        <Avatar className="cursor-pointer size-24 text-center">
          <AvatarImage
            src="https://github.com/pranav-bhatkar.png"
            alt="Image"
          />
          <AvatarFallback>
            <UserCircle />
          </AvatarFallback>
        </Avatar>
        <h1 className="text-2xl font-semibold text-center mt-4">
          Pranav Bhatkar
        </h1>
        <p
          className="text-sm font-medium text-center text-muted-foreground"
          aria-label="status"
        >
          03:17
        </p>

        <div className="flex items-center">
          <TooltipProvider>
            <div className="flex items-center gap-2 mt-4">
              <div
                className={cn(
                  "p-4 rounded-full transition-all duration-300 ease-in-out",
                  "hover:bg-muted-foreground hover:text-black",
                  //   "bg-primary",
                  "bg-muted",
                )}
              >
                <Video className="size-6" />
              </div>
              <div
                className={cn(
                  "p-4 rounded-full transition-all duration-300 ease-in-out",
                  "hover:bg-muted-foreground hover:text-black",
                  //   "bg-primary",
                  "bg-muted",
                )}
              >
                <MicOff className="size-6" />
              </div>
              <div
                className={cn(
                  "p-4 rounded-full transition-all duration-300 ease-in-out",
                  "hover:bg-muted-foreground hover:text-black",
                  //   "bg-primary",
                  "bg-muted",
                )}
              >
                <PhoneOff className="size-6" />
              </div>
            </div>
          </TooltipProvider>
        </div>
      </div>
    </div>
  );
}

export default page;
