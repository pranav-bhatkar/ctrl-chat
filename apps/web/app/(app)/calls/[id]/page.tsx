"use client";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@ctrl-chat/ui/components/ui/avatar";
import { UserCircle, PhoneOff, MicOff, Video } from "lucide-react";
import React, { useEffect } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@ctrl-chat/ui/components/ui/tooltip";
import { cn } from "@ctrl-chat/ui/lib/utils";
import { Camera } from "react-camera-pro";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

function page() {
  const [isMuted, setIsMuted] = React.useState(false);
  const [isVideoOn, setIsVideoOn] = React.useState(true);
  const [elapsedTime, setElapsedTime] = React.useState(0);
  const [startTime, setStartTime] = React.useState<number>(Date.now());
  const camera = React.useRef(null);
  let timerInterval: NodeJS.Timeout;
  const handleVideo = () => {
    setIsVideoOn((prev) => !prev);
  };
  function formatTime(seconds: number) {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    return `${hrs.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  }
  function startCallTimer() {
    const astartTime = Date.now();
    setStartTime(astartTime);
    if (!astartTime || !setElapsedTime) {
      return;
    }
    timerInterval = setInterval(() => {
      const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
      setElapsedTime(elapsedTime);
    }, 1000);
  }
  const router = useRouter();
  function stopCallTimer() {
    clearInterval(timerInterval);
    const endTime = Date.now();
    const callDuration = Math.floor((endTime - startTime) / 1000);
    toast.success(`Call duration: ${formatTime(callDuration)}`);
    router.push("/calls");
  }
  useEffect(() => {
    startCallTimer();
    return () => clearInterval(timerInterval);
  }, []);
  return (
    <div className="relative h-[calc(100vh-53px)] transition-all ease-in-out duration-1000">
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
          {/* show call time in this formate HH:MM:SS & keep incrementing seconds
           */}
          {formatTime(elapsedTime)}
        </p>
        {isVideoOn && (
          <div
            className={cn(
              "w-full container max-w-md rounded-md flex justify-center items-center overflow-hidden",
              `aspect-video`,
              "first:bottom-2 first:border-primary",
            )}
          >
            <Camera
              ref={camera}
              facingMode="user"
              aspectRatio={16 / 9}
              errorMessages={{
                noCameraAccessible: "No camera device accessible.",
                permissionDenied: "Camera permission denied.",
                switchCamera: "Switch Camera",
                canvas: "Canvas",
              }}
            />
          </div>
        )}

        <div className="flex items-center">
          <TooltipProvider delayDuration={300}>
            <div className="flex items-center gap-2 mt-4">
              <Tooltip>
                <TooltipTrigger asChild>
                  <div
                    className={cn(
                      "p-4 rounded-full transition-all duration-300 ease-in-out cursor-pointer",
                      "hover:bg-muted-foreground hover:text-black",
                      isVideoOn
                        ? "bg-primary hover:bg-primary hover:text-white"
                        : "bg-muted",
                    )}
                    onClick={handleVideo}
                  >
                    <Video className="size-6" />
                  </div>
                </TooltipTrigger>
                <TooltipContent side="bottom" sideOffset={5}>
                  {isVideoOn ? "Turn off video" : "Turn on video"}
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div
                    className={cn(
                      "p-4 rounded-full transition-all duration-300 ease-in-out cursor-pointer",
                      "hover:bg-muted-foreground hover:text-black",
                      isMuted
                        ? "bg-primary hover:bg-primary hover:text-white"
                        : "bg-muted",
                    )}
                    onClick={() => setIsMuted((prev) => !prev)}
                  >
                    <MicOff className="size-6" />
                  </div>
                </TooltipTrigger>
                <TooltipContent side="bottom" sideOffset={5}>
                  {isMuted ? "Unmute" : "Mute"} microphone
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div
                    className={cn(
                      "p-4 rounded-full transition-all duration-300 ease-in-out cursor-pointer",
                      "hover:bg-muted-foreground hover:text-black",
                      "bg-muted",
                    )}
                    onClick={stopCallTimer}
                  >
                    <PhoneOff className="size-6" />
                  </div>
                </TooltipTrigger>
                <TooltipContent side="bottom" sideOffset={5}>
                  End call
                </TooltipContent>
              </Tooltip>
            </div>
          </TooltipProvider>
        </div>
      </div>
    </div>
  );
}

export default page;
function useMediaQuery(arg0: string): [any] {
  throw new Error("Function not implemented.");
}
