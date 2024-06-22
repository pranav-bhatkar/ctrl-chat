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
  Mail,
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
import { cn } from "@ctrl-chat/ui/lib/utils";
import { AnimatePresence } from "framer-motion";

function page({ params }: { params: { id: number } }) {
  const profiles = [
    {
      id: 1,
      name: "Pranav Bhatkar",
      username: "pranavbhatkar",
      email: "work@pranavbhatkar.me",
      avatar: "https://github.com/pranav-bhatkar.png",
      bio: "Pranav Bhatkar is a software engineer at PPS Energy Solutions.",
      joined: "Joined June 2021",
    },
    {
      id: 2,
      name: "Pranit Adgokar",
      username: "pranitadgokar",
      email: "pranit.adgokar@gmail.com",
      avatar: "https://github.com/PranitAdgokar.png",
      bio: "Pranit Adgokar is a software engineer at PPS Energy Solutions.",
      joined: "Joined April 2024",
    },
  ];
  const profile = profiles.find((profile) => profile.id === Number(params.id));
  const [messages, setMessages] = React.useState<
    {
      id: number;
      role: "agent" | "user";
      content: string;
      sender: number;
      type: "image" | "text";
      status: "sent" | "delivered" | "read";
      state?: "loading" | "loaded" | "error" | "uploading" | "uploaded";
    }[]
  >([]);

  React.useEffect(() => {
    scrollToBottom();
  }, [messages]);
  React.useEffect(() => {
    const messages = JSON.parse(localStorage.getItem("messages") || "[]");
    setMessages(messages);
    scrollToBottom();
  }, []);
  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
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
          sender: profile?.id ?? 0,
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
        sender: profile?.id ?? 0,
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
    sender: number;
    status: "sent" | "delivered" | "read";
    state?: "loading" | "loaded" | "error" | "uploading" | "uploaded";
  }) {
    const messages = JSON.parse(localStorage.getItem("messages") || "[]");
    messages.push(message);
    localStorage.setItem("messages", JSON.stringify(messages));
  }

  return (
    <div id="pafe" className="relative h-[calc(100vh-53px)]">
      <LightboxModal
        images={slides.map((slide) => slide.src)}
        photoIndex={selectedImage}
        setPhotoIndex={setSelectedImage}
        isOpen={openLightbox}
        onCloseRequest={() => setOpenLightbox(false)}
      />
      <HoverCard>
        <div className="fixed z-20 flex justify-between items-center border-b w-full py-3 px-4 bg-background">
          <div className="flex items-center space-x-4">
            <HoverCardTrigger asChild>
              <div className="flex justify-center items-center gap-2 ">
                <Avatar className="cursor-pointer">
                  <AvatarImage src={profile?.avatar} alt={profile?.username} />
                  <AvatarFallback>
                    <UserCircle />
                  </AvatarFallback>
                </Avatar>

                <div>
                  <p className="text-sm font-medium leading-none cursor-pointer">
                    {profile?.name}
                  </p>
                  <p className="text-sm text-muted-foreground cursor-pointer">
                    {profile?.email}
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
            <div className="space-y-1">
              <div className=" flex items-center gap-4">
                <Avatar>
                  <AvatarImage src={profile?.avatar} />
                  <AvatarFallback>{profile?.name[0]}</AvatarFallback>
                </Avatar>
                <h4 className="text-sm font-semibold">@{profile?.username}</h4>
              </div>
              <p className="text-sm">{profile?.bio}</p>

              <div className="flex items-center pt-2">
                <Mail className="mr-2 h-4 w-4 opacity-70" />{" "}
                <span className="text-xs text-muted-foreground">
                  {profile?.email}
                </span>
              </div>
              <div className="flex items-center pt-2">
                <CalendarDays className="mr-2 h-4 w-4 opacity-70" />{" "}
                <span className="text-xs text-muted-foreground">
                  {profile?.joined}
                </span>
              </div>
            </div>
          </div>
        </HoverCardContent>
      </HoverCard>
      <div
        ref={messagesContainerRef}
        className={cn(
          "space-y-4 px-4 h-[calc(100vh-130px)]  overflow-hidden overflow-y-scroll no-scrollbar",
          messages.length === 0 ? "pt-[50vh]" : "pt-[calc(100vh-180px)]",
        )}
      >
        <AnimatePresence>
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
                userId={profile?.id ?? 0}
                messages={messages}
              />
            ))
          )}
        </AnimatePresence>
      </div>
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-transparent border-t ml-[53px] md:ml-[323px] lg:ml-[386px]">
        <form
          onSubmit={(event) => {
            event.preventDefault();
            if (inputLength === 0) return;
            const message: {
              id: number;
              role: "agent" | "user";
              content: string;
              type: "image" | "text";
              sender: number;
              status: "sent" | "delivered" | "read";
              state?: "loading" | "loaded" | "error" | "uploading" | "uploaded";
            } = {
              id: messages.length + 1,
              role: "user",
              type: "text",
              status: "sent",
              sender: profile?.id ?? 0,
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
                <Button
                  variant="outline"
                  size="icon"
                  type="button"
                  onClick={handleImage}
                >
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
