import Link from "next/link";

// Styles
import styles from "@/styles/components/layout/index.module.scss";

function Layout({ children }: React.PropsWithChildren<{}>) {
  return (
    <>
      <nav className={styles.nav}>
        <Link className={styles.nav__logo} href="/">
          &#8220;The Blog&#8221;
        </Link>
        <div className={styles.nav__links}>
          <Link className={styles["nav__links-link"]} href="/">Home</Link>
          <Link className={styles["nav__links-link"]} href="/posts">Posts</Link>
        </div>
      </nav>
      <main>{children}</main>
      <footer className={styles.footer}>
        <p className={styles.footer__me}>Cameron Roberts blog-app | <a href="https://github.com/koalabur/blog-app" target="_blank">Github Link</a></p>
        <p className={styles.footer__other}>This blog was developed using <strong>Next.js 13</strong> and <strong>Contentful</strong>.</p>
      </footer>
    </>
  );
};

export default Layout;
