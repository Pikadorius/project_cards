export const PATH = {
  LOGIN: '/login',
  REGISTER: '/register',
  RECOVERY: '/recovery',
  ACCOUNT: '/account',
  NEW_PASSWORD: '/set-new-password',
  RECOVERY_INFO: '/recovery-info',
  PACK_LIST: '/pack-list',
  CARD_LIST: '/card-list',
  CARD_LIST_ID: '/card-list/:id',
  CURRENT_URL: window.location.href.split('#')[0],
} as const
