import Image from "next/image";
import { referenceAsset, referenceDimensions } from "@/content/reference-assets";

type ReferenceImageProps = {
  src: string;
  alt: string;
  className?: string;
  fill?: boolean;
  sizes?: string;
  width?: number;
  height?: number;
};

export function ReferenceImage({ src, alt, fill = false, sizes, width, height, ...props }: ReferenceImageProps) {
  const dimensions = referenceDimensions[src] ?? [width ?? 100, height ?? 100];
  return <Image {...props} alt={alt} src={referenceAsset(src)} {...(fill ? { fill: true, sizes: sizes ?? "100vw" } : { width: width ?? dimensions[0], height: height ?? dimensions[1], sizes })} />;
}
