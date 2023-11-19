import Pagination from "./components/Pagination";

export default function Home() {
  return (
    <main>
      <Pagination itemCounts={20} pageSize={5} currentPage={4} />
    </main>
  );
}
