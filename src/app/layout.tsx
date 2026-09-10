import type { Metadata } from "next";
import { AuthProvider } from "@/components/auth/AuthContext";
import { ThemeProvider } from "@/components/theme/ThemeContext";
import "./globals.css";

export const metadata: Metadata = {
  title: "TerraLink Land Marketplace",
  description:
    "Discover, buy, and list agricultural and residential land on TerraMap.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="h-full antialiased"
      suppressHydrationWarning
    >
      <body className="font-sans min-h-full flex flex-col bg-slate-50 text-slate-900 dark:bg-[#0b0d10] dark:text-gray-100 transition-colors duration-200">
        <ThemeProvider>
          <AuthProvider>
            {children}
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}