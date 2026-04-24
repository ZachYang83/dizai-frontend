import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/dashboard'
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('../views/Dashboard.vue'),
    meta: { title: '总览大屏' }
  },
  {
    path: '/ai-interpret',
    name: 'AiInterpret',
    component: () => import('../views/AiInterpret.vue'),
    meta: { title: 'AI 解译' }
  },
  {
    path: '/predict-analysis',
    name: 'PredictAnalysis',
    component: () => import('../views/PredictAnalysis.vue'),
    meta: { title: '预测分析' }
  },
  {
    path: '/geo-qa',
    name: 'GeoQA',
    component: () => import('../views/GeoQA.vue'),
    meta: { title: '地灾问答' }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to) => {
  document.title = to.meta.title
    ? `${to.meta.title} - 地质灾害监测预警智能辅助决策系统`
    : '地质灾害监测预警智能辅助决策系统'
})

export default router
