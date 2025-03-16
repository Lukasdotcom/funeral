import type React from "react";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "In Loving Memory",
  description: "A memorial tribute page",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900">
            <div className="container px-4 py-8 mx-auto">{children}</div>
            <footer className="mt-16 py-6 bg-neutral-100 dark:bg-neutral-800">
              <div className="container mx-auto px-4 text-center text-neutral-600 dark:text-neutral-400 text-sm">
                <p>Diese Gedenkseite wurde mit Liebe und Respekt erstellt.</p>
                <p>
                  <a
                    className="text-neutral-500 dark:text-neutral-300"
                    target="_blank"
                    href="https://icons8.com/icon/XWuWhCF1Vss9/headstone-emoji"
                  >
                    Headstone Emoji
                  </a>{" "}
                  favicon von{" "}
                  <a
                    className="text-neutral-500 dark:text-neutral-300"
                    target="_blank"
                    href="https://icons8.com"
                  >
                    Icons8
                  </a>
                </p>
                <p className="mt-2">© {new Date().getFullYear()}</p>
              </div>
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
