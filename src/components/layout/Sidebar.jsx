import { FaHome, FaLightbulb, FaMusic, FaThermometerHalf, FaTint, FaTablet, FaWater } from 'react-icons/fa';
import theme from '../../theme';

/**
 * 侧边栏导航组件
 */
const Sidebar = ({ open }) => {
  const menuItems = [
    { icon: <FaHome />, label: '总控面板', path: '/' },
    { icon: <FaTablet />, label: '设备管理', path: '/devices' },
    { icon: <FaMusic />, label: '影音控制', path: '/media' },
    { icon: <FaLightbulb />, label: '灯光系统', path: '/lighting' },
    { icon: <FaTint />, label: '灌溉系统', path: '/irrigation' },
    { icon: <FaWater />, label: '高级灌溉系统', path: '/advanced-irrigation' },
    { icon: <FaThermometerHalf />, label: '气候控制', path: '/climate' },
  ];

  return (
    <aside style={{
      width: open ? '250px' : '0',
      backgroundColor: theme.neutral.white,
      boxShadow: theme.shadows.small,
      overflow: 'hidden',
      transition: theme.transitions.medium,
    }}>
      <nav style={{ padding: theme.spacing.md }}>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {menuItems.map((item, index) => (
            <li key={index} style={{ marginBottom: theme.spacing.md }}>
              <a 
                href={item.path}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: theme.spacing.md,
                  borderRadius: theme.borderRadius.medium,
                  color: theme.neutral.darkGrey,
                  textDecoration: 'none',
                  transition: theme.transitions.short,
                  ':hover': {
                    backgroundColor: theme.neutral.lightGrey,
                    color: theme.primary,
                  }
                }}
              >
                <span style={{ marginRight: theme.spacing.md, fontSize: theme.typography.fontSize.large }}>
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;