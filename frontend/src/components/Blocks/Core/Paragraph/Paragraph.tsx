export default function Paragraph(
  { key, className, attributes, originalContent, innerBlocks }: 
  { key: any, className: string, attributes: { anchor?: string, OGclassName?: string }; originalContent?: string, innerBlocks?: any[] | null },
) {
  const { anchor, OGclassName } = attributes;
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