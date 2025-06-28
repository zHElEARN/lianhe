"use client";

import { ThemeProvider } from "@/components/theme-provider";
import { ChatProvider } from "@/contexts/chat-context";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <ChatProvider>{children}</ChatProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
