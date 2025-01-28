import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { SidebarProvider } from "@/context/SidebarContext";
import { ChatWindow } from "./components/ChatWindow";

export function ChatPage() {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex">
          <Sidebar />
          <main className="flex-1 bg-neutral-950">
            <ChatWindow />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
