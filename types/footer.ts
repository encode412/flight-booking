import { IconSvgElement } from "@hugeicons/react";

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterSection {
  title: string;
  links: FooterLink[];
}

export interface SocialLink {
  icon: IconSvgElement;
  label: string;
  href: string;
}
