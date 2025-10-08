import CustomNavLink from "../CustomNavLink/CustomNavLink";
import "../../styles/components/Header.scss";
import { useEffect, useState } from "react";

export default function Header() {
  const [showPanel, setShowPanel] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && showPanel) {
        setShowPanel(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [showPanel]);

  return (
    <>
      <header>
        <nav className="header-nav">
          <h1 className="header-title">MarkupFlow</h1>
          <img
            className="header-nav-burger-bar"
            src="burger-bar.png"
            alt=""
            onClick={() => setShowPanel(!showPanel)}
          />
          <ul className={`header-nav-ul ${showPanel ? "open" : ""}`}>
            <li>
              <CustomNavLink onClick={() => setShowPanel(false)} to="/">
                Accueil
              </CustomNavLink>
            </li>
            <li>
              <CustomNavLink onClick={() => setShowPanel(false)} to="/editor">
                Éditeur
              </CustomNavLink>
            </li>
            <li>
              <CustomNavLink onClick={() => setShowPanel(false)} to="/about">
                À propos
              </CustomNavLink>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}
