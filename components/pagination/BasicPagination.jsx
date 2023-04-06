// Styles
import styles from "@/styles/components/pagination/BasicPagination.module.scss";

export default function BasicPagination({
  posts,
  postsPerPage,
  currentPage,
  setCurrentPage,
}) {
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
      return `${styles["pagination__number"]} ${styles["pagination__number--active"]}`;
    } else {
      return styles["pagination__number"];
    }
  }

  return (
    <div className={styles.pagination}>
      <button className={styles["pagination__number"]} onClick={prevPage}>
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
      <button className={styles["pagination__number"]} onClick={nextPage}>
        Next
      </button>
    </div>
  );
}
