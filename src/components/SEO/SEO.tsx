import { Metadata } from "next";

interface SEOProps {
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
  noIndex?: boolean;
  canonicalUrl?: string;
  lang?: "ar" | "he";
}

export function generateSEOMetadata({
  title,
  description,
  keywords = [],
  ogImage = "/images/og-default.jpg",
  noIndex = false,
  canonicalUrl,
  lang = "ar",
}: SEOProps): Metadata {
  const siteName = "Foras - فُرَص";
  const fullTitle = `${title} | ${siteName}`;

  return {
    title: fullTitle,
    description,
    keywords: keywords.join(", "),
    authors: [{ name: "Foras Team" }],
    creator: "Foras",
    publisher: "Foras",
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL(
      process.env.NEXT_PUBLIC_SITE_URL || "https://foras.co.il"
    ),
    alternates: {
      canonical: canonicalUrl,
      languages: {
        ar: "/ar",
        he: "/he",
      },
    },
    openGraph: {
      title: fullTitle,
      description,
      url: canonicalUrl,
      siteName,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: lang === "ar" ? "ar_IL" : "he_IL",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [ogImage],
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}
