import css from '../styles/Menu.module.css';
import Image from 'next/image';
import { urlFor } from '../lib/client';
import Link from 'next/link'

export default function Menu({ pizzas }) {
    
    return (
        <div className={css.container}>
            <div className={css.heading}>
                <span>Menu</span>
                <span>We have various Menu That makes</span>
                <span>your day energetic and boosting</span>
            </div>

            <div className={css.menu}>

            {pizzas.map((pizza, id) => {
                const src = urlFor(pizza.image).url();
                return (
                    <div className={css.pizza} key={id}>
                        <Link href={`./pizza/${pizza.slug.current}`}>


                        <div className={css.ImageWrapper}>
                            <Image
                                loader={() => src}
                                src={src}
                                alt={pizza.name}
                                objectFit="cover"
                                layout="fill"
                            />
                        </div>
                        </Link>
                        <span>{pizza.name}</span>
                        <span><span style={{color:'var(--themeRed)'}}>Rs</span> {pizza.price}</span>
                    </div>
                );
            })}
        </div>
        </div>
    );
}
