import { TodoContainer } from "@/features/Todo";
export default function Home() {
  return (
    <main className="min-h-screen p-8">
      <div className="max-w-3xl mx-auto">
        {/* Glassmorphism header */}
        <div className="mb-8 text-center">
          <h1 className="text-5xl font-bold text-white mb-2 drop-shadow-2xl">
            Todo App
          </h1>
          <p className="text-white/90 text-lg drop-shadow-lg">
            Manage your tasks with style
          </p>
        </div>

        {/* Main content with white glassmorphism */}
        <div className="glass-strong rounded-3xl p-8 shadow-2xl">
          <TodoContainer />
        </div>
      </div>

      {/* Decorative glassmorphism elements */}
      <div className="fixed top-20 left-10 w-80 h-80 bg-white/10 rounded-full blur-3xl -z-10" />
      <div className="fixed bottom-20 right-10 w-96 h-96 bg-white/10 rounded-full blur-3xl -z-10" />
      <div className="fixed top-1/2 left-1/2 w-64 h-64 bg-white/5 rounded-full blur-3xl -z-10" />
    </main>
  );
}
