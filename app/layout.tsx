import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Qissa Khawani — A tale of taste | Lahore",
  description: "Har luqma ek qissa. Discover the flavours, stories and branches of Qissa Khawani in Lahore.",
  openGraph: {
    title: "Qissa Khawani — A tale of taste",
    description: "A tale of taste, told over a traditional Pakistani dastarkhwan.",
    type: "website",
    locale: "en_PK"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "name": "Qissa Khawani",
    "description": "A tale of taste. Pakistani cuisine, BBQ, karahi and traditional favourites in Lahore.",
    "priceRange": "PKR 1000-2000",
    "servesCuisine": ["Pakistani", "Barbecue", "South Asian"],
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Lahore",
      "addressRegion": "Punjab",
      "addressCountry": "PK"
    },
    "hasMenu": "#menu",
    "sameAs": ["https://www.facebook.com/QissaKhawaniRestaurant/", "https://www.facebook.com/qissakhawanijt/", "https://www.instagram.com/qissakhawanirestaurant/"]
  };
  return <html lang="en">
    <head>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Inter:wght@300;400;500;600&family=Noto+Nastaliq+Urdu:wght@400;500&family=Rozha+One&display=swap" rel="stylesheet" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </head>
    <body>{children}</body>
  </html>;
}
