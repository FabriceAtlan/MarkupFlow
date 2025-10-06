import { NavLink } from "react-router-dom";

interface CustomNavLinkI {
  to: string;
  children: string;
}

export default function CustomNavLink({ to, children }: CustomNavLinkI) {
  return (
    <NavLink to={to} className={({ isActive }) => (isActive ? "active" : "")}>
      {children}
    </NavLink>
  );
}
