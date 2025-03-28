import { useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';
import theme from '../../theme';

/**
 * 主布局组件
 * 包含顶部导航、侧边栏和内容区域
 */
const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="layout" style={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      backgroundColor: theme.neutral.lightGrey,
    }}>
      <Header toggleSidebar={toggleSidebar} />
      
      <div style={{
        display: 'flex',
        flex: 1,
      }}>
        <Sidebar open={sidebarOpen} />
        
        <main style={{
          flex: 1,
          padding: theme.spacing.lg,
          transition: theme.transitions.medium,
        }}>
          {children}
        </main>
      </div>
      
      <Footer />
    </div>
  );
};

export default Layout;