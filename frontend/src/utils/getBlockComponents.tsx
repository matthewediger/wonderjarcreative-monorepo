import React from 'react';
import dynamic from 'next/dynamic';

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
  const componentMap = {
    'core/paragraph': dynamic(() => import('@/components/Blocks/Core/Paragraph/Paragraph')),
    // Add other block mappings as needed
  };

  return Promise.all(
    parsedBlocks.map(async (block: { name: keyof typeof componentMap; attributes: any; originalContent: string; innerBlocks?: any[] }, index: number) => {
      // Recursively process inner blocks
      const innerBlocks = block.innerBlocks
        ? await getBlockComponents(JSON.stringify(block.innerBlocks))
        : null;

      const BlockComponent = componentMap[block.name];

      // Default rendering for unmapped blocks
      if (!BlockComponent) {
        return (
          innerBlocks?.length
            ?
            <div
              key={`${block.name}-${index}`}
              {...(block.attributes.anchor && { id: block.attributes.anchor })}
              className={`wp-block-${block.name} ${block.attributes.className || ""}`}
            >
                {innerBlocks}
            </div>
            :
            <div
              key={`${block.name}-${index}`}
              {...(block.attributes.anchor && { id: block.attributes.anchor })}
              className={`wp-block-${block.name} ${block.attributes.className || ""}`}
              dangerouslySetInnerHTML={{ __html: block.originalContent }} />
        );
      }

      // Render the mapped block component
      return (
        <BlockComponent
          key={`${block.name}-${index}`}
          attributes={block.attributes}
          originalContent={block.originalContent}
          innerBlocks={innerBlocks}
        />
      );
    })
  );
}