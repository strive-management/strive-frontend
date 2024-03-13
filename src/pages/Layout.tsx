import React from "react";
import Navbar from "./SideBar";

type LayoutProps = {
    children: React.ReactNode;
  };


  const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
      <div>
        <Navbar />
        <div>{children}</div>
      </div>
    );
  };

export default Layout;