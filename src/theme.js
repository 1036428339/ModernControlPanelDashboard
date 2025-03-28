/**
 * 农业主题平板中控系统主题配置
 */

export const theme = {
  // 主色调
  primary: '#8BC34A', // 青苹果绿
  
  // 辅助色
  secondary: {
    soil: '#795548', // 土壤棕
    sky: '#03A9F4',  // 天空蓝
  },
  
  // 功能色
  functional: {
    success: '#4CAF50',
    warning: '#FFC107',
    error: '#F44336',
    info: '#2196F3',
  },
  
  // 中性色
  neutral: {
    white: '#FFFFFF',
    lightGrey: '#F5F5F5',
    grey: '#9E9E9E',
    darkGrey: '#616161',
    black: '#212121',
  },
  
  // 字体
  typography: {
    fontFamily: '"Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
    fontSize: {
      small: '0.875rem',
      medium: '1rem',
      large: '1.25rem',
      xlarge: '1.5rem',
      xxlarge: '2rem',
    },
    fontWeight: {
      light: 300,
      regular: 400,
      medium: 500,
      bold: 700,
    },
  },
  
  // 间距
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    xxl: '3rem',
  },
  
  // 圆角
  borderRadius: {
    small: '4px',
    medium: '8px',
    large: '16px',
    circle: '50%',
  },
  
  // 阴影
  shadows: {
    small: '0 2px 4px rgba(0, 0, 0, 0.1)',
    medium: '0 4px 8px rgba(0, 0, 0, 0.1)',
    large: '0 8px 16px rgba(0, 0, 0, 0.1)',
  },
  
  // 过渡
  transitions: {
    short: '0.2s ease',
    medium: '0.3s ease',
    long: '0.5s ease',
  },
};

export default theme;