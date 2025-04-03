import React from 'react';
import dynamic from 'next/dynamic';
import { Block } from '@/gql/graphql';

const getParsedBlocks = (blocksJSON: string) => {
  let parsedBlocks = [];
  try {
    parsedBlocks = JSON.parse(blocksJSON);
  } catch (error) {
    console.error("Error parsing blocksJSON:", error);
  }
  return parsedBlocks;
};

export async function getBlockComponents(blocksJSON: string) {
  const parsedBlocks = getParsedBlocks(blocksJSON);
  const Paragraph = dynamic(() => import('@/components/Blocks/Core/Paragraph'));
  // const Heading = dynamic(() => import('@/components/Blocks/Core/Heading'));
  // Import other components similarly

  const componentMap = {
    'core/paragraph': Paragraph,
    // 'core/heading': Heading,
    // Map other components
  };

  const blockArray: React.ReactElement[] = [];

  parsedBlocks.map((block: { name: keyof typeof componentMap; attributes: any; saveContent: string }, index: number) => {
    const BlockComponent = componentMap[block.name];

    if (!BlockComponent) {
      console.warn(`No component found for block type: ${block.name}`);
      return null;
    }

    const Component = BlockComponent as React.ComponentType<{ attributes: any; saveContent: string }>;
    const el = React.createElement(Component, {
      key: `${block.name}-${index}`, // Add a unique key prop
      attributes: block.attributes,
      saveContent: block.saveContent,
    });

    blockArray.push(el);
  });

  return blockArray;
}