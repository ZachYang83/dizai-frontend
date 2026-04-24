// 风险统计数据
export const riskStatistics = {
  red: { count: 3, label: '高风险', level: 'I级' },
  orange: { count: 5, label: '中风险', level: 'II级' },
  yellow: { count: 15, label: '低风险', level: 'III级' },
  blue: { count: 5, label: '一般', level: 'IV级' }
}

// 24H异常趋势
export const abnormalTrend = {
  total: 0,
  hours: Array.from({ length: 24 }, (_, i) => `${String(i).padStart(2, '0')}:00`),
  values: [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
}

// 风险等级分布
export const riskDistribution = [
  { name: 'I级(高)', value: 3, color: '#ef4444' },
  { name: 'II级(中)', value: 5, color: '#f97316' },
  { name: 'III级(低)', value: 15, color: '#eab308' },
  { name: 'IV级(一般)', value: 5, color: '#3b82f6' }
]

// TOP5风险点
export const topRiskPoints = [
  { rank: 1, name: '吕田镇东联村兴龙社滑坡点', risk: 'red', alert: true },
  { rank: 2, name: '良口镇流溪河水库北侧', risk: 'red', alert: true },
  { rank: 3, name: '温泉镇新田村山体崩塌点', risk: 'orange', alert: true },
  { rank: 4, name: '鳌头镇黄茅村泥石流隐患', risk: 'orange', alert: false },
  { rank: 5, name: '太平镇秋枫村地面沉降区', risk: 'yellow', alert: false }
]
