import theme from '../../theme';

/**
 * 按钮组件
 * 支持多种类型和大小
 */
const Button = ({ 
  children, 
  onClick, 
  type = 'primary', // primary, secondary, success, warning, error
  size = 'medium', // small, medium, large
  icon = null,
  fullWidth = false,
  disabled = false,
}) => {
  // 根据类型确定颜色
  const getColorByType = () => {
    switch (type) {
      case 'primary':
        return theme.primary;
      case 'secondary':
        return theme.secondary.soil;
      case 'success':
        return theme.functional.success;
      case 'warning':
        return theme.functional.warning;
      case 'error':
        return theme.functional.error;
      default:
        return theme.primary;
    }
  };

  // 根据大小确定内边距和字体大小
  const getPaddingBySize = () => {
    switch (size) {
      case 'small':
        return `${theme.spacing.xs} ${theme.spacing.sm}`;
      case 'medium':
        return `${theme.spacing.sm} ${theme.spacing.md}`;
      case 'large':
        return `${theme.spacing.md} ${theme.spacing.lg}`;
      default:
        return `${theme.spacing.sm} ${theme.spacing.md}`;
    }
  };

  const getFontSizeBySize = () => {
    switch (size) {
      case 'small':
        return theme.typography.fontSize.small;
      case 'medium':
        return theme.typography.fontSize.medium;
      case 'large':
        return theme.typography.fontSize.large;
      default:
        return theme.typography.fontSize.medium;
    }
  };

  const backgroundColor = getColorByType();
  const padding = getPaddingBySize();
  const fontSize = getFontSizeBySize();

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        backgroundColor,
        color: theme.neutral.white,
        border: 'none',
        borderRadius: theme.borderRadius.medium,
        padding,
        fontSize,
        fontWeight: theme.typography.fontWeight.medium,
        cursor: disabled ? 'not-allowed' : 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: fullWidth ? '100%' : 'auto',
        opacity: disabled ? 0.7 : 1,
        transition: theme.transitions.short,
        ':hover': {
          opacity: disabled ? 0.7 : 0.9,
        },
        ':active': {
          transform: disabled ? 'none' : 'scale(0.98)',
        },
      }}
    >
      {icon && (
        <span style={{ marginRight: children ? theme.spacing.sm : 0 }}>
          {icon}
        </span>
      )}
      {children}
    </button>
  );
};

/**
 * 开关按钮组件
 */
export const ToggleButton = ({ 
  isOn, 
  onToggle, 
  onColor = theme.functional.success, 
  offColor = theme.neutral.grey,
  disabled = false,
}) => {
  return (
    <button
      onClick={disabled ? undefined : onToggle}
      style={{
        width: '50px',
        height: '26px',
        borderRadius: '13px',
        backgroundColor: isOn ? onColor : offColor,
        position: 'relative',
        transition: theme.transitions.short,
        border: 'none',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.7 : 1,
        padding: 0,
      }}
    >
      <div
        style={{
          width: '20px',
          height: '20px',
          borderRadius: '50%',
          backgroundColor: theme.neutral.white,
          position: 'absolute',
          top: '3px',
          left: isOn ? '27px' : '3px',
          transition: theme.transitions.short,
          boxShadow: theme.shadows.small,
        }}
      />
    </button>
  );
};

export default Button;