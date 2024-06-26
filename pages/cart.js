import Layout from "../components/Layout";
import { useStore } from "../store/store";
import Image from "next/image";
import { urlFor } from "../lib/client";
import css from '../styles/Cart.module.css';
import toast, { Toaster } from "react-hot-toast";
import { useState } from "react";
import OrderModal from "../components/OrderModal"; // Added missing import

export default function Cart() {
    const CartData = useStore((state) => state.cart);
    const removePizza = useStore((state) => state.removePizza);
    const [PaymentMethod, setPaymentMethod] = useState(null);

    const handleRemove = (i) => {
        removePizza(i);
        toast.error('Item removed');
    };

    const total = () => CartData.pizzas.reduce((a, b) => a + b.quantity * b.price, 0);

    const handleOnDelivery = () => {
        setPaymentMethod(0);
        if (typeof window !== 'undefined') {
            localStorage.setItem('total', total());
        }
    };

    return (
        <Layout>
            <div className={css.container}>
                <div className={css.details}>
                    <table className={css.table}>
                        <thead>
                            <tr>
                                <th>Item</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Total</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody className={css.tbody}>
                            {CartData.pizzas.length > 0 &&
                                CartData.pizzas.map((pizza, i) => {
                                    const src = urlFor(pizza.image).url();
                                    return (
                                        <tr key={i}>
                                            <td className={css.imageTd}>
                                                <Image
                                                    loader={() => src}
                                                    src={src}
                                                    alt=""
                                                    objectFit="cover"
                                                    width={85}
                                                    height={85}
                                                />
                                            </td>
                                            <td>{pizza.name}</td>
                                            <td>{pizza.price}</td>
                                            <td>{pizza.quantity}</td>
                                            <td>{pizza.price * pizza.quantity}</td>
                                            <td
                                                style={{
                                                    color: "var(--themeRed)",
                                                    cursor: 'pointer'
                                                }}
                                                onClick={() => handleRemove(i)}
                                            >x</td>
                                        </tr>
                                    );
                                })}
                        </tbody>
                    </table>
                </div>
                <div className={css.cart}>
                    <span>Cart</span>
                    <div className={css.CartDetails}>
                        <div>
                            <span>Items</span>
                            <span>{CartData.pizzas.length}</span>
                        </div>
                        <div>
                            <span>Total</span>
                            <span>Rs {total()}</span>
                        </div>
                    </div>
                    <div className={css.buttons}>
                        <button className="btn" onClick={handleOnDelivery}>Order Now</button>
                        
                    </div>
                </div>
            </div>
            <Toaster />
            <OrderModal
                opened={PaymentMethod === 0}
                setOpened={setPaymentMethod}
                PaymentMethod={PaymentMethod}
            />
        </Layout>
    );
}
