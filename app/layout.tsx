import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { Toaster } from "react-hot-toast";

import "./globals.css";
import { Providers } from "@/redux/store/providers";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Flight Booking App",
  description:
    "Book flights easily and quickly with our user-friendly flight booking application.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} font-poppins antialiased`}>
        <Providers>
          <Toaster
            position="top-right"
            reverseOrder={true}
            toastOptions={{
              duration: 4000,
              success: {
                style: {
                  background: "#07bc0c",
                  color: "#fff",
                },
              },
              error: {
                style: {
                  background: "#e74c3c",
                  color: "#fff",
                },
              },
            }}
          />
          {children}
        </Providers>
      </body>
    </html>
  );
}
