// src/app/page.tsx
"use client";

import { useCounterStore } from "@/stores/useCounterStore";

export default function Home() {
  const { count, increment, decrement } = useCounterStore();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4">
      <p className="text-3xl">{count}</p>
      <div className="flex gap-2">
        <button
          onClick={increment}
          className="rounded bg-green-600 px-4 py-2 text-white"
        >
          +
        </button>
        <button
          onClick={decrement}
          className="rounded bg-red-600 px-4 py-2 text-white"
        >
          -
        </button>
      </div>
    </main>
  );
}
