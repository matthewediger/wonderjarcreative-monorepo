export default function Paragraph(
  { key, attributes, originalContent, innerBlocks }: 
  { key: any, attributes: { anchor?: string, className?: string }; originalContent?: string, innerBlocks?: any[] | null },
) {
  const { anchor, className } = attributes;
  return (
    <p
      key={key}
      {...(anchor && { id: anchor })}
      className={`wp-block-paragraph ${className || ""}`}
    >
      { originalContent?.replace(/<p[^>]*>|<\/p>/g, '') || "" }
    </p>
  );
}