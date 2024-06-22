import { client } from "../../lib/client";

export default async function handler(req, res) {
    switch (req.method) {
        case "POST":
            try {
                const newOrder = JSON.parse(req.body);
                const data = await client.create({
                    _type: "order",
                    name: newOrder.name,
                    address: newOrder.address,
                    phone: newOrder.phone,
                    total: newOrder.total,
                    method: newOrder.method,
                    status: 1,
                });
                res.status(200).json(data._id); // Assuming data._id is the order ID
            } catch (error) {
                console.error('Error creating order:', error);
                res.status(500).json({ msg: "Error creating order, check console for details" });
            }
            break;
        default:
            res.setHeader('Allow', ['POST']);
            res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
