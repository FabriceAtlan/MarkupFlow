import CustomNavLink from "../CustomNavLink/CustomNavLink";
import "../../styles/components/Header.scss";

export default function Header() {
  return (
    <>
      <header>
        <nav>
          <ul className="header-nav-ul">
            <li>
              <CustomNavLink to="/">Home</CustomNavLink>
            </li>
            <li>
              <CustomNavLink to="/editor">Éditeur</CustomNavLink>
            </li>
          </ul>
        </nav>
        <h1>MarkupFlow</h1>
      </header>
    </>
  );
}
