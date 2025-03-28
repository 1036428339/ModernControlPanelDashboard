import { useState } from 'react';
import { FaThermometerHalf, FaWind, FaCloud, FaChartLine } from 'react-icons/fa';
import Card from '../common/Card';
import Button from '../common/Button';
import { ToggleButton } from '../common/Button';
import StatusIndicator from '../common/StatusIndicator';
import theme from '../../theme';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

/**
 * 气候控制模块
 * 用于控制果园气候环境
 */
const ClimateControl = () => {
  // 气候区域状态
  const [climateZones, setClimateZones] = useState([
    { 
      id: 1, 
      name: '主温室', 
      isActive: true, 
      temperature: 24, 
      targetTemperature: 25,
      humidity: 65,
      targetHumidity: 70,
      mode: 'auto',
    },
    { 
      id: 2, 
      name: '育苗区', 
      isActive: true, 
      temperature: 26, 
      targetTemperature: 26,
      humidity: 75,
      targetHumidity: 75,
      mode: 'auto',
    },
    { 
      id: 3, 
      name: '仓储区', 
      isActive: false, 
      temperature: 18, 
      targetTemperature: 18,
      humidity: 50,
      targetHumidity: 50,
      mode: 'manual',
    },
    { 
      id: 4, 
      name: '办公区', 
      isActive: true, 
      temperature: 22, 
      targetTemperature: 22,
      humidity: 55,
      targetHumidity: 55,
      mode: 'auto',
    },
  ]);

  // 系统状态
  const [systemStatus, setSystemStatus] = useState({
    isEnabled: true, // 系统总开关
    ecoMode: true, // 节能模式
    currentMode: 'auto', // auto, manual
  });

  // 温度历史数据（模拟）
  const temperatureHistory = [
    { time: '00:00', zone1: 23, zone2: 25, zone3: 17, zone4: 21 },
    { time: '04:00', zone1: 22, zone2: 24, zone3: 17, zone4: 20 },
    { time: '08:00', zone1: 24, zone2: 26, zone3: 18, zone4: 22 },
    { time: '12:00', zone1: 25, zone2: 27, zone3: 19, zone4: 23 },
    { time: '16:00', zone1: 24, zone2: 26, zone3: 18, zone4: 22 },
    { time: '20:00', zone1: 23, zone2: 25, zone3: 18, zone4: 21 },
    { time: '现在', zone1: 24, zone2: 26, zone3: 18, zone4: 22 },
  ];

  // 处理温度调整
  const handleTemperatureChange = (id, value) => {
    setClimateZones(prev => prev.map(zone => 
      zone.id === id ? { ...zone, targetTemperature: value } : zone
    ));
  };

  // 处理湿度调整
  const handleHumidityChange = (id, value) => {
    setClimateZones(prev => prev.map(zone => 
      zone.id === id ? { ...zone, targetHumidity: value } : zone
    ));
  };

  // 处理模式切换
  const handleModeChange = (id, mode) => {
    setClimateZones(prev => prev.map(zone => 
      zone.id === id ? { ...zone, mode } : zone
    ));
  };

  // 处理系统开关
  const handleToggleSystem = (id) => {
    setClimateZones(prev => prev.map(zone => 
      zone.id === id ? { ...zone, isActive: !zone.isActive } : zone
    ));
  };

  // 处理系统总开关
  const toggleSystem = () => {
    setSystemStatus(prev => ({
      ...prev,
      isEnabled: !prev.isEnabled
    }));
    
    // 如果系统关闭，停止所有区域
    if (systemStatus.isEnabled) {
      setClimateZones(prev => prev.map(zone => ({
        ...zone,
        isActive: false,
      })));
    }
  };

  // 处理节能模式
  const toggleEcoMode = () => {
    setSystemStatus(prev => ({
      ...prev,
      ecoMode: !prev.ecoMode
    }));
    
    // 如果开启节能模式，调整目标温度
    if (!systemStatus.ecoMode) {
      setClimateZones(prev => prev.map(zone => ({
        ...zone,
        targetTemperature: zone.targetTemperature - 2, // 降低目标温度
      })));
    } else {
      // 如果关闭节能模式，恢复目标温度
      setClimateZones(prev => prev.map(zone => ({
        ...zone,
        targetTemperature: zone.targetTemperature + 2, // 提高目标温度
      })));
    }
  };

  // 获取温度状态颜色
  const getTemperatureColor = (current, target) => {
    const diff = Math.abs(current - target);
    if (diff <= 0.5) return theme.functional.success;
    if (diff <= 2) return theme.functional.warning;
    return theme.functional.error;
  };

  return (
    <div>
      <h2 style={{ 
        color: theme.neutral.darkGrey,
        marginBottom: theme.spacing.lg,
        fontWeight: theme.typography.fontWeight.medium,
      }}>
        气候控制
      </h2>
      
      {/* 系统状态面板 */}
      <Card 
        title="系统状态" 
        icon={<FaThermometerHalf />}
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
              status={systemStatus.ecoMode ? 'active' : 'inactive'} 
              label={systemStatus.ecoMode ? '已启用' : '已禁用'}
            />
            <div style={{ marginLeft: theme.spacing.lg }}>
              <ToggleButton 
                isOn={systemStatus.ecoMode} 
                onToggle={toggleEcoMode} 
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
            type={systemStatus.currentMode === 'auto' ? 'primary' : 'secondary'}
            size="small"
            onClick={() => setSystemStatus(prev => ({ ...prev, currentMode: 'auto' }))}
            disabled={!systemStatus.isEnabled}
          >
            自动模式
          </Button>
          
          <Button 
            type={systemStatus.currentMode === 'manual' ? 'primary' : 'secondary'}
            size="small"
            onClick={() => setSystemStatus(prev => ({ ...prev, currentMode: 'manual' }))}
            disabled={!systemStatus.isEnabled}
          >
            手动模式
          </Button>
        </div>
      </Card>
      
      {/* 气候区域卡片 */}
      <div style={{ 
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: theme.spacing.lg,
        marginTop: theme.spacing.xl,
        marginBottom: theme.spacing.xl,
      }}>
        {climateZones.map((zone) => (
          <Card 
            key={zone.id}
            title={zone.name}
            icon={<FaThermometerHalf />}
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
                    当前温度
                  </div>
                  <div style={{ 
                    fontSize: theme.typography.fontSize.xlarge,
                    fontWeight: theme.typography.fontWeight.bold,
                    color: getTemperatureColor(zone.temperature, zone.targetTemperature),
                  }}>
                    {zone.temperature}°C
                  </div>
                </div>
                
                <div>
                  <div style={{ fontSize: theme.typography.fontSize.small, color: theme.neutral.grey }}>
                    目标温度
                  </div>
                  <div style={{ 
                    fontSize: theme.typography.fontSize.large,
                    fontWeight: theme.typography.fontWeight.medium,
                    color: theme.neutral.darkGrey,
                  }}>
                    {zone.targetTemperature}°C
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
                    当前湿度
                  </div>
                  <div style={{ 
                    fontSize: theme.typography.fontSize.large,
                    fontWeight: theme.typography.fontWeight.medium,
                    color: theme.secondary.sky,
                  }}>
                    {zone.humidity}%
                  </div>
                </div>
                
                <div>
                  <div style={{ fontSize: theme.typography.fontSize.small, color: theme.neutral.grey }}>
                    目标湿度
                  </div>
                  <div style={{ 
                    fontSize: theme.typography.fontSize.medium,
                    color: theme.neutral.darkGrey,
                  }}>
                    {zone.targetHumidity}%
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
                    控制模式
                  </div>
                  <div style={{ color: theme.neutral.darkGrey }}>
                    {zone.mode === 'auto' ? '自动' : '手动'}
                  </div>
                </div>
                
                <div>
                  <div style={{ fontSize: theme.typography.fontSize.small, color: theme.neutral.grey }}>
                    系统状态
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <StatusIndicator 
                      status={zone.isActive ? 'active' : 'inactive'} 
                      label={zone.isActive ? '运行中' : '已停止'}
                    />
                  </div>
                </div>
              </div>
              
              {/* 温度调节 */}
              <div style={{ marginTop: theme.spacing.md }}>
                <div style={{ fontSize: theme.typography.fontSize.small, color: theme.neutral.grey, marginBottom: theme.spacing.xs }}>
                  温度调节
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <button 
                    style={{
                      backgroundColor: theme.functional.error,
                      color: theme.neutral.white,
                      border: 'none',
                      borderRadius: theme.borderRadius.small,
                      width: '30px',
                      height: '30px',
                      fontSize: theme.typography.fontSize.medium,
                      cursor: 'pointer',
                    }}
                    onClick={() => handleTemperatureChange(zone.id, zone.targetTemperature - 1)}
                    disabled={!systemStatus.isEnabled || !zone.isActive}
                  >
                    -
                  </button>
                  <input 
                    type="range" 
                    min="16" 
                    max="30" 
                    value={zone.targetTemperature} 
                    onChange={(e) => handleTemperatureChange(zone.id, parseInt(e.target.value))} 
                    disabled={!systemStatus.isEnabled || !zone.isActive}
                    style={{ flex: 1, margin: `0 ${theme.spacing.sm}` }}
                  />
                  <button 
                    style={{
                      backgroundColor: theme.functional.success,
                      color: theme.neutral.white,
                      border: 'none',
                      borderRadius: theme.borderRadius.small,
                      width: '30px',
                      height: '30px',
                      fontSize: theme.typography.fontSize.medium,
                      cursor: 'pointer',
                    }}
                    onClick={() => handleTemperatureChange(zone.id, zone.targetTemperature + 1)}
                    disabled={!systemStatus.isEnabled || !zone.isActive}
                  >
                    +
                  </button>
                </div>
              </div>
              
              {/* 湿度调节 */}
              <div style={{ marginTop: theme.spacing.md }}>
                <div style={{ fontSize: theme.typography.fontSize.small, color: theme.neutral.grey, marginBottom: theme.spacing.xs }}>
                  湿度调节
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <button 
                    style={{
                      backgroundColor: theme.secondary.sky,
                      color: theme.neutral.white,
                      border: 'none',
                      borderRadius: theme.borderRadius.small,
                      width: '30px',
                      height: '30px',
                      fontSize: theme.typography.fontSize.medium,
                      cursor: 'pointer',
                    }}
                    onClick={() => handleHumidityChange(zone.id, zone.targetHumidity - 5)}
                    disabled={!systemStatus.isEnabled || !zone.isActive}
                  >
                    -
                  </button>
                  <input 
                    type="range" 
                    min="30" 
                    max="90" 
                    step="5"
                    value={zone.targetHumidity} 
                    onChange={(e) => handleHumidityChange(zone.id, parseInt(e.target.value))} 
                    disabled={!systemStatus.isEnabled || !zone.isActive}
                    style={{ flex: 1, margin: `0 ${theme.spacing.sm}` }}
                  />
                  <button 
                    style={{
                      backgroundColor: theme.secondary.sky,
                      color: theme.neutral.white,
                      border: 'none',
                      borderRadius: theme.borderRadius.small,
                      width: '30px',
                      height: '30px',
                      fontSize: theme.typography.fontSize.medium,
                      cursor: 'pointer',
                    }}
                    onClick={() => handleHumidityChange(zone.id, zone.targetHumidity + 5)}
                    disabled={!systemStatus.isEnabled || !zone.isActive}
                  >
                    +
                  </button>
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
                  type={zone.isActive ? 'error' : 'success'}
                  size="small"
                  onClick={() => handleToggleSystem(zone.id)}
                  disabled={!systemStatus.isEnabled}
                >
                  {zone.isActive ? '停止' : '启动'}
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
      
      {/* 温度历史图表 */}
      <Card title="温度历史" icon={<FaChartLine />}>
        <div style={{ width: '100%', height: 300 }}>
          <ResponsiveContainer>
            <LineChart
              data={temperatureHistory}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="zone1" 
                name="主温室" 
                stroke="#8884d8" 
                activeDot={{ r: 8 }} 
              />
              <Line 
                type="monotone" 
                dataKey="zone2" 
                name="育苗区" 
                stroke="#82ca9d" 
              />
              <Line 
                type="monotone" 
                dataKey="zone3" 
                name="仓储区" 
                stroke="#ffc658" 
              />
              <Line 
                type="monotone" 
                dataKey="zone4" 
                name="办公区" 
                stroke="#ff8042" 
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
};

export default ClimateControl;