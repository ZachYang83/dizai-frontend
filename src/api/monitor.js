import { monitorPoints } from '../mock/monitor.js'

export function getMonitorPoints() {
  return Promise.resolve(monitorPoints)
}

export function getMonitorPoint(id) {
  const point = monitorPoints.find(p => p.id === Number(id))
  return Promise.resolve(point || null)
}
