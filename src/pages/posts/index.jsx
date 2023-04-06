// React
import { useEffect, useState } from "react";

// Next
import Image from "next/image";
import Link from "next/link";

// Custom Hooks
import UseContentful from "@/../hooks/contentful";

// Styles
import styles from "@/styles/pages/posts/index.module.scss";

//* Leaveing as type ANY for everything because there is so much information
//* coming from contentful I would cry having to define it
function Posts({ data }) {
  const [posts, setPosts] = useState(data);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(6);

  // Get current pot
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  // Pagination
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(posts.length / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  function nextPage() {
    if (currentPage !== pageNumbers.length) {
      setCurrentPage(currentPage + 1);
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }

  function prevPage() {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }

  function paginate(number) {
    setCurrentPage(number);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  function activePage(number) {
    if (number === currentPage) {
      return `${styles["blog__pagination-number"]} ${styles["blog__pagination-number--active"]}`;
    } else {
      return styles["blog__pagination-number"];
    }
  }

  return (
    <section className={styles.blog}>
      <div className={styles.blog__container}>
        {currentPosts.map((item) => {
          return (
            <Link
              className={styles["blog__container-post"]}
              key={item.slug}
              href={`posts/${item.slug}`}
            >
              <Image
                className={styles["blog__container-post-cover"]}
                src={item.coverImage.url}
                alt={item.title}
                width="650"
                height="325"
              />
              <div className={styles["blog__container-post-author"]}>
                <Image
                  className={styles["blog__container-post-author-img"]}
                  alt={item.authorName}
                  src={item.authorPicture.url}
                  width="45"
                  height="45"
                />
                <p className={styles["blog__container-post-author-name"]}>
                  {item.authorName}
                </p>
              </div>
              <p className={styles["blog__container-post-date"]}>
                Published On:{" "}
                {new Date(item.sys.firstPublishedAt).toLocaleString("en-US", {
                  timeZone: "America/Los_Angeles",
                  dateStyle: "long",
                })}
              </p>
              <h2 className={styles["blog__container-post-title"]}>
                {item.title}
              </h2>
              <p className={styles["blog__container-post-excerpt"]}>
                {item.excerpt}
              </p>
              <p className={styles["blog__container-post-readmore"]}>
                Read More...
              </p>
            </Link>
          );
        })}
      </div>
      <div className={styles.blog__pagination}>
        <button
          className={styles["blog__pagination-number"]}
          onClick={prevPage}
        >
          Prev
        </button>
        {pageNumbers.map((number) => (
          <button
            role="button"
            key={number}
            onClick={() => paginate(number)}
            className={activePage(number)}
          >
            {number}
          </button>
        ))}
        <button
          className={styles["blog__pagination-number"]}
          onClick={nextPage}
        >
          Next
        </button>
      </div>
    </section>
  );
}

export async function getStaticProps() {
  const query = `
    query postsCollectionQuery {
      postsCollection {
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
          excerpt
          coverImage {
            url
          }
          content {
            json
          }
        }
      }
    }  
  `;

  const blog = await UseContentful(query);
  const data = blog.data.postsCollection.items;

  return {
    props: {
      data,
    },
  };
}

export default Posts;
