import { FaSun, FaCloud, FaCloudRain, FaCloudSun, FaWind } from 'react-icons/fa';
import theme from '../../theme';

/**
 * 天气组件
 * 显示当前天气和未来预报
 */
const WeatherWidget = () => {
  // 模拟天气数据
  const weatherData = {
    current: {
      temperature: 26,
      condition: 'sunny', // sunny, cloudy, rainy, partly-cloudy, windy
      humidity: 45,
      windSpeed: 3.5,
    },
    forecast: [
      { day: '周一', temperature: 27, condition: 'sunny' },
      { day: '周二', temperature: 25, condition: 'partly-cloudy' },
      { day: '周三', temperature: 24, condition: 'cloudy' },
      { day: '周四', temperature: 22, condition: 'rainy' },
      { day: '周五', temperature: 23, condition: 'windy' },
    ],
  };

  // 根据天气状况获取图标
  const getWeatherIcon = (condition) => {
    switch (condition) {
      case 'sunny':
        return <FaSun />;
      case 'cloudy':
        return <FaCloud />;
      case 'rainy':
        return <FaCloudRain />;
      case 'partly-cloudy':
        return <FaCloudSun />;
      case 'windy':
        return <FaWind />;
      default:
        return <FaSun />;
    }
  };

  // 根据天气状况获取文本
  const getWeatherText = (condition) => {
    switch (condition) {
      case 'sunny':
        return '晴天';
      case 'cloudy':
        return '多云';
      case 'rainy':
        return '雨天';
      case 'partly-cloudy':
        return '局部多云';
      case 'windy':
        return '大风';
      default:
        return '未知';
    }
  };

  // 根据天气状况获取颜色
  const getWeatherColor = (condition) => {
    switch (condition) {
      case 'sunny':
        return '#FF9800';
      case 'cloudy':
        return '#78909C';
      case 'rainy':
        return '#0288D1';
      case 'partly-cloudy':
        return '#90CAF9';
      case 'windy':
        return '#B0BEC5';
      default:
        return '#FF9800';
    }
  };

  return (
    <div style={{
      backgroundColor: theme.neutral.white,
      borderRadius: theme.borderRadius.large,
      boxShadow: theme.shadows.small,
      padding: theme.spacing.lg,
    }}>
      <div style={{ 
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
      }}>
        <div style={{ 
          display: 'flex',
          alignItems: 'center',
          marginBottom: theme.spacing.md,
        }}>
          <div style={{
            fontSize: '3rem',
            color: getWeatherColor(weatherData.current.condition),
            marginRight: theme.spacing.lg,
          }}>
            {getWeatherIcon(weatherData.current.condition)}
          </div>
          
          <div>
            <div style={{ 
              fontSize: theme.typography.fontSize.xxlarge,
              fontWeight: theme.typography.fontWeight.bold,
              color: theme.neutral.darkGrey,
            }}>
              {weatherData.current.temperature}°C
            </div>
            <div style={{ 
              fontSize: theme.typography.fontSize.medium,
              color: theme.neutral.grey,
            }}>
              {getWeatherText(weatherData.current.condition)}
            </div>
          </div>
        </div>
        
        <div style={{ 
          display: 'flex',
          flexDirection: 'column',
          marginBottom: theme.spacing.md,
        }}>
          <div style={{ 
            marginBottom: theme.spacing.sm,
            color: theme.neutral.grey,
          }}>
            湿度: {weatherData.current.humidity}%
          </div>
          <div style={{ 
            color: theme.neutral.grey,
          }}>
            风速: {weatherData.current.windSpeed} m/s
          </div>
        </div>
      </div>
      
      <div style={{ 
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: theme.spacing.lg,
        overflowX: 'auto',
      }}>
        {weatherData.forecast.map((day, index) => (
          <div 
            key={index}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: `0 ${theme.spacing.md}`,
              minWidth: '80px',
            }}
          >
            <div style={{ 
              marginBottom: theme.spacing.sm,
              color: theme.neutral.darkGrey,
            }}>
              {day.day}
            </div>
            <div style={{ 
              fontSize: '1.5rem',
              color: getWeatherColor(day.condition),
              marginBottom: theme.spacing.sm,
            }}>
              {getWeatherIcon(day.condition)}
            </div>
            <div style={{ 
              color: theme.neutral.darkGrey,
              fontWeight: theme.typography.fontWeight.medium,
            }}>
              {day.temperature}°C
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherWidget;