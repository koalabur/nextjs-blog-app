// React
import { useState } from "react";

// Next
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";

// Contentful rich text
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { MARKS, INLINES, BLOCKS } from "@contentful/rich-text-types";

// Custom Hooks
import UseContentful from "@/../hooks/contentful";

// Styles
import styles from "@/styles/pages/posts/slug.module.scss";

function Posts({ data }) {
  const router = useRouter();
  const slug = router.query.slug;

  const [posts, setPosts] = useState(data);

  const [currentPost, setCurrentPost] = useState(
    posts.find((item) => item.slug === slug)
  );

  const options = {
    renderMark: {
      [MARKS.CODE]: (text) => {
        return <>{text}</>;
      },
      [MARKS.BOLD]: (text) => {
        return <strong>{text}</strong>;
      },
    },
    renderNode: {
      [BLOCKS.PARAGRAPH]: (node, children) => {
        if (
          node.content.find((item) =>
            item.marks.find((mark) => mark.type === "code")
          )
        ) {
          return (
            <div>
              <pre>
                <code>{children}</code>
              </pre>
            </div>
          );
        }
        return <p>{children}</p>;
      },
      [INLINES.HYPERLINK]: (node) => {
        const text = node.content.find(
          (item) => item.nodeType === "text"
        )?.value;
        return (
          <a href={node.data.uri} target="_blank" rel="noopener noreferrer">
            {text}
          </a>
        );
      },
      [BLOCKS.EMBEDDED_ASSET]: (node) => {
        const img = currentPost.content.links.assets.block.find(
          (i) => i.sys.id === node.data.target.sys.id
        );
        return (
          <Image
            src={img.url}
            alt={img.title}
            width={img.width}
            height={img.height}
          />
        );
      },
    },
  };

  return (
    <article className={styles.post}>
      <figure>
        <Image
          className={styles.post__cover}
          src={currentPost.coverImage.url}
          alt={currentPost.title}
          width="800"
          height="400"
        />
      </figure>
      <div className={styles.post__content}>
        <h1 className={styles["post__content-title"]}>{currentPost.title}</h1>
        <div className={styles["post__content-author"]}>
          <Image
            className={styles["post__content-author-img"]}
            src={currentPost.authorPicture.url}
            alt={currentPost.authorName}
            width="75"
            height="75"
          />
          <div className={styles["post__content-author-info"]}>
            <p className={styles["post__content-author-info-name"]}>
              {currentPost.authorName}
            </p>
            <p className={styles["post__content-author-info-date"]}>
              Published On:{" "}
              {new Date(currentPost.sys.firstPublishedAt).toLocaleString(
                "en-US",
                {
                  timeZone: "America/Los_Angeles",
                  dateStyle: "long",
                }
              )}
            </p>
          </div>
        </div>
        <div className={styles["post__content-body"]}>
          {documentToReactComponents(currentPost.content.json, options)}
        </div>
      </div>
      <Link className={styles.post__back} href="/posts">
        Back To Posts
      </Link>
    </article>
  );
}

const query = `
  query postsCollectionQuery {
    postsCollection(limit: 10) {
      items {
        sys {
          firstPublishedAt
          publishedAt
        }
        title
        slug
        authorName
        authorPicture {
          url
        }
        coverImage {
          url
        }
        content {
          links {
            assets {
              block {
                title
                url
                width
                height
                sys {
                  id
                }
              }
            }
          }
          json
        }
      }
    }
  }  
`;

export async function getStaticProps() {
  const blog = await UseContentful(query);
  const data = blog.data.postsCollection.items;

  return {
    props: {
      data,
    },
  };
}

export async function getStaticPaths() {
  const blog = await UseContentful(query);
  const data = blog.data.postsCollection.items;
  const paths = data.map((item) => ({
    params: { slug: item.slug },
  }));

  return {
    paths,
    fallback: false,
  };
}

export default Posts;
