export default function Heading(
  { key, attributes, saveContent }:
  { key: any, attributes: { anchor?: string, level?: number, className?: string }; saveContent?: string },
) {
  const { anchor, level, className } = attributes;
  const Heading = `h${level || 2}` as keyof JSX.IntrinsicElements;
 
  return (
    <Heading
      key={key}
      {...(anchor && { id: anchor })}
      {...(className && { className: className })}
      dangerouslySetInnerHTML={{ __html: saveContent?.replace(/<h[^>]*>|<\/h[^>]*>/g, '') || "" }}
    />
  );
}