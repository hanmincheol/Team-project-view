import management from "./management"


export default [
  {
    title: '마이페이지',
    icon: { icon: 'mdi-face-man-shimmer-outline' },
    to: { name: 'apps-user-view-id', params: { id: 22 }  },
  },

  {
    title: '커뮤니티',
    icon: { icon: 'mdi-account-group-outline' },
    children: [
      { title: '친구 / 구독자 관리 페이지', to: { name: 'community-user-tab', params: { tab: 'friend' } }, icon: { icon: 'mdi-account-multiple-plus'  } },
      { title: '게시판', to: { name: 'community_post' }, icon: { icon: 'mdi-instagram'  } },
      { title: '채팅', to: { name: 'apps-chat' }, icon: { icon: 'mdi-message-text'  } },
      { title: '메이트', to: { name: 'mate' }, icon: { icon: 'mdi-crowd'  } },
      { title: '챌린지', to: { name: 'apps-user-id', params: { id: 21 } }, icon: { icon: 'mdi-charity'  } },
      { title: '챌린지목록', to: { name: 'apps-challengeList' }, icon: { icon: 'mdi-charity-search'  } },
    ],
  },
  
  {
    title: '자가진단',
    to: { name: 'selfTest' },
    icon: { icon: 'mdi-account-check-outline' },
  },
  {
    title: '운동추천',
    to: { name: 'exerciseRecommendation' },
    icon: { icon: 'mdi-dumbbell' },
  },

  ...management,
]
