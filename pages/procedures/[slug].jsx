import client from "@/lib/apolloClient";
import { GET_PAGE_BY_SLUG } from "@/queries/getPageBySlug";
import { GET_ALL_PAGES_SLUGS } from "@/queries/getAllPagesSlugs";
import { GET_TREATMENTS } from "@/queries/getTreatments";
import { GET_TAGS } from "@/queries/getTags";
import { Fragment } from "react";
import { useRouter } from "next/router";

import Section from "@/components/Section";
import TextComponent from "@/components/TextComponent";
import Treatments from "@/components/Treatments";

function Page({ page, treatments, tags }) {
  if (!page) return <div>Page not found</div>;
  const router = useRouter();
  const colorClass = page.slug.replaceAll("-", "");

  return (
    <Fragment key={router.query.slug}>
      {page.featuredImage && (
        <Section
          imgUrl={page.featuredImage.node.sourceUrl}
          title={page.title}
          customClass={colorClass}
          isHome={true}
        >
          <TextComponent
            title={page.title}
            description={page.content}
            isWhiteTitle={true}
            hasBackBtn={true}
          />
        </Section>
      )}
      <Treatments
        treatments={treatments}
        slug={page.slug}
        tags={tags}
        colorClass={colorClass}
      />
    </Fragment>
  );
}

export async function getStaticPaths() {
  try {
    const { data } = await client.query({
      query: GET_ALL_PAGES_SLUGS,
    });

    const paths = data.pages.nodes.map((page) => ({
      params: { slug: page.slug },
    }));

    return {
      paths,
      fallback: "blocking", // Generiše stranicu ako nije u kešu
    };
  } catch (error) {
    console.error("Error fetching slugs:", error);
    return { paths: [], fallback: "blocking" };
  }
}

export async function getStaticProps({ params }) {
  try {
    const [pageData, treatmentsData, tagsData] = await Promise.all([
      client.query({
        query: GET_PAGE_BY_SLUG,
        variables: { slug: params.slug },
      }),
      client.query({
        query: GET_TREATMENTS,
      }),
      client.query({
        query: GET_TAGS,
      }),
    ]);

    return {
      props: {
        page: pageData.data.pageBy,
        treatments: treatmentsData.data,
        tags: tagsData.data.tags.nodes,
      },
      revalidate: 60, // Osvežavanje keša na svakih 60 sekundi
    };
  } catch (error) {
    console.error("Error fetching page data:", error);
    return {
      props: {
        page: null,
        treatments: null,
        tags: null,
      },
    };
  }
}

export default Page;
