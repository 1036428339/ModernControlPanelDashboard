import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import theme from '../../theme';

/**
 * 设备状态图表组件
 * 使用饼图显示设备状态分布
 */
const DeviceStatusChart = () => {
  // 模拟设备状态数据
  const deviceStatusData = [
    { name: '在线', value: 18, color: theme.functional.success },
    { name: '离线', value: 5, color: theme.neutral.grey },
    { name: '警告', value: 3, color: theme.functional.warning },
    { name: '错误', value: 1, color: theme.functional.error },
  ];

  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={deviceStatusData}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
          >
            {deviceStatusData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => [`${value} 台设备`, '数量']} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DeviceStatusChart;