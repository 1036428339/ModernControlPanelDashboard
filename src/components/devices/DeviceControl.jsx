import { useState } from 'react';
import { FaTablet, FaWifi, FaBatteryThreeQuarters, FaPlus, FaTrash, FaPen, FaChartLine } from 'react-icons/fa';
import Card from '../common/Card';
import Button from '../common/Button';
import StatusIndicator from '../common/StatusIndicator';
import theme from '../../theme';

/**
 * 设备管理模块
 * 用于管理和监控果园智能设备
 */
const DeviceControl = () => {
  // 设备列表
  const [devices, setDevices] = useState([
    { 
      id: 1, 
      name: '温度传感器-A1', 
      type: '传感器',
      location: '苹果区',
      status: 'online',
      battery: 85,
      lastActive: '5分钟前',
      signalStrength: 90,
    },
    { 
      id: 2, 
      name: '灌溉控制器-B2', 
      type: '控制器',
      location: '梨树区',
      status: 'online',
      battery: 72,
      lastActive: '正在活动',
      signalStrength: 85,
    },
    { 
      id: 3, 
      name: '光照传感器-C3', 
      type: '传感器',
      location: '葡萄区',
      status: 'offline',
      battery: 15,
      lastActive: '2小时前',
      signalStrength: 0,
    },
    { 
      id: 4, 
      name: '湿度传感器-D4', 
      type: '传感器',
      location: '蔬菜区',
      status: 'warning',
      battery: 45,
      lastActive: '10分钟前',
      signalStrength: 60,
    },
    { 
      id: 5, 
      name: '摄像头-E5', 
      type: '监控',
      location: '主仓库',
      status: 'online',
      battery: 90,
      lastActive: '正在活动',
      signalStrength: 95,
    },
  ]);

  // 设备类型筛选
  const [filter, setFilter] = useState('all');
  
  // 设备详情
  const [selectedDevice, setSelectedDevice] = useState(null);

  // 处理设备选择
  const handleSelectDevice = (device) => {
    setSelectedDevice(device);
  };

  // 处理设备删除
  const handleDeleteDevice = (id) => {
    setDevices(prev => prev.filter(device => device.id !== id));
    if (selectedDevice && selectedDevice.id === id) {
      setSelectedDevice(null);
    }
  };

  // 处理设备添加
  const handleAddDevice = () => {
    const newDevice = {
      id: devices.length + 1,
      name: `新设备-${devices.length + 1}`,
      type: '未分类',
      location: '未设置',
      status: 'offline',
      battery: 100,
      lastActive: '从未活动',
      signalStrength: 0,
    };
    setDevices(prev => [...prev, newDevice]);
  };

  // 获取信号强度图标样式
  const getSignalStrengthStyle = (strength) => {
    if (strength >= 80) return { color: theme.functional.success };
    if (strength >= 50) return { color: theme.functional.warning };
    return { color: theme.functional.error };
  };

  // 获取电池图标样式
  const getBatteryStyle = (level) => {
    if (level >= 60) return { color: theme.functional.success };
    if (level >= 30) return { color: theme.functional.warning };
    return { color: theme.functional.error };
  };

  // 筛选设备
  const filteredDevices = filter === 'all' 
    ? devices 
    : devices.filter(device => device.type === filter);

  return (
    <div>
      <h2 style={{ 
        color: theme.neutral.darkGrey,
        marginBottom: theme.spacing.lg,
        fontWeight: theme.typography.fontWeight.medium,
      }}>
        设备管理
      </h2>
      
      {/* 设备控制面板 */}
      <Card 
        title="设备控制" 
        icon={<FaTablet />}
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
              <div style={{ fontSize: theme.typography.fontSize.small, color: theme.neutral.grey }}>
                设备总数
              </div>
              <div style={{ 
                fontSize: theme.typography.fontSize.xlarge,
                fontWeight: theme.typography.fontWeight.bold,
                color: theme.neutral.darkGrey,
              }}>
                {devices.length}
              </div>
            </div>
            
            <div style={{ marginRight: theme.spacing.xl }}>
              <div style={{ fontSize: theme.typography.fontSize.small, color: theme.neutral.grey }}>
                在线设备
              </div>
              <div style={{ 
                fontSize: theme.typography.fontSize.xlarge,
                fontWeight: theme.typography.fontWeight.bold,
                color: theme.functional.success,
              }}>
                {devices.filter(d => d.status === 'online').length}
              </div>
            </div>
            
            <div style={{ marginRight: theme.spacing.xl }}>
              <div style={{ fontSize: theme.typography.fontSize.small, color: theme.neutral.grey }}>
                离线设备
              </div>
              <div style={{ 
                fontSize: theme.typography.fontSize.xlarge,
                fontWeight: theme.typography.fontWeight.bold,
                color: theme.neutral.grey,
              }}>
                {devices.filter(d => d.status === 'offline').length}
              </div>
            </div>
            
            <div>
              <div style={{ fontSize: theme.typography.fontSize.small, color: theme.neutral.grey }}>
                警告设备
              </div>
              <div style={{ 
                fontSize: theme.typography.fontSize.xlarge,
                fontWeight: theme.typography.fontWeight.bold,
                color: theme.functional.warning,
              }}>
                {devices.filter(d => d.status === 'warning').length}
              </div>
            </div>
          </div>
          
          <div>
            <Button 
              type="primary"
              icon={<FaPlus />}
              onClick={handleAddDevice}
            >
              添加设备
            </Button>
          </div>
        </div>
        
        <div style={{ 
          marginTop: theme.spacing.lg,
          display: 'flex',
          gap: theme.spacing.md,
          flexWrap: 'wrap',
        }}>
          <Button 
            type={filter === 'all' ? 'primary' : 'secondary'}
            size="small"
            onClick={() => setFilter('all')}
          >
            全部
          </Button>
          
          <Button 
            type={filter === '传感器' ? 'primary' : 'secondary'}
            size="small"
            onClick={() => setFilter('传感器')}
          >
            传感器
          </Button>
          
          <Button 
            type={filter === '控制器' ? 'primary' : 'secondary'}
            size="small"
            onClick={() => setFilter('控制器')}
          >
            控制器
          </Button>
          
          <Button 
            type={filter === '监控' ? 'primary' : 'secondary'}
            size="small"
            onClick={() => setFilter('监控')}
          >
            监控设备
          </Button>
        </div>
      </Card>
      
      {/* 设备列表 */}
      <div style={{ 
        marginTop: theme.spacing.xl,
        marginBottom: theme.spacing.xl,
      }}>
        <h3 style={{ 
          color: theme.neutral.darkGrey,
          marginBottom: theme.spacing.md,
          fontWeight: theme.typography.fontWeight.medium,
        }}>
          设备列表
        </h3>
        
        <div style={{ 
          backgroundColor: theme.neutral.white,
          borderRadius: theme.borderRadius.large,
          boxShadow: theme.shadows.small,
          overflow: 'hidden',
        }}>
          <table style={{ 
            width: '100%',
            borderCollapse: 'collapse',
          }}>
            <thead>
              <tr style={{ 
                backgroundColor: theme.neutral.lightGrey,
                borderBottom: `1px solid ${theme.neutral.grey}`,
              }}>
                <th style={{ padding: theme.spacing.md, textAlign: 'left' }}>设备名称</th>
                <th style={{ padding: theme.spacing.md, textAlign: 'left' }}>类型</th>
                <th style={{ padding: theme.spacing.md, textAlign: 'left' }}>位置</th>
                <th style={{ padding: theme.spacing.md, textAlign: 'left' }}>状态</th>
                <th style={{ padding: theme.spacing.md, textAlign: 'left' }}>电量</th>
                <th style={{ padding: theme.spacing.md, textAlign: 'left' }}>信号</th>
                <th style={{ padding: theme.spacing.md, textAlign: 'left' }}>最后活动</th>
                <th style={{ padding: theme.spacing.md, textAlign: 'center' }}>操作</th>
              </tr>
            </thead>
            <tbody>
              {filteredDevices.map((device) => (
                <tr 
                  key={device.id} 
                  style={{ 
                    borderBottom: `1px solid ${theme.neutral.lightGrey}`,
                    backgroundColor: selectedDevice && selectedDevice.id === device.id 
                      ? theme.neutral.lightGrey 
                      : 'transparent',
                    cursor: 'pointer',
                  }}
                  onClick={() => handleSelectDevice(device)}
                >
                  <td style={{ padding: theme.spacing.md }}>{device.name}</td>
                  <td style={{ padding: theme.spacing.md }}>{device.type}</td>
                  <td style={{ padding: theme.spacing.md }}>{device.location}</td>
                  <td style={{ padding: theme.spacing.md }}>
                    <StatusIndicator status={device.status} />
                  </td>
                  <td style={{ padding: theme.spacing.md }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <FaBatteryThreeQuarters style={{ 
                        ...getBatteryStyle(device.battery),
                        marginRight: theme.spacing.sm,
                      }} />
                      {device.battery}%
                    </div>
                  </td>
                  <td style={{ padding: theme.spacing.md }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <FaWifi style={{ 
                        ...getSignalStrengthStyle(device.signalStrength),
                        marginRight: theme.spacing.sm,
                      }} />
                      {device.signalStrength}%
                    </div>
                  </td>
                  <td style={{ padding: theme.spacing.md }}>{device.lastActive}</td>
                  <td style={{ padding: theme.spacing.md, textAlign: 'center' }}>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: theme.spacing.sm }}>
                      <button 
                        style={{
                          background: 'none',
                          border: 'none',
                          color: theme.functional.info,
                          cursor: 'pointer',
                          fontSize: theme.typography.fontSize.medium,
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          console.log('Edit device', device.id);
                        }}
                      >
                        <FaPen />
                      </button>
                      <button 
                        style={{
                          background: 'none',
                          border: 'none',
                          color: theme.functional.error,
                          cursor: 'pointer',
                          fontSize: theme.typography.fontSize.medium,
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteDevice(device.id);
                        }}
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* 设备详情 */}
      {selectedDevice && (
        <Card title="设备详情" icon={<FaTablet />}>
          <div style={{ padding: theme.spacing.md }}>
            <div style={{ 
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
              gap: theme.spacing.lg,
              marginBottom: theme.spacing.lg,
            }}>
              <div>
                <div style={{ fontSize: theme.typography.fontSize.small, color: theme.neutral.grey }}>
                  设备ID
                </div>
                <div style={{ fontWeight: theme.typography.fontWeight.medium }}>
                  {selectedDevice.id}
                </div>
              </div>
              
              <div>
                <div style={{ fontSize: theme.typography.fontSize.small, color: theme.neutral.grey }}>
                  设备名称
                </div>
                <div style={{ fontWeight: theme.typography.fontWeight.medium }}>
                  {selectedDevice.name}
                </div>
              </div>
              
              <div>
                <div style={{ fontSize: theme.typography.fontSize.small, color: theme.neutral.grey }}>
                  设备类型
                </div>
                <div style={{ fontWeight: theme.typography.fontWeight.medium }}>
                  {selectedDevice.type}
                </div>
              </div>
              
              <div>
                <div style={{ fontSize: theme.typography.fontSize.small, color: theme.neutral.grey }}>
                  安装位置
                </div>
                <div style={{ fontWeight: theme.typography.fontWeight.medium }}>
                  {selectedDevice.location}
                </div>
              </div>
              
              <div>
                <div style={{ fontSize: theme.typography.fontSize.small, color: theme.neutral.grey }}>
                  设备状态
                </div>
                <div style={{ fontWeight: theme.typography.fontWeight.medium }}>
                  <StatusIndicator status={selectedDevice.status} />
                </div>
              </div>
              
              <div>
                <div style={{ fontSize: theme.typography.fontSize.small, color: theme.neutral.grey }}>
                  电池电量
                </div>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center',
                  fontWeight: theme.typography.fontWeight.medium,
                }}>
                  <FaBatteryThreeQuarters style={{ 
                    ...getBatteryStyle(selectedDevice.battery),
                    marginRight: theme.spacing.sm,
                  }} />
                  {selectedDevice.battery}%
                </div>
              </div>
              
              <div>
                <div style={{ fontSize: theme.typography.fontSize.small, color: theme.neutral.grey }}>
                  信号强度
                </div>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center',
                  fontWeight: theme.typography.fontWeight.medium,
                }}>
                  <FaWifi style={{ 
                    ...getSignalStrengthStyle(selectedDevice.signalStrength),
                    marginRight: theme.spacing.sm,
                  }} />
                  {selectedDevice.signalStrength}%
                </div>
              </div>
              
              <div>
                <div style={{ fontSize: theme.typography.fontSize.small, color: theme.neutral.grey }}>
                  最后活动时间
                </div>
                <div style={{ fontWeight: theme.typography.fontWeight.medium }}>
                  {selectedDevice.lastActive}
                </div>
              </div>
            </div>
            
            <div style={{ 
              display: 'flex',
              justifyContent: 'flex-end',
              gap: theme.spacing.md,
              marginTop: theme.spacing.lg,
            }}>
              <Button 
                type="secondary"
                size="small"
                icon={<FaChartLine />}
                onClick={() => console.log('View device history', selectedDevice.id)}
              >
                查看历史
              </Button>
              
              <Button 
                type="primary"
                size="small"
                icon={<FaPen />}
                onClick={() => console.log('Edit device', selectedDevice.id)}
              >
                编辑设备
              </Button>
              
              <Button 
                type="error"
                size="small"
                icon={<FaTrash />}
                onClick={() => handleDeleteDevice(selectedDevice.id)}
              >
                删除设备
              </Button>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default DeviceControl;