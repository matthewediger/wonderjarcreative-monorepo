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

  return (
    <main className="container mx-auto py-8 md:py-12">
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl lg:text-6xl">{page.title}</h1>
      </header>
      <div
        className="entry-content"
        dangerouslySetInnerHTML={{ __html: page.content }}
      ></div>
    </main>
  );
}
