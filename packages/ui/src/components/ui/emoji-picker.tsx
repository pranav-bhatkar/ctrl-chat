"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@ctrl-chat/ui/components/ui/popover";
import { Laugh } from "lucide-react";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import { Button } from "@ctrl-chat/ui/components/ui/button";

interface EmojiPickerProps {
  onChange: (value: string) => void;
}

export const EmojiPicker = ({ onChange }: EmojiPickerProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon" type="button">
          <Laugh className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
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
  );
};