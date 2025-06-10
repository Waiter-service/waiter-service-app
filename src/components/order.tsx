import { useState } from "react";

interface OrderProps {
    orderId: number;
    table: number;
    status: string;
    time: string;
    comment?: string;
    items: Array<{ id: number; name: string; quantity: number; price: number }>;
}

export default function Order({ orderId, table, status, time, comment, items }: OrderProps) {
    const [expanded, setExpanded] = useState(false);
    const [touchStartX, setTouchStartX] = useState<number | null>(null);
    const [touchEndX, setTouchEndX] = useState<number | null>(null);

    const totalPrice = items.reduce((sum, item) => sum + item.quantity * item.price, 0);

    const toggleDetails = () => setExpanded(prev => !prev);

    const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
        setTouchStartX(e.touches[0].clientX);
    };

    const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
        setTouchEndX(e.touches[0].clientX);
    };

    const handleTouchEnd = () => {
        if (touchStartX !== null && touchEndX !== null) {
            const distance = touchEndX - touchStartX;
            if (distance > 50) {
                // Swiped right
                alert(`Accept order #${orderId}?`);
            } else if (distance < -50) {
                // Swiped left
                alert(`Cancel order #${orderId}?`);
            }
        }

        setTouchStartX(null);
        setTouchEndX(null);
    };

    return (
        <div
            className="bg-white shadow-md rounded-lg p-6 mb-4 border border-gray-200 text-gray-800"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
        >
            <div className="flex items-start">
                <button
                    onClick={toggleDetails}
                    className="text-2xl font-bold mr-4 px-2 rounded border border-gray-400 hover:bg-gray-100"
                >
                    {expanded ? '−' : '+'}
                </button>

                <div>
                    <h1 className="font-semibold">Table: {table}</h1>
                    <h2 className="mt-1">
                        Items:
                        <ul className="list-disc list-inside">
                            {items.map(item => (
                                <li key={item.id}>
                                    {item.name} x{item.quantity} - ${item.price}
                                </li>
                            ))}
                        </ul>
                    </h2>
                </div>
            </div>

            {expanded && (
                <div className="mt-4 pl-10">
                    <h2>Price: ${totalPrice}</h2>
                    <h2>
                        Date:{" "}
                        {new Date(time).toLocaleString("hr-HR", {
                            year: "numeric",
                            month: "2-digit",
                            day: "2-digit",
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: false,
                        })}
                    </h2>
                    {comment && <p>Comment: {comment}</p>}
                    <h3>Order status: {status}</h3>
                </div>
            )}
        </div>
    );
}
