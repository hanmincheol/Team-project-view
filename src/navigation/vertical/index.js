import comm from "./comm"

export default [
  {
    title: '자가진단',
    to: { name: 'first-page' },
    icon: { icon: 'mdi-home-outline' },
  },
  {
    title: '관리',
    to: { name: 'second-page' },
    icon: { icon: 'mdi-file-document-outline' },
  },
  {
    title: '커뮤니티',
    icon: { icon: 'mdi-account-group-outline' },
    children: [
      { title: '친구 / 구독자 관리 페이지', to: { name: 'community-user-tab', params: { tab: 'friend' } } },
      { title: '채팅', to: { name: 'apps-chat' }, icon: { icon: 'mdi-message-outline'  } },
    ],
  },
  {
    title: '마이페이지',
    icon: { icon: 'mdi-file-document-outline' },
    to: { name: 'apps-user-view-id', params: { id: 22 }  },
  },
  {
    title: '고객센터',
    to: { name: 'fifth-page' },
    icon: { icon: 'mdi-file-document-outline' },
  },
  ...comm,
]
