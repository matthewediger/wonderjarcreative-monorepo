import { Maybe, CoreParagraphBlockAttributes } from '@/gql/graphql';
import { getBlockClasses, getBlockStyle } from '@/utils/getBlockComponents';

type ParagraphProps = {
  attributes: CoreParagraphBlockAttributes;
  dynamicContent?: Maybe<string> | undefined;
  key: number;
  originalContent?: Maybe<string> | undefined;
  saveContent?: Maybe<string> | undefined;
};

export default function Paragraph({attributes, dynamicContent, key, originalContent, saveContent}: ParagraphProps) {
  const { anchor, style } = attributes;
  const blockClasses = getBlockClasses(attributes, 'wp-block-paragraph');
  const blockStyle = getBlockStyle(style);

  return (
    <p
      key={key}
      {...(anchor && { id: anchor })}
      className={blockClasses}
      {...(style && { style: blockStyle })}
      dangerouslySetInnerHTML={{
        __html: (dynamicContent || saveContent || originalContent)?.replace(/<p[^>]*>|<\/p>/g, '') || '',
      }}
    />
  );
}