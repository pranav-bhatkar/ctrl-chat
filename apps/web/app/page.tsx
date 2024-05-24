import { Button } from "@ctrl-chat/ui/components/ui/button";
import { Terminal } from "lucide-react";
import Link from "next/link";
import React from "react";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@ctrl-chat/ui/components/ui/alert";

function page() {
  return (
    <div className="h-screen flex items-center justify-center container">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-semibold">
          Welcome to <span className="text-primary font-bold">Ctrl</span> Chat
        </h1>
        <Alert className="text-left max-w-96">
          <Terminal className="h-4 w-4" />
          <AlertTitle>Heads up!</AlertTitle>
          <AlertDescription className="text-foreground">
            This app is still in development and this is just static front-end
            to show the design. You can continue to the app by clicking the link
            below.
          </AlertDescription>
        </Alert>
        <Button asChild>
          <Link href="/chats">Continue</Link>
        </Button>
      </div>
    </div>
  );
}

export default page;
