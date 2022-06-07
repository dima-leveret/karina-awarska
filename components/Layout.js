import Header from "./Header";
import Footer from "./Footer";

import styles from "../styles/components/Layout.module.css";

const Layout = ({ children }) => {
  // const [menu, setMenu] = useState(false);

  // const showMenu = () => {
  //   setMenu(!menu);
  // };

  // const closeMenu = () => {
  //   setMenu(false);
  // }

  return (
    <div className={styles.contentContainer}>
      <div className={styles.content}>
        <Header />
        <main className={styles.main}>{children}</main>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
