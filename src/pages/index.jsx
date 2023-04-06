import Link from "next/link";
import Head from "next/head";

// Styles
import styles from "@/styles/pages/index.module.scss";

export default function Home() {
  return (
    <>
      <Head>
        <title>Contentful Blog App</title>
        <meta name="description" content="Contentful Blog App" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className={styles.home}>
        <h1 className={styles.home__title}>
          Welcome to &#8220;The Blog&#8221;
        </h1>
        <h2 className={styles.home__subtitle}>
          A project created by Cameron using Next.js 13 and Contentful
        </h2>
        <div className={styles.home__container}>
          <p className={styles["home__container-body"]}>
            This <strong>Next.js</strong> web app was created to showcase:
          </p>
          <ul className={styles["home__container-list"]}>
            <li className={styles["home__container-list-item"]}>
              Next.js/ React usage
            </li>
            <li className={styles["home__container-list-item"]}>
              Dynamic URLs
            </li>
            <li className={styles["home__container-list-item"]}>
              Content generated through the Contentful API
            </li>
            <li className={styles["home__container-list-item"]}>
              Fetching content using GraphQL
            </li>
          </ul>
          <Link className={styles["home__container-btn"]} href="/posts">
            Visit Blog
          </Link>
        </div>
      </section>
    </>
  );
}
