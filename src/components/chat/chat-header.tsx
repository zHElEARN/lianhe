"use client";

import { ArrowLeft } from "lucide-react";

interface ChatHeaderProps {
  chatName: string;
  onBack: () => void;
}

export default function ChatHeader({ chatName, onBack }: ChatHeaderProps) {
  return (
    <div className="bg-card border-b border-border px-4 py-3 flex items-center">
      <button
        onClick={onBack}
        className="mr-3 p-1 hover:bg-accent rounded-full transition-colors"
      >
        <ArrowLeft className="w-5 h-5 text-muted-foreground" />
      </button>
      <div className="flex items-center">
        <h1 className="ml-3 text-lg font-semibold text-foreground">
          {chatName}
        </h1>
      </div>
    </div>
  );
}
