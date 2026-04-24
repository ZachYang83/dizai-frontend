import {
  riskStatistics,
  abnormalTrend,
  riskDistribution,
  topRiskPoints
} from '../mock/dashboard.js'

export function getStatistics() {
  return Promise.resolve(riskStatistics)
}

export function getAbnormalTrend() {
  return Promise.resolve(abnormalTrend)
}

export function getRiskDistribution() {
  return Promise.resolve(riskDistribution)
}

export function getTopRiskPoints() {
  return Promise.resolve(topRiskPoints)
}
