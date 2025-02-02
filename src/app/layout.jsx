import { Inter } from "next/font/google";
import "./globals.css";
import QueryClientProvider from "./Providers/QueryClientProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
  ),
  title: "ecommercer-app",
  description: "ecommercer-app",
};

export default function RootLayout({ children }) {
  return (
    <QueryClientProvider>
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </QueryClientProvider>
  );
}
