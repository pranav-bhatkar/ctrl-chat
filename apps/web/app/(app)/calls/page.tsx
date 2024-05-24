import { Button } from "@ctrl-chat/ui/components/ui/button";

import Link from "next/link";

export default function page() {
  return (
    <div className="h-[calc(100vh-100px)] flex justify-center items-center">
      <div className="flex flex-col justify-center items-center w-full container">
        <p className="text-lg font-semibold">Make or join a call to continue</p>
        <div className="mt-4 flex flex-col w-full justify-center space-y-2 md:flex-row md:gap-2 md:items-center md:space-y-0">
          <Button variant="default" size="lg" asChild>
            <Link href="/calls/1">New Call</Link>
          </Button>

          <Button variant="outline" size="lg">
            <Link href="/calls/1">Join a call</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
