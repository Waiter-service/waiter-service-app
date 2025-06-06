
interface OrderProps {
    orderId: number;
    table: number;
    status: string;
    time: string;
    comment?: string;
    items: Array<{ id: number; name: string; quantity: number; price: number }>;
}

export default function Order({orderId,table,status,time,comment,items}: OrderProps) {
    const totalPrice = items.reduce((sum, item) => sum + item.quantity * item.price, 0);
    return (
        <div className="bg-white shadow-md rounded-lg p-6 mb-4 border border-gray-200 text-gray-800">
            {/* Order ID and Status */}
            <div>
                <h1>Table:{table}</h1>
                <h2>
                    Items:
                    <ul>
                        {items.map(item => (
                            <li key={item.id}>
                                {item.name} x{item.quantity} - ${item.price}
                            </li>
                        ))}
                    </ul>
                </h2>
                <h2>Price: ${totalPrice}</h2>
                <h2>Date:
                    {new Date(time).toLocaleString('hr-HR', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: false
                    })}
                </h2>
                <p>{comment}</p>
            </div>
            {/*Button*/}
            <div className="flex justify-end">
                <button>+</button>
            </div>
        </div>
    );
}