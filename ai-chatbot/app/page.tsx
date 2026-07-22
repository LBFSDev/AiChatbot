// app/page.tsx
import Chat from "../components/Chat/Chat";

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <Chat />
    </main>
  );
}