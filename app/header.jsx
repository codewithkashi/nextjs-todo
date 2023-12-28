import "@styles/header.css";
import Link from "next/link";
import LogoutMenu from "@components/logout";
import { useContext } from "react";
import { Context } from "@components/clients";
const Header = () => {
  return (
    <nav className="navBar">
      <div>
        <h2>Next TODO</h2>
      </div>
      <div>
        <Link href={"/"}>Home</Link>
        <LogoutMenu />
      </div>
    </nav>
  );
};

export default Header;
