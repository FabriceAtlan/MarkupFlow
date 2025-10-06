import CustomNavLink from "../CustomNavLink/CustomNavLink";
import "../../styles/components/Header.scss";
import { useEffect, useState } from "react";

export default function Header() {
  const [showPanel, setShowPanel] = useState(false);

  return (
    <>
      <header>
        <nav className="header-nav">
          <img
            className="header-nav-burger-bar"
            src="burger-bar.png"
            alt=""
            onClick={() => setShowPanel(!showPanel)}
          />
          <ul className={`header-nav-ul ${showPanel ? "open" : ""}`}>
            <li>
              <CustomNavLink onClick={() => setShowPanel(false)} to="/">
                Home
              </CustomNavLink>
            </li>
            <li>
              <CustomNavLink onClick={() => setShowPanel(false)} to="/editor">
                Éditeur
              </CustomNavLink>
            </li>
          </ul>
        </nav>
        <h1 className="header-title">MarkupFlow</h1>
      </header>
    </>
  );
}
