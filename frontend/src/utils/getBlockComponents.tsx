import React from 'react';
import dynamic from 'next/dynamic';
import {
  Maybe,
  Block,
  CoreParagraphBlock,
  CoreParagraphBlockAttributes,
  CoreGroupBlock,
  CoreGroupBlockAttributes
} from '@/gql/graphql';

const getParsedBlocks = (blocksJSON: string) => {
  try {
    return JSON.parse(blocksJSON);
  } catch (error) {
    console.error("Error parsing blocksJSON:", error);
    return [];
  }
};

export async function getBlockComponents(blocksJSON: string) {
  const parsedBlocks = getParsedBlocks(blocksJSON);

  return Promise.all(parsedBlocks.map(async (block: Block, index: number) => {
    // Recursively process innerBlocks if present
    let innerBlocks: Maybe<React.ReactNode[]> = [];
    if (block.innerBlocks && block.innerBlocks.length > 0) {
      // Recursively render innerBlocks as React nodes
      innerBlocks = (await getBlockComponents(JSON.stringify(block.innerBlocks))).map((innerBlock, innerIndex) => (
        <React.Fragment key={innerIndex}>
          {React.isValidElement(innerBlock) ? innerBlock : null}
        </React.Fragment>
      ));;
    }

    switch (block.name) {
      case 'core/paragraph': {
        const Paragraph = dynamic(() => import('@/components/Blocks/Core/Paragraph/Paragraph'));
        const { attributes } = block as CoreParagraphBlock;
        const safeAttributes = (attributes ?? {}) as CoreParagraphBlockAttributes;
        
        return (
          <Paragraph
            key={index}
            {...block}
            attributes={safeAttributes}
          />
        );
      }
      case 'core/group': {
        const Group = dynamic(() => import('@/components/Blocks/Core/Group/Group'));
        const { attributes } = block as CoreGroupBlock;
        const safeAttributes = (attributes ?? {}) as CoreGroupBlockAttributes;

        return (
          <Group
            key={index}
            {...block}
            attributes={safeAttributes}
            innerBlocks={innerBlocks}
          />
        );
      }
      default: {
        const Default = dynamic(() => import('@/components/Blocks/Core/Default'));
        const { attributes } = block as any;

        return (
          <Default
            key={index}
            {...block}
            attributes={attributes}
            innerBlocks={innerBlocks}
          />
        );
      }
    }
  }));
}

type BlockAttributes = Record<string, any>;
export function getBlockClasses(attributes: BlockAttributes, baseClass: string = ''): string {
  const {
    align,
    backgroundColor,
    borderColor,
    className,
    dropCap,
    direction,
    fontFamily,
    fontSize,
    gradient,
    level,
    tagName,
    textAlign,
    textColor,
    style
    // add more as needed
  } = attributes;

  const classes = [
    baseClass,
    align ? `align${align}` : '',
    backgroundColor ? `has-background has-${backgroundColor}-background-color` : '',
    borderColor ? `has-border-color has-${borderColor}-border-color` : '',
    dropCap ? 'has-drop-cap' : '',
    direction ? `has-text-direction-${direction}` : '',
    fontFamily ? `has-${fontFamily}` : '',
    fontSize ? `has-${fontSize}` : '',
    gradient ? `has-${gradient}` : '',
    textColor ? 'has-text-color' : '',
    className || '',
  ];

  // Handle classes from style object
  if (style) {
    if (style.color.background || style.color.gradient) {
      classes.push('has-background');
    }
  }

  return classes.filter(Boolean).join(' ');
}

export function getBlockStyle(styleObj: any): React.CSSProperties {
  const result: React.CSSProperties = {};

  if (!styleObj || typeof styleObj !== 'object') return result;

  // Handle spacing (padding, margin)
  if (styleObj.spacing) {
    const { padding, margin } = styleObj.spacing;
    if (padding) {
      if (padding.top) result.paddingTop = convertPreset(padding.top);
      if (padding.right) result.paddingRight = convertPreset(padding.right);
      if (padding.bottom) result.paddingBottom = convertPreset(padding.bottom);
      if (padding.left) result.paddingLeft = convertPreset(padding.left);
    }
    if (margin) {
      if (margin.top) result.marginTop = convertPreset(margin.top);
      if (margin.right) result.marginRight = convertPreset(margin.right);
      if (margin.bottom) result.marginBottom = convertPreset(margin.bottom);
      if (margin.left) result.marginLeft = convertPreset(margin.left);
    }
  }

  // Handle border
  if (styleObj.border) {
    if (styleObj.border.width) result.borderWidth = styleObj.border.width;
    if (styleObj.border.color) result.borderColor = styleObj.border.color;
    if (styleObj.border.radius) {
      const r = styleObj.border.radius;
      if (r.topLeft) result.borderTopLeftRadius = r.topLeft;
      if (r.topRight) result.borderTopRightRadius = r.topRight;
      if (r.bottomLeft) result.borderBottomLeftRadius = r.bottomLeft;
      if (r.bottomRight) result.borderBottomRightRadius = r.bottomRight;
    }
  }

  // Handle color
  if (styleObj.color) {
    if (styleObj.color.background) result.background = styleObj.color.background;
    if (styleObj.color.gradient) result.background = styleObj.color.gradient;
    if (styleObj.color.text) result.color = styleObj.color.text;
  }

  // Handle typography
  if (styleObj.typography) {
    const t = styleObj.typography;
    if (t.fontStyle) result.fontStyle = t.fontStyle;
    if (t.fontWeight) result.fontWeight = t.fontWeight;
    if (t.lineHeight) result.lineHeight = t.lineHeight;
    if (t.letterSpacing) result.letterSpacing = t.letterSpacing;
    if (t.textDecoration) result.textDecoration = t.textDecoration;
    if (t.writingMode) result.writingMode = t.writingMode;
    if (t.textTransform) result.textTransform = t.textTransform;
  }

  // You can add more mappings as needed for your use case

  return result;
}

// Helper to convert WP preset variables to CSS custom properties
function convertPreset(value: string) {
  // Converts "var:preset|spacing|40" to "var(--wp--preset--spacing--40)"
  if (typeof value === 'string' && value.startsWith('var:preset|')) {
    return 'var(--wp--' + value.replace(/var:preset\|/g, '').replace(/\|/g, '--') + ')';
  }
  return value;
}