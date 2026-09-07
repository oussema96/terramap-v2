import type { Metadata } from "next";
import { AuthProvider } from "@/components/auth/AuthContext";
import "./globals.css";

export const metadata: Metadata = {
  title: "TerraLink Land Marketplace",
  description: "Discover, buy, and list agricultural and residential land on TerraMap.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased dark">
      <body className="font-sans min-h-full flex flex-col bg-[#0b0d10] text-gray-100">
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
