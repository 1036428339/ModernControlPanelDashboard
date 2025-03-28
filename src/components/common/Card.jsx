import theme from '../../theme';

/**
 * 卡片组件
 * 用于展示各个功能模块
 */
const Card = ({ title, icon, children, minHeight = '200px', onClick }) => {
  return (
    <div 
      onClick={onClick}
      style={{
        backgroundColor: theme.neutral.white,
        borderRadius: theme.borderRadius.large,
        boxShadow: theme.shadows.small,
        padding: theme.spacing.lg,
        minHeight,
        display: 'flex',
        flexDirection: 'column',
        transition: theme.transitions.medium,
        cursor: onClick ? 'pointer' : 'default',
        ':hover': onClick ? {
          boxShadow: theme.shadows.medium,
          transform: 'translateY(-2px)',
        } : {},
      }}
    >
      {(title || icon) && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: theme.spacing.md,
        }}>
          {icon && (
            <span style={{
              fontSize: theme.typography.fontSize.xlarge,
              color: theme.primary,
              marginRight: theme.spacing.sm,
            }}>
              {icon}
            </span>
          )}
          {title && (
            <h3 style={{
              margin: 0,
              fontSize: theme.typography.fontSize.large,
              fontWeight: theme.typography.fontWeight.medium,
              color: theme.neutral.darkGrey,
            }}>
              {title}
            </h3>
          )}
        </div>
      )}
      
      <div style={{ flex: 1 }}>
        {children}
      </div>
    </div>
  );
};

export default Card;