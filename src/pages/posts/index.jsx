// React
import { useState } from "react";

// Custom Hooks
import UseContentful from "@/../hooks/contentful";

// Components
import PostsCard from "@/../components/posts/PostsCard";
import BasicPagination from "@/../components/pagination/BasicPagination";

// Styles
import styles from "@/styles/pages/posts/index.module.scss";

function Posts({ data }) {
  const [posts, setPosts] = useState(data);
  const [postsPerPage, setPostsPerPage] = useState(6);
  const [currentPage, setCurrentPage] = useState(1);

  // Get current post
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <section className={styles.blog}>
      <div className={styles.blog__container}>
        {/* Give me the blog posts */}
        <PostsCard post={currentPosts} />
      </div>
      {/* Give me the pagination */}
      <BasicPagination
        posts={posts}
        postsPerPage={postsPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
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
