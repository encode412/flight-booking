import type { Metadata } from "next";
import AccountLayout from "./components/AccountLayout";

export const metadata: Metadata = {
  title: "Ezzifly - Register",
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
      <body>
        <AccountLayout>{children}</AccountLayout>
      </body>
    </html>
  );
}
