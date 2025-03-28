import theme from '../../theme';

/**
 * 状态指示器组件
 * 用于显示设备状态
 */
const StatusIndicator = ({ status, size = 'medium', label, showLabel = true }) => {
  // 根据状态确定颜色
  const getColorByStatus = () => {
    switch (status) {
      case 'online':
      case 'active':
      case 'running':
        return theme.functional.success;
      case 'offline':
      case 'inactive':
      case 'stopped':
        return theme.neutral.grey;
      case 'warning':
        return theme.functional.warning;
      case 'error':
      case 'critical':
        return theme.functional.error;
      default:
        return theme.neutral.grey;
    }
  };

  // 根据大小确定尺寸
  const getSizeInPixels = () => {
    switch (size) {
      case 'small':
        return '8px';
      case 'medium':
        return '12px';
      case 'large':
        return '16px';
      default:
        return '12px';
    }
  };

  // 获取状态文本
  const getStatusText = () => {
    switch (status) {
      case 'online':
        return '在线';
      case 'offline':
        return '离线';
      case 'active':
        return '活动';
      case 'inactive':
        return '非活动';
      case 'running':
        return '运行中';
      case 'stopped':
        return '已停止';
      case 'warning':
        return '警告';
      case 'error':
        return '错误';
      case 'critical':
        return '严重';
      default:
        return status;
    }
  };

  const color = getColorByStatus();
  const dotSize = getSizeInPixels();
  const displayLabel = label || getStatusText();

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <div
        style={{
          width: dotSize,
          height: dotSize,
          borderRadius: '50%',
          backgroundColor: color,
          boxShadow: `0 0 5px ${color}`,
          marginRight: showLabel ? theme.spacing.sm : 0,
        }}
      />
      {showLabel && (
        <span style={{
          fontSize: theme.typography.fontSize.small,
          color: theme.neutral.darkGrey,
        }}>
          {displayLabel}
        </span>
      )}
    </div>
  );
};

export default StatusIndicator;