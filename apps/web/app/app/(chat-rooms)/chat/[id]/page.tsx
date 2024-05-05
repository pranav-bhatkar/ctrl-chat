"use client";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@ctrl-chat/ui/components/ui/avatar";
import { Button } from "@ctrl-chat/ui/components/ui/button";
import { Input, PaperPlaneIcon } from "@ctrl-chat/ui/components/ui/input";
import { cn } from "@ctrl-chat/ui/lib/utils";
import { Search, Image, File, Laugh } from "lucide-react";
import { EmojiPicker } from "@ctrl-chat/ui/components/ui/emoji-picker";

import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@ctrl-chat/ui/components/ui/tooltip";

function page() {
  const [messages, setMessages] = React.useState([
    {
      role: "agent",
      content: "Hi, how can I help you today?",
    },
    {
      role: "user",
      content: "Hey, I'm having trouble with my account.",
    },
    {
      role: "agent",
      content: "What seems to be the problem?",
    },
    {
      role: "user",
      content: "I can't log in.",
    },
    {
      role: "agent",
      content: "Hi, how can I help you today?",
    },
    {
      role: "user",
      content: "Hey, I'm having trouble with my account.",
    },
    {
      role: "agent",
      content: "What seems to be the problem?",
    },
    {
      role: "user",
      content: "I can't log in.",
    },
    {
      role: "agent",
      content: "Hi, how can I help you today?",
    },
    {
      role: "user",
      content: "Hey, I'm having trouble with my account.",
    },
    {
      role: "agent",
      content: "What seems to be the problem?",
    },
    {
      role: "user",
      content: "I can't log in.",
    },
    {
      role: "agent",
      content: "Hi, how can I help you today?",
    },
    {
      role: "user",
      content: "Hey, I'm having trouble with my account.",
    },
    {
      role: "agent",
      content: "What seems to be the problem?",
    },
    {
      role: "user",
      content: "I can't log in.",
    },
    {
      role: "agent",
      content: "Hi, how can I help you today?",
    },
    {
      role: "user",
      content: "Hey, I'm having trouble with my account.",
    },
    {
      role: "agent",
      content: "What seems to be the problem?",
    },
    {
      role: "user",
      content: "I can't log in.",
    },
    {
      role: "agent",
      content: "Hi, how can I help you today?",
    },
    {
      role: "user",
      content: "Hey, I'm having trouble with my account.",
    },
    {
      role: "agent",
      content: "What seems to be the problem?",
    },
    {
      role: "user",
      content: "I can't log in.",
    },
  ]);
  const [input, setInput] = React.useState("");
  const inputLength = input.trim().length;
  return (
    <div className="flex flex-col relative">
      <div className="fixed flex justify-between items-center border-b w-full py-3 px-4 bg-background">
        <div className="flex items-center space-x-4">
          <Avatar>
            <AvatarImage src="/avatars/01.png" alt="Image" />
            <AvatarFallback>OM</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium leading-none">Sofia Davis</p>
            <p className="text-sm text-muted-foreground">m@example.com</p>
          </div>
        </div>
        <div className="">
          <Button variant="outline" size="icon">
            <Search className="size-5" />
          </Button>
        </div>
      </div>
      <div className="space-y-4  px-4  py-[90px]">
        {messages.map((message, index) => (
          <div
            key={index}
            className={cn(
              "flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm",
              message.role === "user"
                ? "ml-auto bg-primary text-primary-foreground"
                : "bg-muted",
            )}
          >
            {message.content}
          </div>
        ))}
      </div>
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background border-t ml-[53px] md:ml-[323px] lg:ml-[386px]">
        <form
          onSubmit={(event) => {
            event.preventDefault();
            if (inputLength === 0) return;
            setMessages([
              ...messages,
              {
                role: "user",
                content: input,
              },
            ]);
            setInput("");
          }}
          className="flex w-full items-center space-x-2"
        >
          <EmojiPicker onChange={(emoji) => setInput(input + emoji)} />

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon">
                  <Image className="h-4 w-4" />
                  <span className="sr-only">Add Attachment</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Add Photos & videos</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <Input
            id="message"
            placeholder="Type your message..."
            className="flex-1"
            autoComplete="off"
            value={input}
            onChange={(event) => setInput(event.target.value)}
          />
          <Button type="submit" size="icon" disabled={inputLength === 0}>
            <PaperPlaneIcon className="h-4 w-4" />
            <span className="sr-only">Send</span>
          </Button>
        </form>
      </div>
    </div>
  );
}

export default page;
