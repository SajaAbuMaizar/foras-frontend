interface AccessibleImageProps
  extends React.ImgHTMLAttributes<HTMLImageElement> {
  alt: string;
  decorative?: boolean;
}

export const AccessibleImage: React.FC<AccessibleImageProps> = ({
  alt,
  decorative = false,
  ...props
}) => {
  if (decorative) {
    return <img {...props} alt="" role="presentation" />;
  }

  return <img {...props} alt={alt} />;
};
