export default function Paragraph(
  { attributes, saveContent }: 
  { attributes: { anchor?: string, className?: string }; saveContent?: string },
) {
  const { anchor, className } = attributes;
  return (
    <p
      {...(anchor && { id: anchor })}
      {...(className && { className })}
    >
      { saveContent?.replace(/<p[^>]*>|<\/p>/g, '') }
    </p>
  );
}