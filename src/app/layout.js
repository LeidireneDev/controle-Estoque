import Navbar from "@/components/Navbar";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Controle de Estoque",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html className="h-full antialiased bg-gray-100 scroll-smooth" lang="en">
      <body className={"h-full " + inter.className}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
