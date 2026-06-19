"use client";

import Image from "next/image";
import { useState } from "react";
import { Link } from "vcc-ui";
import { useCars } from "../hooks/useCars";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

export const Carousel = () => {
  const { cars } = useCars();

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: false,
      align: "start",
      dragFree: false,
    },
    [
      Autoplay({
        delay: 5000,
        stopOnInteraction: true,
      }),
    ],
  );

  const scrollPrev = () => emblaApi?.scrollPrev();
  const scrollNext = () => emblaApi?.scrollNext();

  return (
    <section className="carousel">
      <div className="carousel__viewport" ref={emblaRef}>
        <div className="carousel__container">
          {cars.map((item) => (
            <div key={item.id} className="carousel__slide">
              <div className="carousel-card">
                <div className="carousel-card-header">
                  <h3>{item.bodyType}</h3>

                  <div className="carousel-card-header-info">
                    <p>{item.modelName}</p>
                    <span>{item.modelType}</span>
                  </div>
                </div>

                <div className="carousel-card-image-wrapper">
                  <Image
                    src={item.imageUrl}
                    alt={item.modelName}
                    layout="fill"
                    objectFit="contain"
                  />
                </div>

                <div className="carousel-card-links">
                  <Link href={`/learn/${item.id}`}>LEARN</Link>

                  <Link href={`/shop/${item.id}`}>SHOP</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="carousel-controls">
        <button onClick={scrollPrev} aria-label="Anterior">
          <Image
            src="/images/chevron-circled.svg"
            alt="Anterior"
            layout="fill"
            objectFit="contain"
            style={{
              transform: "rotate(180deg)",
            }}
          />
        </button>

        <button onClick={scrollNext} aria-label="Próximo">
          <Image
            src="/images/chevron-circled.svg"
            alt="Próximo"
            layout="fill"
            objectFit="contain"
          />
        </button>
      </div>
    </section>
  );
};
