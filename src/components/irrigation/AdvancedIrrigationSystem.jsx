import { useState, useEffect } from 'react';
import { FaTint, FaCloudRain, FaClock, FaLeaf, FaChartLine, FaCalendarAlt, FaWrench, FaHistory, FaWater } from 'react-icons/fa';
import Card from '../common/Card';
import Button from '../common/Button';
import { ToggleButton } from '../common/Button';
import StatusIndicator from '../common/StatusIndicator';
import theme from '../../theme';
import { AreaChart, Area, LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, PieChart, Pie, Cell } from 'recharts';

/**
 * 高级灌溉系统模块
 * 用于精确控制果园灌溉系统，提供更多数据分析和智能控制功能
 */
const AdvancedIrrigationSystem = () => {
  // 灌溉区域状态
  const [irrigationZones, setIrrigationZones] = useState([
    { 
      id: 1, 
      name: '苹果区', 
      isActive: false, 
      moisture: 65, 
      lastWatered: '今天 08:30',
      schedule: { days: ['周一', '周三', '周五'], time: '07:00', duration: 30 },
      mode: 'auto',
      threshold: 40,
      waterUsage: 120, // 升/小时
      flowRate: 4.0, // 升/分钟
      efficiency: 85, // 效率百分比
      soilType: '砂质壤土',
      cropType: '苹果树',
      waterSavingMode: true,
    },
    { 
      id: 2, 
      name: '梨树区', 
      isActive: true, 
      moisture: 35, 
      lastWatered: '正在灌溉中',
      schedule: { days: ['周二', '周四', '周六'], time: '06:30', duration: 45 },
      mode: 'manual',
      threshold: 35,
      waterUsage: 150, // 升/小时
      flowRate: 5.0, // 升/分钟
      efficiency: 80, // 效率百分比
      soilType: '粘土',
      cropType: '梨树',
      waterSavingMode: false,
    },
    { 
      id: 3, 
      name: '葡萄区', 
      isActive: false, 
      moisture: 70, 
      lastWatered: '昨天 16:45',
      schedule: { days: ['周一', '周四'], time: '17:00', duration: 25 },
      mode: 'auto',
      threshold: 45,
      waterUsage: 90, // 升/小时
      flowRate: 3.0, // 升/分钟
      efficiency: 90, // 效率百分比
      soilType: '壤土',
      cropType: '葡萄',
      waterSavingMode: true,
    },
    { 
      id: 4, 
      name: '蔬菜区', 
      isActive: false, 
      moisture: 50, 
      lastWatered: '今天 06:15',
      schedule: { days: ['每天'], time: '06:00', duration: 20 },
      mode: 'auto',
      threshold: 50,
      waterUsage: 80, // 升/小时
      flowRate: 2.5, // 升/分钟
      efficiency: 95, // 效率百分比
      soilType: '腐殖土',
      cropType: '混合蔬菜',
      waterSavingMode: true,
    },
  ]);

  // 系统状态
  const [systemStatus, setSystemStatus] = useState({
    waterLevel: 85, // 水箱水位百分比
    pressure: 3.5,  // 水压 (bar)
    isEnabled: true, // 系统总开关
    waterQuality: 92, // 水质指数
    filterStatus: 'good', // 过滤器状态
    pumpHealth: 95, // 水泵健康度
    totalWaterUsage: 1250, // 总用水量（升）
    rainForecast: 30, // 降雨概率
    smartModeEnabled: true, // 智能模式
    maintenanceRequired: false, // 是否需要维护
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

  // 用水量数据（模拟）
  const waterUsageData = [
    { name: '苹果区', value: 120 },
    { name: '梨树区', value: 150 },
    { name: '葡萄区', value: 90 },
    { name: '蔬菜区', value: 80 },
  ];

  // 灌溉效率数据（模拟）
  const efficiencyData = [
    { name: '苹果区', efficiency: 85 },
    { name: '梨树区', efficiency: 80 },
    { name: '葡萄区', efficiency: 90 },
    { name: '蔬菜区', efficiency: 95 },
  ];

  // 每周用水量（模拟）
  const weeklyWaterUsage = [
    { day: '周一', usage: 420 },
    { day: '周二', usage: 380 },
    { day: '周三', usage: 450 },
    { day: '周四', usage: 400 },
    { day: '周五', usage: 480 },
    { day: '周六', usage: 350 },
    { day: '周日', usage: 300 },
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

  // 处理节水模式切换
  const handleWaterSavingToggle = (id) => {
    setIrrigationZones(prev => prev.map(zone => 
      zone.id === id ? { 
        ...zone, 
        waterSavingMode: !zone.waterSavingMode,
        // 节水模式下降低流量
        flowRate: !zone.waterSavingMode ? zone.flowRate * 0.8 : zone.flowRate * 1.25,
      } : zone
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

  // 处理智能模式切换
  const toggleSmartMode = () => {
    setSystemStatus(prev => ({
      ...prev,
      smartModeEnabled: !prev.smartModeEnabled
    }));
  };

  // 获取湿度状态颜色
  const getMoistureColor = (level, threshold) => {
    if (level >= threshold + 20) return theme.secondary.sky;
    if (level >= threshold) return theme.functional.success;
    if (level >= threshold - 10) return theme.functional.warning;
    return theme.functional.error;
  };

  // 获取效率状态颜色
  const getEfficiencyColor = (efficiency) => {
    if (efficiency >= 90) return theme.functional.success;
    if (efficiency >= 75) return theme.functional.warning;
    return theme.functional.error;
  };

  // 获取健康状态颜色
  const getHealthColor = (health) => {
    if (health >= 90) return theme.functional.success;
    if (health >= 70) return theme.functional.warning;
    return theme.functional.error;
  };

  // 饼图颜色
  const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042'];

  // 模拟灌溉计划更新
  const updateIrrigationSchedule = (id, days, time, duration) => {
    setIrrigationZones(prev => prev.map(zone => 
      zone.id === id ? { 
        ...zone, 
        schedule: { days, time, duration }
      } : zone
    ));
  };

  // 模拟系统维护请求
  const requestMaintenance = () => {
    alert('已安排系统维护，技术人员将于明天上午到达。');
    setSystemStatus(prev => ({
      ...prev,
      maintenanceRequired: false
    }));
  };

  return (
    <div>
      <h2 style={{ 
        color: theme.neutral.darkGrey,
        marginBottom: theme.spacing.lg,
        fontWeight: theme.typography.fontWeight.medium,
      }}>
        高级灌溉系统
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
            flexWrap: 'wrap',
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

            <div style={{ 
              marginRight: theme.spacing.xl,
              textAlign: 'center',
            }}>
              <div style={{ fontSize: theme.typography.fontSize.small, color: theme.neutral.grey }}>
                水质指数
              </div>
              <div style={{ 
                fontSize: theme.typography.fontSize.xlarge,
                fontWeight: theme.typography.fontWeight.bold,
                color: getHealthColor(systemStatus.waterQuality),
              }}>
                {systemStatus.waterQuality}%
              </div>
            </div>

            <div style={{ 
              marginRight: theme.spacing.xl,
              textAlign: 'center',
            }}>
              <div style={{ fontSize: theme.typography.fontSize.small, color: theme.neutral.grey }}>
                水泵健康度
              </div>
              <div style={{ 
                fontSize: theme.typography.fontSize.xlarge,
                fontWeight: theme.typography.fontWeight.bold,
                color: getHealthColor(systemStatus.pumpHealth),
              }}>
                {systemStatus.pumpHealth}%
              </div>
            </div>

            <div style={{ 
              marginRight: theme.spacing.xl,
              textAlign: 'center',
            }}>
              <div style={{ fontSize: theme.typography.fontSize.small, color: theme.neutral.grey }}>
                降雨概率
              </div>
              <div style={{ 
                fontSize: theme.typography.fontSize.xlarge,
                fontWeight: theme.typography.fontWeight.bold,
                color: systemStatus.rainForecast > 50 ? theme.secondary.sky : theme.neutral.darkGrey,
              }}>
                {systemStatus.rainForecast}%
              </div>
            </div>
          </div>
          
          <div style={{ 
            display: 'flex',
            alignItems: 'center',
            marginBottom: theme.spacing.md,
            flexWrap: 'wrap',
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
            <div style={{ marginLeft: theme.spacing.lg, marginRight: theme.spacing.xl }}>
              <ToggleButton 
                isOn={systemStatus.isEnabled} 
                onToggle={toggleSystem} 
              />
            </div>

            <div style={{ marginRight: theme.spacing.md }}>
              智能模式: 
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <StatusIndicator 
                status={systemStatus.smartModeEnabled ? 'active' : 'inactive'} 
                label={systemStatus.smartModeEnabled ? '已启用' : '已禁用'}
                size="large"
              />
            </div>
            <div style={{ marginLeft: theme.spacing.lg }}>
              <ToggleButton 
                isOn={systemStatus.smartModeEnabled} 
                onToggle={toggleSmartMode} 
              />
            </div>
          </div>
        </div>

        {systemStatus.maintenanceRequired && (
          <div style={{ 
            backgroundColor: theme.functional.warning + '20', // 半透明警告色
            padding: theme.spacing.md,
            borderRadius: theme.borderRadius.medium,
            marginTop: theme.spacing.md,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <FaWrench style={{ color: theme.functional.warning, marginRight: theme.spacing.sm }} />
              <span>系统需要维护：过滤器需要清洗</span>
            </div>
            <Button 
              type="warning"
              size="small"
              onClick={requestMaintenance}
            >
              安排维护
            </Button>
          </div>
        )}
      </Card>
      
      {/* 数据分析面板 */}
      <div style={{ 
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: theme.spacing.lg,
        marginTop: theme.spacing.xl,
        marginBottom: theme.spacing.xl,
      }}>
        {/* 湿度历史图表 */}
        <Card title="土壤湿度历史" icon={<FaChartLine />}>
          <div style={{ width: '100%', height: 250 }}>
            <ResponsiveContainer>
              <AreaChart
                data={moistureHistory}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area type="monotone" dataKey="zone1" name="苹果区" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
                <Area type="monotone" dataKey="zone2" name="梨树区" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.3} />
                <Area type="monotone" dataKey="zone3" name="葡萄区" stroke="#ffc658" fill="#ffc658" fillOpacity={0.3} />
                <Area type="monotone" dataKey="zone4" name="蔬菜区" stroke="#ff8042" fill="#ff8042" fillOpacity={0.3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* 用水量分析 */}
        <Card title="区域用水量分析" icon={<FaWater />}>
          <div style={{ width: '100%', height: 250, display: 'flex', justifyContent: 'center' }}>
            <ResponsiveContainer width="70%" height="100%">
              <PieChart>
                <Pie
                  data={waterUsageData}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {waterUsageData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value} 升/小时`, '用水量']} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* 每周用水量 */}
        <Card title="每周用水量趋势" icon={<FaHistory />}>
          <div style={{ width: '100%', height: 250 }}>
            <ResponsiveContainer>
              <BarChart
                data={weeklyWaterUsage}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip formatter={(value) => [`${value} 升`, '用水量']} />
                <Bar dataKey="usage" name="用水量" fill={theme.primary} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* 灌溉效率 */}
        <Card title="灌溉效率分析" icon={<FaChartLine />}>
          <div style={{ width: '100%', height: 250 }}>
            <ResponsiveContainer>
              <BarChart
                data={efficiencyData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                layout="vertical"
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" domain={[0, 100]} />
                <YAxis type="category" dataKey="name" />
                <Tooltip formatter={(value) => [`${value}%`, '效率']} />
                <Bar dataKey="efficiency" name="效率" fill={theme.secondary.sky}>
                  {efficiencyData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={getEfficiencyColor(entry.efficiency)} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
      
      {/* 灌溉区域卡片 */}
      <h3 style={{ 
        color: theme.neutral.darkGrey,
        marginBottom: theme.spacing.md,
        fontWeight: theme.typography.fontWeight.medium,
      }}>
        灌溉区域控制
      </h3>
      <div style={{ 
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
        gap: theme.spacing.lg,
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
                    流量
                  </div>
                  <div style={{ color: theme.neutral.darkGrey }}>
                    {zone.flowRate.toFixed(1)} 升/分钟
                  </div>
                </div>
                
                <div>
                  <div style={{ fontSize: theme.typography.fontSize.small, color: theme.neutral.grey }}>
                    土壤类型
                  </div>
                  <div style={{ color: theme.neutral.darkGrey }}>
                    {zone.soilType}
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
                    {zone.schedule.days.join(', ')} {zone.schedule.time} ({zone.schedule.duration}分钟)
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
                    节水模式
                  </div>
                </div>
                <ToggleButton 
                  isOn={zone.waterSavingMode} 
                  onToggle={() => handleWaterSavingToggle(zone.id)} 
                  onColor={theme.secondary.sky}
                  disabled={!systemStatus.isEnabled}
                />
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

                <Button 
                  type="secondary"
                  size="small"
                  icon={<FaCalendarAlt />}
                  onClick={() => alert(`编辑灌溉计划: ${zone.name}`)}
                  disabled={!systemStatus.isEnabled}
                >
                  计划
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdvancedIrrigationSystem;