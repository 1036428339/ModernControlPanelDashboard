import { useState } from 'react';
import { FaTint, FaCloudRain, FaClock, FaLeaf, FaChartLine } from 'react-icons/fa';
import Card from '../common/Card';
import Button from '../common/Button';
import { ToggleButton } from '../common/Button';
import StatusIndicator from '../common/StatusIndicator';
import theme from '../../theme';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

/**
 * 灌溉系统模块
 * 用于控制果园灌溉系统
 */
const IrrigationSystem = () => {
  // 灌溉区域状态
  const [irrigationZones, setIrrigationZones] = useState([
    { 
      id: 1, 
      name: '苹果区', 
      isActive: false, 
      moisture: 65, 
      lastWatered: '今天 08:30',
      schedule: { days: ['周一', '周三', '周五'], time: '07:00' },
      mode: 'auto',
      threshold: 40,
    },
    { 
      id: 2, 
      name: '梨树区', 
      isActive: true, 
      moisture: 35, 
      lastWatered: '正在灌溉中',
      schedule: { days: ['周二', '周四', '周六'], time: '06:30' },
      mode: 'manual',
      threshold: 35,
    },
    { 
      id: 3, 
      name: '葡萄区', 
      isActive: false, 
      moisture: 70, 
      lastWatered: '昨天 16:45',
      schedule: { days: ['周一', '周四'], time: '17:00' },
      mode: 'auto',
      threshold: 45,
    },
    { 
      id: 4, 
      name: '蔬菜区', 
      isActive: false, 
      moisture: 50, 
      lastWatered: '今天 06:15',
      schedule: { days: ['每天'], time: '06:00' },
      mode: 'auto',
      threshold: 50,
    },
  ]);

  // 系统状态
  const [systemStatus, setSystemStatus] = useState({
    waterLevel: 85, // 水箱水位百分比
    pressure: 3.5,  // 水压 (bar)
    isEnabled: true, // 系统总开关
  });

  // 湿度历史数据（模拟）
  const moistureHistory = [
    { time: '00:00', zone1: 60, zone2: 55, zone3: 65, zone4: 45 },
    { time: '04:00', zone1: 55, zone2: 50, zone3: 60, zone4: 40 },
    { time: '08:00', zone1: 65, zone2: 35, zone3: 70, zone4: 50 },
    { time: '12:00', zone1: 60, zone2: 40, zone3: 65, zone4: 45 },
    { time: '16:00', zone1: 55, zone2: 45, zone3: 60, zone4: 40 },
    { time: '20:00', zone1: 50, zone2: 40, zone3: 55, zone4: 35 },
    { time: '现在', zone1: 65, zone2: 35, zone3: 70, zone4: 50 },
  ];

  // 处理灌溉开关
  const handleToggleIrrigation = (id) => {
    setIrrigationZones(prev => prev.map(zone => 
      zone.id === id ? { 
        ...zone, 
        isActive: !zone.isActive,
        lastWatered: !zone.isActive ? '正在灌溉中' : new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      } : zone
    ));
  };

  // 处理模式切换
  const handleModeChange = (id, mode) => {
    setIrrigationZones(prev => prev.map(zone => 
      zone.id === id ? { ...zone, mode } : zone
    ));
  };

  // 处理阈值调整
  const handleThresholdChange = (id, value) => {
    setIrrigationZones(prev => prev.map(zone => 
      zone.id === id ? { ...zone, threshold: value } : zone
    ));
  };

  // 处理系统总开关
  const toggleSystem = () => {
    setSystemStatus(prev => ({
      ...prev,
      isEnabled: !prev.isEnabled
    }));
    
    // 如果系统关闭，停止所有灌溉
    if (systemStatus.isEnabled) {
      setIrrigationZones(prev => prev.map(zone => ({
        ...zone,
        isActive: false,
        lastWatered: zone.isActive ? new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : zone.lastWatered,
      })));
    }
  };

  // 获取湿度状态颜色
  const getMoistureColor = (level, threshold) => {
    if (level >= threshold + 20) return theme.secondary.sky;
    if (level >= threshold) return theme.functional.success;
    if (level >= threshold - 10) return theme.functional.warning;
    return theme.functional.error;
  };

  return (
    <div>
      <h2 style={{ 
        color: theme.neutral.darkGrey,
        marginBottom: theme.spacing.lg,
        fontWeight: theme.typography.fontWeight.medium,
      }}>
        灌溉系统
      </h2>
      
      {/* 系统状态面板 */}
      <Card 
        title="系统状态" 
        icon={<FaTint />}
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
            <div style={{ 
              marginRight: theme.spacing.xl,
              textAlign: 'center',
            }}>
              <div style={{ fontSize: theme.typography.fontSize.small, color: theme.neutral.grey }}>
                水箱水位
              </div>
              <div style={{ 
                fontSize: theme.typography.fontSize.xlarge,
                fontWeight: theme.typography.fontWeight.bold,
                color: systemStatus.waterLevel > 20 ? theme.secondary.sky : theme.functional.error,
              }}>
                {systemStatus.waterLevel}%
              </div>
            </div>
            
            <div style={{ 
              marginRight: theme.spacing.xl,
              textAlign: 'center',
            }}>
              <div style={{ fontSize: theme.typography.fontSize.small, color: theme.neutral.grey }}>
                系统水压
              </div>
              <div style={{ 
                fontSize: theme.typography.fontSize.xlarge,
                fontWeight: theme.typography.fontWeight.bold,
                color: theme.neutral.darkGrey,
              }}>
                {systemStatus.pressure} bar
              </div>
            </div>
          </div>
          
          <div style={{ 
            display: 'flex',
            alignItems: 'center',
            marginBottom: theme.spacing.md,
          }}>
            <div style={{ marginRight: theme.spacing.md }}>
              系统状态: 
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <StatusIndicator 
                status={systemStatus.isEnabled ? 'active' : 'inactive'} 
                label={systemStatus.isEnabled ? '已启用' : '已禁用'}
                size="large"
              />
            </div>
            <div style={{ marginLeft: theme.spacing.lg }}>
              <ToggleButton 
                isOn={systemStatus.isEnabled} 
                onToggle={toggleSystem} 
              />
            </div>
          </div>
        </div>
      </Card>
      
      {/* 灌溉区域卡片 */}
      <div style={{ 
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: theme.spacing.lg,
        marginTop: theme.spacing.xl,
        marginBottom: theme.spacing.xl,
      }}>
        {irrigationZones.map((zone) => (
          <Card 
            key={zone.id}
            title={zone.name}
            icon={<FaLeaf />}
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
                    土壤湿度
                  </div>
                  <div style={{ 
                    fontSize: theme.typography.fontSize.xlarge,
                    fontWeight: theme.typography.fontWeight.bold,
                    color: getMoistureColor(zone.moisture, zone.threshold),
                  }}>
                    {zone.moisture}%
                  </div>
                </div>
                
                <div>
                  <div style={{ fontSize: theme.typography.fontSize.small, color: theme.neutral.grey }}>
                    灌溉状态
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <StatusIndicator 
                      status={zone.isActive ? 'active' : 'inactive'} 
                      label={zone.isActive ? '灌溉中' : '待机中'}
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
                    上次灌溉
                  </div>
                  <div style={{ color: theme.neutral.darkGrey }}>
                    {zone.lastWatered}
                  </div>
                </div>
                
                <div>
                  <div style={{ fontSize: theme.typography.fontSize.small, color: theme.neutral.grey }}>
                    灌溉模式
                  </div>
                  <div style={{ color: theme.neutral.darkGrey }}>
                    {zone.mode === 'auto' ? '自动' : '手动'}
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
                    灌溉计划
                  </div>
                  <div style={{ color: theme.neutral.darkGrey, display: 'flex', alignItems: 'center' }}>
                    <FaClock style={{ marginRight: theme.spacing.xs, fontSize: '0.8rem' }} />
                    {zone.schedule.days.join(', ')} {zone.schedule.time}
                  </div>
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
                  onClick={() => handleToggleIrrigation(zone.id)}
                  disabled={!systemStatus.isEnabled}
                >
                  {zone.isActive ? '停止' : '开始'}
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
      
      {/* 湿度历史图表 */}
      <Card title="土壤湿度历史" icon={<FaChartLine />}>
        <div style={{ width: '100%', height: 300 }}>
          <ResponsiveContainer>
            <AreaChart
              data={moistureHistory}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="zone1" name="苹果区" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
              <Area type="monotone" dataKey="zone2" name="梨树区" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.3} />
              <Area type="monotone" dataKey="zone3" name="葡萄区" stroke="#ffc658" fill="#ffc658" fillOpacity={0.3} />
              <Area type="monotone" dataKey="zone4" name="蔬菜区" stroke="#ff8042" fill="#ff8042" fillOpacity={0.3} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
};

export default IrrigationSystem;