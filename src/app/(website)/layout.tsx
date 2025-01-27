import "@/app/globals.css";

// Packages
import type { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import { Inter } from "next/font/google";

// Local imports
import { auth } from "@/auth";
import AgeRestrictionGuard from "@/components/providers/AgeRestrictionGuard";
import AppProvider from "@/components/providers/AppProvider";
import NProgress from "@/components/providers/NProgress";
import Footer from "@/components/shared/footer/mainFooter/footer";
import NewsletterPage from "@/components/shared/footer/newsletter/page";
import Navbar from "@/components/shared/header/mainHeader/navbar";
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Pacific Rim Fusion",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <SessionProvider session={session}>
      <AppProvider>
        <html lang="en">
          <body className={cn("antialiased", inter.className)}>
            <div>
              <Navbar loggedin={!!session} />
            </div>
              <AgeRestrictionGuard>{children}</AgeRestrictionGuard>

              <div>
                <NewsletterPage />
                <Footer />
              </div>
            <NProgress />
            <Toaster />
          </body>
        </html>
      </AppProvider>
    </SessionProvider>
  );
}
