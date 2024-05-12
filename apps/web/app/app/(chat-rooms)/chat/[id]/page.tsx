"use client";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@ctrl-chat/ui/components/ui/avatar";
import { Button } from "@ctrl-chat/ui/components/ui/button";
import { Input, PaperPlaneIcon } from "@ctrl-chat/ui/components/ui/input";
import {
  Search,
  Image as ImageIcon,
  UserCircle,
  CalendarDays,
} from "lucide-react";
import { EmojiPicker } from "@ctrl-chat/ui/components/ui/emoji-picker";
import React, { useRef, useState } from "react";
import { toast } from "sonner";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@ctrl-chat/ui/components/ui/tooltip";
import ChatBubble from "@ctrl-chat/ui/components/shared/chat-bubble";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@ctrl-chat/ui/components/ui/hover-card";
import slides from "./slides";
import LightboxModal from "@ctrl-chat/ui/components/shared/LightBox";
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
  >([]);

  React.useEffect(() => {
    scrollToBottom();
  }, [messages]);
  React.useEffect(() => {
    scrollToBottom();
    const messages = JSON.parse(localStorage.getItem("messages") || "[]");
    setMessages(messages);
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
      saveMessageToLocalStorage({
        id: messageId,
        role: "user",
        type: "image",
        status: "sent",
        content: reader.result as string,
      });
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
  const [openLightbox, setOpenLightbox] = useState(false);
  const [selectedImage, setSelectedImage] = useState(6);
  const handleOpenLightbox = (url: number) => {
    const selectedImage = slides.findIndex((_index, s) => s === url);
    setOpenLightbox(true);
    setSelectedImage(selectedImage);
  };
  const isMobile = window.matchMedia("(max-width: 640px)").matches;
  function saveMessageToLocalStorage(message: {
    id: number;
    role: "agent" | "user";
    content: string;
    type: "image" | "text";
    status: "sent" | "delivered" | "read";
    state?: "loading" | "loaded" | "error" | "uploading" | "uploaded";
  }) {
    const messages = JSON.parse(localStorage.getItem("messages") || "[]");
    messages.push(message);
    localStorage.setItem("messages", JSON.stringify(messages));
  }
  return (
    <>
      <LightboxModal
        images={slides.map((slide) => slide.src)}
        photoIndex={selectedImage}
        setPhotoIndex={setSelectedImage}
        isOpen={openLightbox}
        onCloseRequest={() => setOpenLightbox(false)}
      />
      <div className="flex flex-col relative ">
        <HoverCard>
          <div className="fixed z-10 flex justify-between items-center border-b w-full py-3 px-4 bg-background">
            <div className="flex items-center space-x-4">
              <HoverCardTrigger asChild>
                <div className="flex justify-center items-center gap-2 ">
                  <Avatar className="cursor-pointer">
                    <AvatarImage
                      src="https://github.com/pranav-bhatkar.png"
                      alt="Image"
                    />
                    <AvatarFallback>
                      <UserCircle />
                    </AvatarFallback>
                  </Avatar>

                  <div>
                    <p className="text-sm font-medium leading-none cursor-pointer">
                      Pranav Bhatkar
                    </p>
                    <p className="text-sm text-muted-foreground cursor-pointer">
                      work@pranavbhatkar.me
                    </p>
                  </div>
                </div>
              </HoverCardTrigger>
            </div>
            <div className="">
              <Button variant="outline" size="icon">
                <Search className="size-5" />
              </Button>
            </div>
          </div>
          <HoverCardContent className="w-80">
            <div className="flex justify-between space-x-4">
              <Avatar>
                <AvatarImage src="https://github.com/pranav-bhatkar.png" />
                <AvatarFallback>VC</AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <h4 className="text-sm font-semibold">@pranavbhatkar</h4>
                <p className="text-sm">
                  Pranav Bhatkar is a software engineer at PPS Energy Solutions.
                </p>
                <div className="flex items-center pt-2">
                  <CalendarDays className="mr-2 h-4 w-4 opacity-70" />{" "}
                  <span className="text-xs text-muted-foreground">
                    Joined April 2024
                  </span>
                </div>
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>
        <div ref={messagesContainerRef} className="space-y-4 px-4 py-[90px]">
          {messages.length === 0 ? (
            <div className="flex items-center justify-center h-[50vh]">
              <p className="text-muted-foreground">No messages yet</p>
            </div>
          ) : (
            messages.map((message, index) => (
              <ChatBubble
                message={message}
                index={index}
                setOpenLightbox={(index) => {
                  console.log("index", index);
                  handleOpenLightbox(index);
                }}
              />
            ))
          )}
        </div>
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-background border-t ml-[53px] md:ml-[323px] lg:ml-[386px]">
          <form
            onSubmit={(event) => {
              event.preventDefault();
              if (inputLength === 0) return;
              const message: {
                id: number;
                role: "agent" | "user";
                content: string;
                type: "image" | "text";
                status: "sent" | "delivered" | "read";
                state?:
                  | "loading"
                  | "loaded"
                  | "error"
                  | "uploading"
                  | "uploaded";
              } = {
                id: messages.length + 1,
                role: "user",
                type: "text",
                status: "sent",
                content: input,
              };
              setMessages([...messages, message]);
              saveMessageToLocalStorage(message);
              setInput("");
            }}
            className="flex w-full items-center space-x-2"
          >
            {
              // if it is a mobile device, don't show emoji picker
              !isMobile && (
                <EmojiPicker onChange={(emoji) => setInput(input + emoji)} />
              )
            }

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
    </>
  );
}

export default page;
