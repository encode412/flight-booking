import {
  Clock,
  Facebook,
  Instagram,
  ShoppingBag,
  X,
  Zap,
  Bell,
  CreditCard,
  Lock,
  Settings,
  User,
  Users,
} from "@hugeicons/core-free-icons";

import {
  ClockIcon,
  PlaneIcon,
  Popular1,
  Popular2,
  Popular3,
  Popular4,
  Service1,
  Service2,
  Service3,
  TagIcon,
  Trending1,
  Trending2,
  Trending3,
  Trending4,
  TrustIcon,
} from "@/assets";
import {
  Destination,
  Feature,
  PopularRoute,
  Service,
  WhyEzziflyFeature,
} from "@/types/card";
import { FooterSection, SocialLink } from "@/types/footer";
import { NavItem } from "@/types/layout";

export const popularRoutes: PopularRoute[] = [
  {
    id: 1,
    from: "Lagos",
    to: "London",
    price: "₦2,500,00",
    tripType: "Round Trip",
    image:
      Popular1,
    alt: "London with Big Ben and red bus",
  },
  {
    id: 2,
    from: "Abuja",
    to: "Dubai",
    price: "₦1,900,00",
    tripType: "One Way",
    image:
      Popular2,
    alt: "Dubai skyline",
  },
  {
    id: 3,
    from: "Accra",
    to: "Paris",
    price: "₦1,000,00",
    tripType: "One Way",
    image:
      Popular3,
    alt: "Eiffel Tower in Paris",
  },
  {
    id: 4,
    from: "Kogi",
    to: "Canada",
    price: "₦1,500,00",
    tripType: "Round Trip",
    image:
      Popular4,
    alt: "Toronto skyline",
  },
];

export const services: Service[] = [
  {
    id: 1,
    title: "HOLIDAY PACKAGES",
    image: Service1,
    alt: "Beach with palm trees",
  },
  {
    id: 2,
    title: "CAR SERVICES",
    image: Service2,
    alt: "Person with car",
  },
  {
    id: 3,
    title: "VISA ASSISTANCE",
    image: Service3,
    alt: "Passport and map",
  },
];

export const destinations: Destination[] = [
  {
    id: 1,
    from: "Lagos",
    to: "London",
    image: Trending1,
    alt: "Big Ben at sunset in London",
  },
  {
    id: 2,
    from: "Rome",
    to: "Germany",
    image: Trending2,
    alt: "Frankfurt Germany architecture",
  },
  {
    id: 3,
    from: "Abuja",
    to: "Dubai",
    image: Trending3,
    alt: "Dubai skyline with modern buildings",
  },
  {
    id: 4,
    from: "Mumbai",
    to: "Rome",
    image: Trending4,
    alt: "Dubai Marina skyline",
  },
];

export const features: Feature[] = [
  {
    id: 1,
    icon: ShoppingBag,
    title: "Best Flight Deals",
    description:
      "Get unbeatable prices on domestic and international flights no hidden fees, just transparent fares.",
  },
  {
    id: 2,
    icon: Clock,
    title: "Real-Time Availability",
    description:
      "Search, compare, and book flights in real time with live seat and fare updates.",
  },
  {
    id: 3,
    icon: Zap,
    title: "Simple & Fast Booking",
    description:
      "Book your flight in just a few clicks with our smooth, intuitive interface.",
  },
];

export const footerSections: FooterSection[] = [
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "FAQ", href: "/faq" },
      { label: "Contact Us", href: "/contact" },
      { label: "Blog", href: "/blog" },
    ],
  },
  {
    title: "Popular Route",
    links: [
      { label: "Lagos to London", href: "/route/lagos-london" },
      { label: "Abuja to Lagos", href: "/route/abuja-lagos" },
      { label: "Lagos to Canada", href: "/route/lagos-canada" },
      { label: "Kebbi to Turkey", href: "/route/kebbi-turkey" },
    ],
  },
  {
    title: "Our Policy",
    links: [
      { label: "Terms and Conditions", href: "/terms" },
      { label: "Privacy Policy", href: "/privacy" },
    ],
  },
  {
    title: "Account",
    links: [
      { label: "Register", href: "/register" },
      { label: "Sign In", href: "/signin" },
    ],
  },
];

export const socialLinks: SocialLink[] = [
  {
    icon: Facebook,
    label: "Facebook - Ezzifly",
    href: "https://facebook.com/ezzifly",
  },
  {
    icon: Instagram,
    label: "Instagram - Ezzifly",
    href: "https://instagram.com/ezzifly",
  },
  {
    icon: X,
    label: "X - Ezzifly",
    href: "https://x.com/ezzifly",
  },
];

export const contactInfo = {
  email: "ezziflywithu s@gmail.com",
  phone: "09053081230",
};

export const navigationItems: NavItem[] = [
  {
    label: "Personal Details",
    href: "/account/personal-details",
    icon: User,
  },
  {
    label: "Saved Travellers",
    href: "/account/saved-travellers",
    icon: Users,
  },
  {
    label: "Booking History",
    href: "/account/booking-history",
    icon: Clock,
  },
  {
    label: "Payment Methods",
    href: "/account/payment-methods",
    icon: CreditCard,
  },
  {
    label: "Preferences",
    href: "/account/preferences",
    icon: Settings,
  },
  {
    label: "Notifications",
    href: "/account/notifications",
    icon: Bell,
  },
  {
    label: "Security",
    href: "/account/security",
    icon: Lock,
  },
];

export const whyEzziflyFeatures: WhyEzziflyFeature[] = [
  {
    icon: PlaneIcon,
    title: "Simple & Fast Booking",
    description:
      "Book your flight in just a few clicks with our smooth, intuitive interface.",
  },
  {
    icon: TrustIcon,
    title: "Trusted by Thousands",
    description:
      "Join thousands of satisfied travellers who trust Ezzifly to get them to their destination hassle-free.",
  },
  {
    icon: TagIcon,
    title: "Best Flight Deals",
    description:
      "Get unbeatable prices on domestic and international flights no hidden fees, just transparent fares.",
  },
  {
    icon: ClockIcon,
    title: "Real-Time Availability",
    description:
      "Search, compare, and book flights in real time with live seat and fare updates.",
  },
];
