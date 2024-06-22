
import css from '../styles/Hero.module.css';
import Image from 'next/image';

import HeroImage from '../assets/HeroImage.png';

import Food from '../assets/food.jpeg';

export default function Hero() {
  return (
    <div className={css.container}>
      <div className={css.left}>
        
        <div className={css.heroText}>
          <span>Be the fastest</span>
          <span>In delivering</span>
          <span>
            Your <span style={{ color: "var(--themeRed)" }}>Food</span>
          </span>
        </div>
        <span className={css.miniText}>
          We offer delicious food with free delivery
        </span>
        <button className={`btn ${css.btn}`}>Get Started</button>
      </div>
      <div className={css.right}>
        <div className={css.imageContainer}>
          <Image src={HeroImage} alt="" layout="intrinsic" />
        </div>
       
        <div className={css.Pizza}>
          <div>
            <Image src={Food} alt="" objectFit="cover" layout="intrinsic" />
          </div>
          <div className={css.details}>
            <span>Food</span>
            <span style={{ color: "var(--themeRed)" }}>Rs</span>
            <span>100</span>
          </div>
        </div>
      </div>
    </div>
  );
}

