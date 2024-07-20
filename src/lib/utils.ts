import { type ClassValue, clsx } from 'clsx';
import { type Metadata } from 'next';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(
  price: number | string,
  options: {
    currency?: 'KSH' | 'USD' | 'EUR' | 'GBP' | 'BDT';
    notation?: Intl.NumberFormatOptions['notation'];
  } = {}
) {
  const { currency = 'KSH', notation = 'compact' } = options;

  const numericPrice = typeof price === 'string' ? parseFloat(price) : price;

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    notation,
    maximumFractionDigits: 2
  }).format(numericPrice);
}

export function constructMetadata({
  title = 'StrathMall - The marketplace for all university and local sellers',
  description = 'Strathmall is an open-source marketplace for high-quality  goods.',
  image = '/thumbnail.png',
  icons = '/favicon.ico',
  noIndex = false
}: {
  title?: string;
  description?: string;
  image?: string;
  icons?: string;
  noIndex?: boolean;
} = {}): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: image
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
      creator: 'idriskulubi'
    },
    icons,
    metadataBase: new URL('https://strathmall.com/'),
    ...(noIndex && {
      robots: {
        index: false,
        follow: false
      }
    })
  };
}
