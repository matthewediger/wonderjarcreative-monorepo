import { print } from "graphql/language/printer";
import { ContentNode, Page } from "@/gql/graphql";
import { fetchGraphQL } from "@/utils/fetchGraphQL";
import { PageQuery } from "./PageQuery";

interface TemplateProps {
  node: ContentNode;
}

export default async function PageTemplate({ node }: TemplateProps) {
  const { page } = await fetchGraphQL<{ page: Page }>(print(PageQuery), {
    id: node.databaseId,
  });
  const { pages } = await fetchGraphQL<{ page: Page }>(print(PageQuery), {
    id: node.databaseId,
  });

  const { name, blockType, attributes } = JSON.parse(page.blocksJSON)[0] || {};


  return (
    <main className="py-8 md:py-12">
      <header className="container mx-auto mb-8 px-4">
        <h1 className="text-3xl md:text-4xl lg:text-6xl">{page.title}</h1>
      </header>
      <div
        className="entry-content"
        // dangerouslySetInnerHTML={{ __html: page.content }}
      ></div>
      { console.log( page.blocks )}
      { console.log( pages )}
      {
      /* <pre>
        {blocksJson.map((block) => (
          console.log(block),
          <div key={block.clientId}>
            <pre>{block.name}</pre>
          </div>
        ))}
      </pre> */}
    </main>
  );
}
