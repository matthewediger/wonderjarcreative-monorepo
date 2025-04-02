import React from 'react';

export async function getBlockComponents(blocksJSON: string) {
  const parsedBlocks = JSON.parse(blocksJSON);
  const blockArray: JSX.Element[] = [];
  if (Array.isArray(parsedBlocks)) {
    parsedBlocks.forEach((block, index) => {
      const { name, attributes, saveContent } = block;
      let BlockComponent;

      switch (name) {
        case "core/paragraph":
          BlockComponent = require("@/components/Blocks/Core/Paragraph").default;
          break;
        // case "core/image":
        //   BlockComponent = require("@/components/Blocks/Core/Image").default;
        //   break;
        // case "core/heading":
        //   BlockComponent = require("@/components/Blocks/Core/Heading").default;
        //   break;
        default:
          console.warn(`No component found for block type: ${name}`);
          return;
      }

      if (BlockComponent) {
        blockArray.push(
          React.createElement(BlockComponent, {
            key: `${name}-${index}`,
            attributes,
            saveContent,
          })
        );
      }
    });

    return blockArray;
  }
}