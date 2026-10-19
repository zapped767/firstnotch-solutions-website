'use client';

import Image, { type ImageLoaderProps, type ImageProps } from 'next/image';

function unsplashLoader({ src, width, quality }: ImageLoaderProps) {
  const url = new URL(src);
  url.searchParams.set('auto', 'format');
  url.searchParams.set('fit', 'crop');
  url.searchParams.set('w', String(width));
  url.searchParams.set('q', String(quality ?? 80));
  return url.toString();
}

type PhotoProps = Pick<ImageProps, 'src' | 'alt' | 'sizes' | 'className'> & {
  eager?: boolean;
};

export default function Photo({
  src,
  alt,
  sizes = '100vw',
  className = '',
  eager = false,
}: PhotoProps) {
  const remote = typeof src === 'string' && src.startsWith('https://images.unsplash.com/');
  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      loader={remote ? unsplashLoader : undefined}
      loading={eager ? 'eager' : 'lazy'}
      fetchPriority={eager ? 'high' : 'auto'}
      className={`object-cover ${className}`}
    />
  );
}
