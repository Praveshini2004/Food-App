import Layout from '../../components/Layout';
import Image from 'next/image';
import { client, urlFor } from "../../lib/client";
import LeftArrow from '../../assets/arrowLeft.png';
import RightArrow from '../../assets/arrowRight.png';
import css from '../../styles/Pizza.module.css';
import { useState } from "react";
import { useStore } from '../../store/store'; // Assuming you have a store setup for state management
import toast, { Toaster } from 'react-hot-toast';

export default function Pizza({ pizza }) {
    // Move hooks to the top level of the component
    const [Quantity, setQuantity] = useState(1);
    const addPizza = useStore((state) => state.addPizza);

    if (!pizza) {
        return <div>Pizza not found</div>;
    }

    const src = urlFor(pizza.image).url();

    const handleQuan = (type) => {
        type === "inc"
            ? setQuantity((prev) => prev + 1)
            : Quantity === 1
                ? null
                : setQuantity((prev) => prev - 1);
    };

    const addToCart = () => {
        addPizza({ ...pizza, price: pizza.price, quantity: Quantity });
        toast.success("Added to cart");
    };

    return (
        <Layout>
            <div className={css.container}>
                <div className={css.imageWrapper}>
                    <Image
                        loader={() => src}
                        alt={pizza.name}
                        src={src}
                        layout='fill'
                        unoptimized
                        objectFit="cover"
                    />
                </div>
                <div className={css.right}>
                    <span>{pizza.name}</span>
                    <span>{pizza.details}</span>

                    <span><span style={{ color: "var(--themeRed)" }}>Rs</span> {pizza.price}</span>
                    <div className={css.quantity}>
                        <span>Quantity</span>
                        <div className={css.counter}>
                            <Image
                                src={LeftArrow}
                                height={20}
                                width={20}
                                alt="Decrease quantity"
                                objectFit='contain'
                                onClick={() => handleQuan('dec')}
                            />
                            <span>{Quantity}</span>
                            <Image
                                src={RightArrow}
                                height={20}
                                width={20}
                                alt="Increase quantity"
                                objectFit='contain'
                                onClick={() => handleQuan("inc")}
                            />
                        </div>
                    </div>

                    <div className={`btn ${css.btn}`} onClick={addToCart}>
                        Add to Cart
                    </div>
                </div>
                <Toaster />
            </div>
        </Layout>
    );
}

export async function getStaticPaths() {
    const paths = await client.fetch(
        '*[_type == "pizza" && defined(slug.current)][].slug.current'
    );

    return {
        paths: paths.map((slug) => ({ params: { slug } })),
        fallback: 'blocking',
    };
}

export async function getStaticProps(context) {
    const { slug = "" } = context.params;
    const pizza = await client.fetch(
        `*[_type == "pizza" && slug.current == $slug][0]`,
        { slug }
    );

    if (!pizza) {
        return {
            notFound: true,
        };
    }

    return {
        props: {
            pizza,
        },
    };
}
