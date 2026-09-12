"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import ArrowIcon from "@/components/arrow-icon";
import styles from "./index.module.css";

const SLIDES = [
  { image: "/images/banner-festival.png", alt: "Tradition Never Fades — Discover timeless sarees for every story, every celebration.", href: "/collections" },
  { image: "/images/banner-bridal.png", alt: "Bridal Collection — For Your Biggest Moments.", href: "/collections/bridal" },
  { image: "/images/banner-handloom.png", alt: "Handloom Treasures — Woven With Heritage.", href: "/collections/handloom" },
];

const Hero = () => {
  const [index, setIndex] = useState(0);

  const go = (delta) => {
    setIndex((current) => (current + delta + SLIDES.length) % SLIDES.length);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((current) => (current + 1) % SLIDES.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [index]);

  return (
    <section className={styles.hero}>
      {SLIDES.map((s, i) => (
        <Link
          key={s.image}
          href={s.href}
          className={`${styles.slideLink} ${i === index ? styles.slideActive : ""}`}
          aria-hidden={i !== index}
          tabIndex={i === index ? undefined : -1}
        >
          <Image
            src={s.image}
            alt={s.alt}
            fill
            sizes="100vw"
            style={{ objectFit: "cover" }}
            priority={i === 0}
          />
        </Link>
      ))}

      <button
        type="button"
        className={`${styles.arrow} ${styles.arrowLeft}`}
        onClick={() => go(-1)}
        aria-label="Previous slide"
      >
        <ArrowIcon direction="left" size={22} />
      </button>
      <button
        type="button"
        className={`${styles.arrow} ${styles.arrowRight}`}
        onClick={() => go(1)}
        aria-label="Next slide"
      >
        <ArrowIcon direction="right" size={22} />
      </button>

      <div className={styles.dots}>
        {SLIDES.map((s, i) => (
          <button
            key={s.image}
            type="button"
            className={`${styles.dot} ${i === index ? styles.dotActive : ""}`}
            onClick={() => setIndex(i)}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;
