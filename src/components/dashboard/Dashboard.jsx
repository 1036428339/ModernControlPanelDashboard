import { FaThermometerHalf, FaTint, FaLightbulb, FaMusic, FaTablet } from 'react-icons/fa';
import Card from '../common/Card';
import StatusIndicator from '../common/StatusIndicator';
import theme from '../../theme';
import WeatherWidget from './WeatherWidget';
import DeviceStatusChart from './DeviceStatusChart';

/**
 * 总控面板组件
 * 显示系统概览
 */
const Dashboard = () => {
  return (
    <div>
      <h2 style={{ 
        color: theme.neutral.darkGrey,
        marginBottom: theme.spacing.lg,
        fontWeight: theme.typography.fontWeight.medium,
      }}>
        总控面板
      </h2>
      
      <div style={{ marginBottom: theme.spacing.xl }}>
        <WeatherWidget />
      </div>
      
      <div style={{ 
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: theme.spacing.lg,
        marginBottom: theme.spacing.xl,
      }}>
        <Card 
          title="温度控制" 
          icon={<FaThermometerHalf />}
          onClick={() => console.log('Navigate to climate control')}
        >
          <div style={{ textAlign: 'center', padding: theme.spacing.md }}>
            <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: theme.secondary.soil }}>
              24°C
            </div>
            <div style={{ color: theme.neutral.grey, marginTop: theme.spacing.sm }}>
              目标温度: 25°C
            </div>
            <div style={{ marginTop: theme.spacing.md }}>
              <StatusIndicator status="active" label="系统运行中" />
            </div>
          </div>
        </Card>
        
        <Card 
          title="灌溉系统" 
          icon={<FaTint />}
          onClick={() => console.log('Navigate to irrigation system')}
        >
          <div style={{ textAlign: 'center', padding: theme.spacing.md }}>
            <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: theme.secondary.sky }}>
              65%
            </div>
            <div style={{ color: theme.neutral.grey, marginTop: theme.spacing.sm }}>
              土壤湿度
            </div>
            <div style={{ marginTop: theme.spacing.md }}>
              <StatusIndicator status="inactive" label="系统待机中" />
            </div>
          </div>
        </Card>
        
        <Card 
          title="灯光系统" 
          icon={<FaLightbulb />}
          onClick={() => console.log('Navigate to lighting system')}
        >
          <div style={{ textAlign: 'center', padding: theme.spacing.md }}>
            <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: theme.functional.warning }}>
              75%
            </div>
            <div style={{ color: theme.neutral.grey, marginTop: theme.spacing.sm }}>
              亮度
            </div>
            <div style={{ marginTop: theme.spacing.md }}>
              <StatusIndicator status="active" label="灯光已开启" />
            </div>
          </div>
        </Card>
        
        <Card 
          title="影音系统" 
          icon={<FaMusic />}
          onClick={() => console.log('Navigate to media system')}
        >
          <div style={{ textAlign: 'center', padding: theme.spacing.md }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: theme.neutral.darkGrey }}>
              自然音乐
            </div>
            <div style={{ color: theme.neutral.grey, marginTop: theme.spacing.sm }}>
              当前播放
            </div>
            <div style={{ marginTop: theme.spacing.md }}>
              <StatusIndicator status="active" label="音乐播放中" />
            </div>
          </div>
        </Card>
      </div>
      
      <div style={{ 
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(500px, 1fr))',
        gap: theme.spacing.lg,
      }}>
        <Card title="设备状态概览" icon={<FaTablet />}>
          <DeviceStatusChart />
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;