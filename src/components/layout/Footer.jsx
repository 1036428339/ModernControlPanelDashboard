import theme from '../../theme';

/**
 * 底部信息组件
 */
const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer style={{
      padding: theme.spacing.md,
      backgroundColor: theme.neutral.white,
      color: theme.neutral.grey,
      textAlign: 'center',
      borderTop: `1px solid ${theme.neutral.lightGrey}`,
      fontSize: theme.typography.fontSize.small,
    }}>
      <p style={{ margin: 0 }}>
        © {currentYear} 智慧果园控制系统 | 版本 1.0.0
      </p>
    </footer>
  );
};

export default Footer;