"use client";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@ctrl-chat/ui/components/ui/popover";
import { LaughIcon } from "lucide-react";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import { Button } from "@ctrl-chat/ui/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@ctrl-chat/ui/components/ui/tooltip";

interface EmojiPickerProps {
  onChange: (value: string) => void;
}

export const EmojiPicker = ({ onChange }: EmojiPickerProps) => {
  return (
    <TooltipProvider>
      <Popover>
        <Tooltip>
          <TooltipTrigger asChild>
            <PopoverTrigger asChild>
              <Button variant="outline" size="icon">
                <LaughIcon className="h-4 w-4" />
                <span className="sr-only">Add Emoji</span>
              </Button>
            </PopoverTrigger>
          </TooltipTrigger>
          <TooltipContent>
            <p>Add Emoji</p>
          </TooltipContent>
        </Tooltip>
        <PopoverContent className="w-full">
          <Picker
            emojiSize={18}
            theme="dark"
            data={data}
            maxFrequentRows={1}
            navPosition="bottom"
            previewPosition="none"
            onEmojiSelect={(emoji: any) => onChange(emoji.native)}
          />
        </PopoverContent>
      </Popover>
    </TooltipProvider>
  );
};
