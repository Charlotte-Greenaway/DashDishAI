
import type { Metadata } from "next";
import "./globals.css";
import NavBar from '@/components/navbar';
import { UserButton } from "@clerk/nextjs";
export const metadata: Metadata = {
  title: "Dash Dish",
  description: "Your AI powered cookbook.",
};
import { ClerkProvider } from '@clerk/nextjs';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <ClerkProvider>
    <html lang="en">
      <body>
        <NavBar/>
        {children}
        <div className="mobileFloater">
              <UserButton afterSignOutUrl="/sign-in"/>
          </div>
      </body>
    </html>
    </ClerkProvider>
  );
}
