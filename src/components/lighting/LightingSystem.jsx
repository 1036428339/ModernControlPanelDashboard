import { useState } from 'react';
import { FaLightbulb, FaSun, FaMoon, FaClock, FaChartLine } from 'react-icons/fa';
import Card from '../common/Card';
import Button from '../common/Button';
import { ToggleButton } from '../common/Button';
import StatusIndicator from '../common/StatusIndicator';
import theme from '../../theme';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

/**
 * 灯光系统模块
 * 用于控制果园灯光系统
 */
const LightingSystem = () => {
  // 灯光区域状态
  const [lightingZones, setLightingZones] = useState([
    { 
      id: 1, 
      name: '主区域', 
      isOn: true, 
      brightness: 75, 
      color: '#FFEB3B', // 暖黄色
      mode: 'auto',
      schedule: { on: '06:00', off: '19:00' },
    },
    { 
      id: 2, 
      name: '育苗区', 
      isOn: true, 
      brightness: 85, 
      color: '#8BC34A', // 绿色
      mode: 'manual',
      schedule: { on: '05:30', off: '20:00' },
    },
    { 
      id: 3, 
      name: '仓储区', 
      isOn: false, 
      brightness: 60, 
      color: '#FFFFFF', // 白色
      mode: 'auto',
      schedule: { on: '07:00', off: '18:00' },
    },
    { 
      id: 4, 
      name: '办公区', 
      isOn: false, 
      brightness: 70, 
      color: '#FFF9C4', // 淡黄色
      mode: 'auto',
      schedule: { on: '08:00', off: '17:00' },
    },
  ]);

  // 系统状态
  const [systemStatus, setSystemStatus] = useState({
    isEnabled: true, // 系统总开关
    energySaving: true, // 节能模式
    currentMode: 'day', // day, night, custom
  });

  // 能耗历史数据（模拟）
  const energyHistory = [
    { time: '周一', consumption: 42 },
    { time: '周二', consumption: 38 },
    { time: '周三', consumption: 45 },
    { time: '周四', consumption: 40 },
    { time: '周五', consumption: 35 },
    { time: '周六', consumption: 30 },
    { time: '周日', consumption: 28 },
  ];

  // 处理灯光开关
  const handleToggleLight = (id) => {
    setLightingZones(prev => prev.map(zone => 
      zone.id === id ? { ...zone, isOn: !zone.isOn } : zone
    ));
  };

  // 处理亮度调整
  const handleBrightnessChange = (id, value) => {
    setLightingZones(prev => prev.map(zone => 
      zone.id === id ? { ...zone, brightness: value } : zone
    ));
  };

  // 处理模式切换
  const handleModeChange = (id, mode) => {
    setLightingZones(prev => prev.map(zone => 
      zone.id === id ? { ...zone, mode } : zone
    ));
  };

  // 处理系统总开关
  const toggleSystem = () => {
    setSystemStatus(prev => ({
      ...prev,
      isEnabled: !prev.isEnabled
    }));
    
    // 如果系统关闭，关闭所有灯光
    if (systemStatus.isEnabled) {
      setLightingZones(prev => prev.map(zone => ({
        ...zone,
        isOn: false,
      })));
    }
  };

  // 处理节能模式
  const toggleEnergySaving = () => {
    setSystemStatus(prev => ({
      ...prev,
      energySaving: !prev.energySaving
    }));
    
    // 如果开启节能模式，降低所有灯光亮度
    if (!systemStatus.energySaving) {
      setLightingZones(prev => prev.map(zone => ({
        ...zone,
        brightness: Math.max(zone.brightness - 20, 30), // 降低亮度但不低于30%
      })));
    } else {
      // 如果关闭节能模式，恢复灯光亮度
      setLightingZones(prev => prev.map(zone => ({
        ...zone,
        brightness: Math.min(zone.brightness + 20, 100), // 提高亮度但不超过100%
      })));
    }
  };

  // 处理日/夜模式切换
  const changeSystemMode = (mode) => {
    setSystemStatus(prev => ({
      ...prev,
      currentMode: mode
    }));
    
    // 根据模式调整灯光
    switch (mode) {
      case 'day':
        setLightingZones(prev => prev.map(zone => ({
          ...zone,
          brightness: 75,
          color: '#FFEB3B', // 暖黄色
        })));
        break;
      case 'night':
        setLightingZones(prev => prev.map(zone => ({
          ...zone,
          brightness: 40,
          color: '#FFF9C4', // 淡黄色
        })));
        break;
      default:
        break;
    }
  };

  // 获取颜色样式
  const getColorStyle = (color) => {
    return {
      backgroundColor: color,
      width: '20px',
      height: '20px',
      borderRadius: '50%',
      display: 'inline-block',
      border: '1px solid #ddd',
    };
  };

  return (
    <div>
      <h2 style={{ 
        color: theme.neutral.darkGrey,
        marginBottom: theme.spacing.lg,
        fontWeight: theme.typography.fontWeight.medium,
      }}>
        灯光系统
      </h2>
      
      {/* 系统状态面板 */}
      <Card 
        title="系统状态" 
        icon={<FaLightbulb />}
        minHeight="120px"
      >
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
            <div style={{ marginRight: theme.spacing.xl }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ marginRight: theme.spacing.md }}>
                  系统状态: 
                </div>
                <StatusIndicator 
                  status={systemStatus.isEnabled ? 'active' : 'inactive'} 
                  label={systemStatus.isEnabled ? '已启用' : '已禁用'}
                  size="large"
                />
                <div style={{ marginLeft: theme.spacing.lg }}>
                  <ToggleButton 
                    isOn={systemStatus.isEnabled} 
                    onToggle={toggleSystem} 
                  />
                </div>
              </div>
            </div>
          </div>
          
          <div style={{ 
            display: 'flex',
            alignItems: 'center',
            marginBottom: theme.spacing.md,
          }}>
            <div style={{ marginRight: theme.spacing.md }}>
              节能模式: 
            </div>
            <StatusIndicator 
              status={systemStatus.energySaving ? 'active' : 'inactive'} 
              label={systemStatus.energySaving ? '已启用' : '已禁用'}
            />
            <div style={{ marginLeft: theme.spacing.lg }}>
              <ToggleButton 
                isOn={systemStatus.energySaving} 
                onToggle={toggleEnergySaving} 
                disabled={!systemStatus.isEnabled}
              />
            </div>
          </div>
        </div>
        
        <div style={{ 
          marginTop: theme.spacing.lg,
          display: 'flex',
          justifyContent: 'center',
          gap: theme.spacing.md,
        }}>
          <Button 
            type={systemStatus.currentMode === 'day' ? 'primary' : 'secondary'}
            size="small"
            icon={<FaSun />}
            onClick={() => changeSystemMode('day')}
            disabled={!systemStatus.isEnabled}
          >
            日间模式
          </Button>
          
          <Button 
            type={systemStatus.currentMode === 'night' ? 'primary' : 'secondary'}
            size="small"
            icon={<FaMoon />}
            onClick={() => changeSystemMode('night')}
            disabled={!systemStatus.isEnabled}
          >
            夜间模式
          </Button>
          
          <Button 
            type={systemStatus.currentMode === 'custom' ? 'primary' : 'secondary'}
            size="small"
            onClick={() => changeSystemMode('custom')}
            disabled={!systemStatus.isEnabled}
          >
            自定义模式
          </Button>
        </div>
      </Card>
      
      {/* 灯光区域卡片 */}
      <div style={{ 
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: theme.spacing.lg,
        marginTop: theme.spacing.xl,
        marginBottom: theme.spacing.xl,
      }}>
        {lightingZones.map((zone) => (
          <Card 
            key={zone.id}
            title={zone.name}
            icon={<FaLightbulb />}
          >
            <div style={{ padding: theme.spacing.sm }}>
              <div style={{ 
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: theme.spacing.md,
              }}>
                <div>
                  <div style={{ fontSize: theme.typography.fontSize.small, color: theme.neutral.grey }}>
                    亮度
                  </div>
                  <div style={{ 
                    fontSize: theme.typography.fontSize.xlarge,
                    fontWeight: theme.typography.fontWeight.bold,
                    color: theme.neutral.darkGrey,
                  }}>
                    {zone.brightness}%
                  </div>
                </div>
                
                <div>
                  <div style={{ fontSize: theme.typography.fontSize.small, color: theme.neutral.grey }}>
                    状态
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <StatusIndicator 
                      status={zone.isOn ? 'active' : 'inactive'} 
                      label={zone.isOn ? '已开启' : '已关闭'}
                    />
                  </div>
                </div>
              </div>
              
              <div style={{ 
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: theme.spacing.md,
              }}>
                <div>
                  <div style={{ fontSize: theme.typography.fontSize.small, color: theme.neutral.grey }}>
                    灯光颜色
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div style={getColorStyle(zone.color)}></div>
                    <span style={{ marginLeft: theme.spacing.sm, color: theme.neutral.darkGrey }}>
                      {zone.color}
                    </span>
                  </div>
                </div>
                
                <div>
                  <div style={{ fontSize: theme.typography.fontSize.small, color: theme.neutral.grey }}>
                    控制模式
                  </div>
                  <div style={{ color: theme.neutral.darkGrey }}>
                    {zone.mode === 'auto' ? '自动' : '手动'}
                  </div>
                </div>
              </div>
              
              <div style={{ 
                marginBottom: theme.spacing.md,
              }}>
                <div style={{ fontSize: theme.typography.fontSize.small, color: theme.neutral.grey }}>
                  定时计划
                </div>
                <div style={{ color: theme.neutral.darkGrey, display: 'flex', alignItems: 'center' }}>
                  <FaClock style={{ marginRight: theme.spacing.xs, fontSize: '0.8rem' }} />
                  开启: {zone.schedule.on} | 关闭: {zone.schedule.off}
                </div>
              </div>
              
              <div style={{ 
                display: 'flex',
                justifyContent: 'space-between',
                marginTop: theme.spacing.lg,
              }}>
                <Button 
                  type={zone.mode === 'auto' ? 'primary' : 'secondary'}
                  size="small"
                  onClick={() => handleModeChange(zone.id, 'auto')}
                  disabled={!systemStatus.isEnabled}
                >
                  自动
                </Button>
                
                <Button 
                  type={zone.mode === 'manual' ? 'primary' : 'secondary'}
                  size="small"
                  onClick={() => handleModeChange(zone.id, 'manual')}
                  disabled={!systemStatus.isEnabled}
                >
                  手动
                </Button>
                
                <Button 
                  type={zone.isOn ? 'error' : 'success'}
                  size="small"
                  onClick={() => handleToggleLight(zone.id)}
                  disabled={!systemStatus.isEnabled}
                >
                  {zone.isOn ? '关闭' : '开启'}
                </Button>
              </div>
              
              {/* 亮度调节滑块 */}
              <div style={{ marginTop: theme.spacing.md }}>
                <div style={{ fontSize: theme.typography.fontSize.small, color: theme.neutral.grey, marginBottom: theme.spacing.xs }}>
                  亮度调节
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  value={zone.brightness} 
                  onChange={(e) => handleBrightnessChange(zone.id, parseInt(e.target.value))} 
                  disabled={!systemStatus.isEnabled || !zone.isOn}
                  style={{ width: '100%' }}
                />
              </div>
            </div>
          </Card>
        ))}
      </div>
      
      {/* 能耗历史图表 */}
      <Card title="能耗历史" icon={<FaChartLine />}>
        <div style={{ width: '100%', height: 300 }}>
          <ResponsiveContainer>
            <LineChart
              data={energyHistory}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="consumption" 
                name="能耗 (kWh)" 
                stroke={theme.functional.info} 
                activeDot={{ r: 8 }} 
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
};

export default LightingSystem;