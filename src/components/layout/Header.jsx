import { FaBars, FaLeaf, FaBell, FaUser } from 'react-icons/fa';
import theme from '../../theme';

/**
 * 顶部导航组件
 */
const Header = ({ toggleSidebar }) => {
  return (
    <header style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: `${theme.spacing.md} ${theme.spacing.lg}`,
      backgroundColor: theme.primary,
      color: theme.neutral.white,
      boxShadow: theme.shadows.medium,
    }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <button 
          onClick={toggleSidebar}
          style={{
            background: 'none',
            border: 'none',
            color: theme.neutral.white,
            fontSize: theme.typography.fontSize.large,
            cursor: 'pointer',
            marginRight: theme.spacing.md,
          }}
        >
          <FaBars />
        </button>
        
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <FaLeaf style={{ marginRight: theme.spacing.sm, fontSize: '1.5rem' }} />
          <h1 style={{ 
            margin: 0, 
            fontSize: theme.typography.fontSize.xlarge,
            fontWeight: theme.typography.fontWeight.medium,
          }}>
            智慧果园
          </h1>
        </div>
      </div>
      
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <button style={{
          background: 'none',
          border: 'none',
          color: theme.neutral.white,
          fontSize: theme.typography.fontSize.large,
          cursor: 'pointer',
          marginLeft: theme.spacing.md,
        }}>
          <FaBell />
        </button>
        
        <button style={{
          background: 'none',
          border: 'none',
          color: theme.neutral.white,
          fontSize: theme.typography.fontSize.large,
          cursor: 'pointer',
          marginLeft: theme.spacing.md,
        }}>
          <FaUser />
        </button>
      </div>
    </header>
  );
};

export default Header;