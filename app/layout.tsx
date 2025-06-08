import "./globals.css";
import { Inter } from "next/font/google";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import NodeDetailDrawer from "../components/NodeDetailDrawer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata = {
  title: "Recall OS",
  description: "Graph based memory engine",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans bg-background text-foreground min-h-screen`}> 
        <div className="flex h-screen overflow-hidden">
          <Sidebar />
          <div className="flex flex-col flex-1 overflow-auto">
            <Topbar />
            <main className="p-6 flex-1 overflow-auto">{children}</main>
          </div>
        </div>
        <NodeDetailDrawer />
      </body>
    </html>
  );
}
