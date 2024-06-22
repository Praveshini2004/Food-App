import { Modal, useMantineTheme } from '@mantine/core';
import { useState } from 'react';
import css from '../styles/OrderModal.module.css';
import { createOrder } from '../lib/orderHandler'; 
import toast, { Toaster } from 'react-hot-toast';
import { useStore } from '../store/store';
import { useRouter } from 'next/router';

export default function OrderModal({ opened, setOpened, PaymentMethod }) {
    const theme = useMantineTheme();
    const router = useRouter();
    const [formData, setFormData] = useState({});

    const handleInput = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const resetCart = useStore((state) => state.resetCart);
    const total = typeof window !== 'undefined' && localStorage.getItem('total');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const id = await createOrder({ ...formData, total, PaymentMethod });
            toast.success("Order Placed");
            resetCart();

            if (typeof window !== 'undefined') {
                localStorage.setItem('order', id);
            }

            router.push(`/order/${id}`);
        } catch (error) {
            console.error('Error placing order:', error);
            toast.error("Failed to place order");
        }
    };

    return (
        <Modal
            overlayColor={theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}
            overlayOpacity={0.55}
            overlayBlur={3}
            opened={opened}
            onClose={() => setOpened(null)}
        >
            <form onSubmit={handleSubmit} className={css.formContainer}>
                <input
                    onChange={handleInput}
                    type="text"
                    name="name"
                    required
                    placeholder="Name"
                />
                <input
                    onChange={handleInput}
                    type="text"
                    name="phone"
                    required
                    placeholder="Phone Number"
                />
                <textarea
                    onChange={handleInput}
                    name="address"
                    cols={8}
                    rows={3}
                    placeholder="Address"
                />
                <span>
                    Amount: <span>Rs {total}</span> to be paid on Delivery
                </span>
                <button type="submit" className="btn">Place Order</button>
            </form>
            <Toaster />
        </Modal>
    );
}
