import React from 'react';
import SideNavBar from '../components/SideNavBar';

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <SideNavBar />
      <div>{children}</div>
    </div>
  );
};

export default Layout;
