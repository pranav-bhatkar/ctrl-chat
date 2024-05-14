import { cn } from "@ui/lib/utils";
import { CheckCheck, Loader2 } from "lucide-react";
import Image from "next/image";
import moment from "moment";

export interface ChatMessage {
  id: number;
  role: "agent" | "user";
  content: string;
  type: "image" | "text";
  status: "sent" | "delivered" | "read";
  state?: "loading" | "loaded" | "error" | "uploading" | "uploaded" | undefined;
}

function ChatBubble({
  message,
  index,
  setOpenLightbox,
}: {
  message: ChatMessage;
  index: number;
  setOpenLightbox: (index: number) => void;
}) {
  function handleOpenLightbox() {
    setOpenLightbox(index);
  }
  // setOpenLightbox
  if (message.type === "image") {
    return (
      <div className="relative">
        <div
          key={index}
          className={cn(
            "max-w-[55%] relative rounded-lg overflow-hidden w-[300px] aspect-square transition-all duration-300 ease-in-out",
            message.role === "user"
              ? "ml-auto bg-primary text-primary-foreground"
              : "bg-muted",
          )}
        >
          {message.state === "loading" ? (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <p className="text-white">Loading...</p>
            </div>
          ) : message.state === "uploading" ? (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <Loader2 className="animate-spin h-6 w-6 mr-2 text-white" />
              <p className="text-white">Uploading...</p>
            </div>
          ) : message.state === "error" ? (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <p className="text-white">Error</p>
            </div>
          ) : (
            <Image
              onClick={handleOpenLightbox}
              src={message.content}
              alt="Image"
              fill
              className="w-full h-full object-cover cursor-pointer"
              // style={{ objectFit: "cover" }}
              // width={300}
              // height={300}
            />
          )}
        </div>
        <div className="">
          {/* info */}
          <div className="flex items-center justify-end gap-1 text-xs text-muted px-1">
            {message.role === "user" && (
              <div className="flex items-center gap-1 py-1 ">
                <p className="text-xs cursor-pointer text-muted-foreground">
                  {moment().format("hh:mm A")}
                </p>
                {/* <Clock className="w-4 h-4 text-muted-foreground" /> */}
                {/* <CheckIcon className="w-4 h-4 text-muted-foreground" /> */}
                {/* <CheckCheck className="w-4 h-4 text-muted-foreground" /> */}
                <CheckCheck className="w-4 h-4 text-primary" />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (message.type === "text") {
    return (
      <div className="relative">
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
        <div className="">
          {/* info */}
          <div className="flex items-center justify-end gap-1 text-xs text-muted px-1">
            {message.role === "user" && (
              <div className="flex items-center gap-1 py-1 ">
                <p className="text-xs cursor-pointer text-muted-foreground">
                  {moment().format("hh:mm A")}
                </p>
                {/* <Clock className="w-4 h-4 text-muted-foreground" /> */}
                {/* <CheckIcon className="w-4 h-4 text-muted-foreground" /> */}
                {/* <CheckCheck className="w-4 h-4 text-muted-foreground" /> */}
                <CheckCheck className="w-4 h-4 text-primary" />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default ChatBubble;
