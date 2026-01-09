import type { IconSvgElement } from "@hugeicons/react";

export interface NavItem {
  label: string;
  href: string;
  icon: IconSvgElement;
}

export interface AccountLayoutProps {
  children: React.ReactNode;
  currentPath?: string;
}
