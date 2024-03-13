import React from "react";
import Sidebar from "./SideBar";

type LayoutProps = {
    children: React.ReactNode;
  };


  const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
      <div>
        <Sidebar />
        <div>{children}</div>
      </div>
    );
  };

export default Layout;