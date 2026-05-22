import Link from "next/link";

export default function ItemCard({ item }) {
  return (
    <div className="border p-4 rounded shadow">
      <h2 className="font-bold">{item.title}</h2>
      <p>{item.description}</p>
      <Link href={`/items/${item.id}`}>
        <button className="mt-2 bg-blue-600 text-white px-3 py-1">
          View Details
        </button>
      </Link>
    </div>
  );
}
