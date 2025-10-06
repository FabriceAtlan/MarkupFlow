import { NavLink } from "react-router-dom";

interface CustomNavLinkI {
  to: string;
  children: React.ReactNode;
  onClick?: () => void;
}

export default function CustomNavLink({
  to,
  children,
  onClick,
}: CustomNavLinkI) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => (isActive ? "active" : "")}
      onClick={onClick}
    >
      {children}
    </NavLink>
  );
}
