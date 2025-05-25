import React from 'react';
import { Maybe, CoreGroupBlockAttributes } from '@/gql/graphql';

type GroupProps = {
  attributes: CoreGroupBlockAttributes;
  dynamicContent?: Maybe<string> | undefined;
  innerBlocks?: React.ReactNode[];
  key: number;
  originalContent?: Maybe<string> | undefined;
  saveContent?: Maybe<string> | undefined;
}

export default function Group({ attributes, innerBlocks, originalContent, saveContent, dynamicContent }: GroupProps) {
  const { align, anchor, backgroundColor, className, layout = {}, tagName } = attributes as CoreGroupBlockAttributes;
  const { type, orientation } = layout;
  const alignmentClass = align ? `align${align}` : '';
  const backgroundColorClass = backgroundColor ? `has-background has-${backgroundColor}-background-color` : '';
  const layoutClass = type ? `is-layout-${type}` : '';
  const orientationClass = orientation ? `is-${orientation}` : '';
  const classList = [
    'wp-block-group',
    alignmentClass,
    backgroundColorClass,
    layoutClass,
    orientationClass,
    className
  ]
    .filter(Boolean)
    .join(' ');
  const Tag = tagName || 'div';
  const TagComponent = Tag as keyof JSX.IntrinsicElements;

  return (
    <TagComponent
      {...(anchor && { id: anchor })}
      className={classList}
    >
      {innerBlocks}
    </TagComponent>
  );
}