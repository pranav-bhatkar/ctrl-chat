"use client";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@ctrl-chat/ui/components/ui/avatar";
import { Button } from "@ctrl-chat/ui/components/ui/button";
import { Input, PaperPlaneIcon } from "@ctrl-chat/ui/components/ui/input";
import { cn } from "@ctrl-chat/ui/lib/utils";
import { Search, Image as ImageIcon, Loader2 } from "lucide-react";
import { EmojiPicker } from "@ctrl-chat/ui/components/ui/emoji-picker";
import Image from "next/image";
import React, { useRef } from "react";
import { toast } from "sonner";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@ctrl-chat/ui/components/ui/tooltip";
import ChatBubble from "@ctrl-chat/ui/components/shared/chat-bubble";

function page() {
  const [messages, setMessages] = React.useState<
    {
      id: number;
      role: "agent" | "user";
      content: string;
      type: "image" | "text";
      status: "sent" | "delivered" | "read";
      state?: "loading" | "loaded" | "error" | "uploading" | "uploaded";
    }[]
  >([
    {
      id: 0,
      role: "agent",
      status: "read",
      type: "text",
      content: "Hi, how can I help you today?",
    },
    {
      id: 1,
      role: "user",
      type: "text",
      status: "read",
      content: "I can't log in.",
    },
    {
      id: 2,
      role: "agent",
      type: "image",
      status: "delivered",
      state: "loaded",
      content: "https://via.placeholder.com/300",
    },
  ]);

  React.useEffect(() => {
    scrollToBottom();
  }, [messages]);
  React.useEffect(() => {
    scrollToBottom();
  }, []);
  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      window.scrollTo({
        top: messagesContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  const [input, setInput] = React.useState("");
  const inputLength = input.trim().length;
  const messagesContainerRef = useRef<HTMLDivElement | null>(null);

  async function handleImage() {
    const file = await new Promise<File | undefined>((resolve) => {
      const input = document.createElement("input");
      input.type = "file";
      input.accept = "image/*";
      input.onchange = () => {
        if (input.files && input.files.length > 0) {
          resolve(input?.files[0]);
        }
      };
      input.click();
    });
    if (!file) {
      toast.error("No file selected");
      return;
    }
    const reader = new FileReader();
    const messageId = messages.length + 1;
    reader.onload = () => {
      setMessages([
        ...messages,
        {
          id: messageId,
          role: "user",
          type: "image",
          state: "uploading",
          status: "sent",
          content: reader.result as string,
        },
      ]);
    };
    setTimeout(() => {
      setMessages((messages) =>
        messages.map((message) =>
          message.id === messageId
            ? { ...message, state: "uploaded" }
            : message,
        ),
      );
    }, 2000);
    reader.readAsDataURL(file);
  }
  return (
    <div className="flex flex-col relative ">
      <div className="fixed z-10 flex justify-between items-center border-b w-full py-3 px-4 bg-background">
        <div className="flex items-center space-x-4">
          <Avatar onClick={scrollToBottom}>
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
      <div ref={messagesContainerRef} className="space-y-4  px-4  py-[90px]">
        {messages.map((message, index) => (
          <ChatBubble message={message} index={index} />
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
                id: messages.length + 1,
                role: "user",
                type: "text",
                status: "sent",
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
                <Button variant="outline" size="icon" onClick={handleImage}>
                  <ImageIcon className="h-4 w-4" />
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
