
export default [
  {
    title: '식단',
    to: { name: 'first-page' },
    icon: { icon: 'mdi-food-fork-drink' },
  },
  {
    title: '커뮤니티',
    icon: { icon: 'mdi-account-group-outline' },
    children: [
      { title: '친구 / 구독자 관리 페이지', to: { name: 'community-user-tab', params: { tab: 'friend' } } },
      { title: '챌린지목록', to: { name: 'apps-challengeList' }, icon: { icon: 'mdi-message-outline'  } },
      { title: '채팅', to: { name: 'apps-chat' }, icon: { icon: 'mdi-message-outline'  } },
      { title: '챌린지', to: { name: 'apps-user-id', params: { id: 21 } }, icon: { icon: 'mdi-crowd'  } },
      { title: '게시판', to: { name: 'community_post' }, icon: { icon: 'mdi-instagram'  } },
    ],
  },
  {
    title: '마이페이지',
    icon: { icon: 'mdi-face-man-shimmer-outline' },
    to: { name: 'apps-user-view-id', params: { id: 22 }  },
  },
  {
    title: '다이어리',
    to: { name: 'fifth-page' },
    icon: { icon: 'mdi-notebook' },
  },
  {
    title: '메이트',
    to: { name: 'mate' },
    icon: { icon: 'mdi-notebook' },
  },
]
