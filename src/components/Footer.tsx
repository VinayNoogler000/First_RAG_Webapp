import { cacheLife } from "next/cache";

async function getCurrentYear() {
  "use cache";
  cacheLife("days");

  return new Date().getFullYear();
}

export default async function Footer() {
  const year = await getCurrentYear();

  return (
    <footer className="w-full py-8 border-t border-slate-border bg-white text-center text-text-muted text-sm">
      <div className="max-w-7xl mx-auto px-6">
        <p>© {year} Greedy Adventures. All rights reserved.</p>
      </div>
    </footer>
  );
}
