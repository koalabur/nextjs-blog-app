// Next
import Image from "next/image";
import Link from "next/link";

// Styles
import styles from "@/styles/pages/posts/index.module.scss";

function PostsCard({ post }) {
  return (
    <>
      {post.map((item) => {
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
    </>
  );
}

export default PostsCard;
