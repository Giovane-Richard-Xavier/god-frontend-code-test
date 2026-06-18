"use client";

import Image from "next/image";
import { useState } from "react";
import { Link } from "vcc-ui";
import { useCars } from "../hooks/useCars";

type Props = {
  images: any[];
};

let carouselTimer: NodeJS.Timeout;
const carouselSpeed = 4000;

export const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // QUERY
  const { cars, loading, error } = useCars();
  const carsData = cars ?? [];

  const visibleItems = 4;

  const next = () => {
    if (currentIndex + visibleItems < cars.length) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const prev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  return (
    <div className="carousel-wrapper">
      <section className="carousel-container">
        <div
          className="carousel-track"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
          }}
        >
          {cars.map((item, index) => (
            <div key={item.id} className="carousel-card">
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
                <Link href={`/learn/${item.id}`} arrow="right">
                  LEARN
                </Link>

                <Link href={`/shop/${item.id}`} arrow="right">
                  SHOP
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* MOBILE */}
      <section className="carousel-indicators">
        {cars.map((_, index) => (
          <button
            key={index}
            className={`carousel-indicator ${currentIndex === index ? "carousel-indicator-active" : ""}`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </section>

      {/* TABLE AND DESKTOP */}
      <section className="carousel-actions">
        <button onClick={prev}>
          <Image
            src="/images/chevron-circled.svg"
            alt="Anterior"
            layout="fill"
            objectFit="contain"
            style={{ transform: "rotate(-180deg)" }}
          />
        </button>

        <button onClick={next}>
          <Image
            src="/images/chevron-circled.svg"
            alt="Próximo"
            layout="fill"
            objectFit="contain"
          />
        </button>
      </section>
    </div>
  );
};
