/**
 * ABOUTME: Main landing page for ralph-tracer-bullet test app.
 * Used to validate Next.js + Vercel deployment workflow.
 */

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-900 text-white">
      <main className="flex flex-col items-center gap-8 p-8 text-center">
        <h1 className="text-4xl font-bold">Ralph Tracer Bullet</h1>
        <p className="text-xl text-zinc-400">
          Deployment test successful
        </p>
        <p className="text-lg text-green-400">
          ✓ Preview deployment working
        </p>
        <div className="flex flex-col gap-2 text-sm text-zinc-500">
          <p>Next.js + Tailwind + TypeScript</p>
          <p>Deployed to Vercel</p>
        </div>
        <div className="mt-8 rounded-lg bg-zinc-800 p-4">
          <p className="font-mono text-sm">
            Build time: {new Date().toISOString()}
          </p>
        </div>
      </main>
    </div>
  );
}
