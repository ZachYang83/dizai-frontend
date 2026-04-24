import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    headerHeight: 64,
    mapKey: '',
    monitorPoints: []
  }),
  actions: {
    setMapKey(key) {
      this.mapKey = key
    },
    setMonitorPoints(points) {
      this.monitorPoints = points
    }
  }
})
