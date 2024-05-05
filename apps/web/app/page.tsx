"use client";
import React, { useRef } from "react";
import Image from "next/image";
import { cn } from "@ctrl-chat/ui/lib/utils";
import { Button } from "@ctrl-chat/ui/components/ui/button";

function page() {
  const messagesContainerRef = useRef<any>(null);
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
      type: "image",
      content: "https://via.placeholder.com/300",
    },
    {
      role: "user",
      type: "image",
      content: "https://via.placeholder.com/300",
    },
    {
      role: "agent",
      type: "image",
      content: "https://via.placeholder.com/300",
    },
    {
      role: "user",
      type: "image",
      content: "https://via.placeholder.com/300",
    },
  ]);
  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      window.scrollTo({
        top: messagesContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  };
  return (
    <>
      <Button
        onClick={() => {
          // setMessages((prev) => [...prev, { role: "user", content: "Hello" }]);
          scrollToBottom();
        }}
        type="button"
      >
        Clear
      </Button>
      <div ref={messagesContainerRef} className="">
        {messages.map((message, index) =>
          message.type === "image" ? (
            <div
              key={index}
              className={cn(
                "flex w-max max-w-[75%] flex-col gap-2 rounded-lg  text-sm overflow-hidden",
                message.role === "user"
                  ? "ml-auto bg-primary text-primary-foreground"
                  : "bg-muted",
              )}
            >
              <Image
                src={message.content}
                alt="Image"
                width={300}
                height={300}
              />
            </div>
          ) : (
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
          ),
        )}
      </div>
      <Button
        onClick={() => {
          setMessages((prev) => [...prev, { role: "user", content: "Hello" }]);
          scrollToBottom();
        }}
        type="button"
      >
        Clear
      </Button>
    </>
  );
}

export default page;
