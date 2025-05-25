import { load } from 'cheerio';
import { Maybe } from '@/gql/graphql';
import { getBlockClasses, getBlockStyle } from '@/utils/getBlockComponents';

type DefaultProps = {
  attributes: Record<string, any>;
  dynamicContent?: Maybe<string> | undefined;
  innerBlocks?: React.ReactNode[];
  key: number;
  originalContent?: Maybe<string> | undefined;
  saveContent?: Maybe<string> | undefined;
};

export default function Default({attributes, dynamicContent, innerBlocks, key, originalContent, saveContent}: DefaultProps) {
  const { anchor, style, tagName } = attributes as any;
  const blockClasses = getBlockClasses(attributes, 'wp-block-paragraph');
  const blockStyle = getBlockStyle(style);
  const Tag = tagName || 'div';
  const TagComponent = Tag as keyof JSX.IntrinsicElements;

  return (
    <TagComponent
      key={key}
      {...(anchor && { id: anchor })}
      className={blockClasses}
      {...(style && { style: blockStyle })}
      {...(!innerBlocks || innerBlocks.length <= 0 ? { dangerouslySetInnerHTML: { __html: dynamicContent || saveContent || originalContent }} : {} )}
    >
      {innerBlocks && innerBlocks.length > 0 ? innerBlocks : null}
    </TagComponent>
  );
}