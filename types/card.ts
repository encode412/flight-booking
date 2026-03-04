import { IconSvgElement } from "@hugeicons/react";
import { StaticImageData } from "next/image";

export interface PopularRoute {
  id: number;
  from: string;
  to: string;
  price: string;
  tripType: string;
  image: StaticImageData;
  alt: string;
}

export interface Service {
  id: number;
  title: string;
  image: StaticImageData;
  alt: string;
}

export interface Destination {
  id: number;
  from: string;
  to: string;
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
