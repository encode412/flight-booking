import { IconSvgElement } from "@hugeicons/react";
import { StaticImageData } from "next/image";

/**
 * Presentation-only entry for the "Popular Routes" carousel.
 * The route name, trip type and fare are read from the flight catalogue
 * via `slug`, so the card and the checkout can never disagree.
 */
export interface PopularRoute {
  id: number;
  /** Key into the flight catalogue (`/checkout?route=<slug>`). */
  slug: string;
  image: StaticImageData;
  alt: string;
}

export interface Service {
  id: number;
  title: string;
  image: StaticImageData;
  alt: string;
}

/** Presentation-only entry for the "Trending Destinations" carousel. */
export interface Destination {
  id: number;
  /** Key into the flight catalogue (`/checkout?route=<slug>`). */
  slug: string;
  image: StaticImageData;
  alt: string;
}

export interface Feature {
  id: number;
  icon: IconSvgElement;
  title: string;
  description: string;
}

export interface WhyEzziflyFeature {
  icon: StaticImageData;
  title: string;
  description: string;
}
