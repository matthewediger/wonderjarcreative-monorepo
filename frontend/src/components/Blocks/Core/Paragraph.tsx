export default function Paragraph(
  { key, attributes, saveContent }: 
  { key: any, attributes: { anchor?: string, className?: string }; saveContent?: string },
) {
  const { anchor, className } = attributes;
  return (
    <p
      key={key}
      {...(anchor && { id: anchor })}
      className={`wp-block-paragraph container mx-auto px-4 mb-4 ${className || ""}`}
      dangerouslySetInnerHTML={{ __html: saveContent?.replace(/<p[^>]*>|<\/p>/g, '') || "" }}
    />
  );
}