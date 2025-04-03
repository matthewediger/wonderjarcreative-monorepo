import { print } from "graphql/language/printer";
import { ContentNode, Page } from "@/gql/graphql";
import { fetchGraphQL } from "@/utils/fetchGraphQL";
import { PageQuery } from "./PageQuery";
import { getBlockComponents } from "@/utils/getBlockComponents";

interface TemplateProps {
  node: ContentNode;
}

export default async function PageTemplate({ node }: TemplateProps) {
  const { page } = await fetchGraphQL<{ page: Page }>(print(PageQuery), {
    id: node.databaseId,
  });
  const blockComponents = page.blocksJSON ? await getBlockComponents(page.blocksJSON) : [];

  return (
    <main className="py-8 md:py-12">
      <header className="container mx-auto mb-8 px-4">
        <h1 className="text-3xl md:text-4xl lg:text-6xl">{page.title}</h1>
      </header>
      { blockComponents && blockComponents.length > 0 ? (
        <div className="entry-content">
          {blockComponents}
        </div>
      ): (
        <p className="text-center text-lg text-gray-500">No content available.</p>
      )}
    </main>
  );
}
