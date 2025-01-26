import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { Toaster } from "@/components/ui/toaster";
import { Header } from "./header";
import { ThemeProvider } from "@/components/theme-providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Brain Archive",
  description: "A full-stack document management system",
  icons: {
    icon: "/favicon.ico", // Place favicon in public folder
    // Optional: Add different sizes
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Providers>
            <Header />
            {children}
            <Toaster />
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
