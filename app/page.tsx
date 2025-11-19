export default function Home() {
  return (
    <main className="min-h-screen bg-white text-zinc-900">
      <div className="mx-auto flex max-w-3xl flex-col gap-6 px-6 py-16">
        <h1 className="text-4xl font-bold tracking-tight">
          Chuhang Liu
        </h1>
        <p className="text-zinc-600">
          Master of Public Policy student at Duke University, interested in
          technology, data-driven policy, and social reform.
        </p>

        <section className="space-y-2">
          <h2 className="text-xl font-semibold">Current Projects</h2>
          <ul className="list-disc pl-5 space-y-1 text-zinc-700">
            <li>China Law &amp; Policy Portal</li>
            <li>UNICEF Safe to Learn repository</li>
            <li>Buiding the website now!</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-semibold">Contact</h2>
          <p className="text-zinc-700">
            Email: chuhang.liu@duke.edu
          </p>
        </section>
      </div>
    </main>
  );
}
