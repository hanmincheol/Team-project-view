export default [
  { heading: '관리' },
  {
    title: '운동 및 수면',
    icon: { icon: 'mdi-weight-lifter' }, // icon
    children: [
      { title: '운동 경로 보기', to: { name: 'exercise-map-recommend', params: { recommend: 'reco' } }, icon: { icon: 'mdi-map-check' } }, //test폴더 안의 test.vue 파일을 의미 아이콘 사용 불가
      { title: '운동 자세 분석', to: 'exercise-pose', icon: { icon: 'mdi-dumbbell' } }, //test폴더 안의 test2.vue 파일을 의미
    ],
  },
  {
    title: '식단',
    icon: { icon: 'mdi-food-fork-drink' }, // icon
    children: [
      { title: '식단 기록하기', to: 'diet-dietRecord', icon: { icon: 'mdi-pencil-plus-outline'  } }, //test폴더 안의 test.vue 파일을 의미 아이콘 사용 불가
      { title: '식단 추천받기', to: 'dietFood', icon: { icon: 'mdi-cookie-refresh-outline'  } },
    ],
  },
  {
    title: '마음돌봄',
    icon: { icon: 'mdi-hand-heart-outline' }, // icon
    children: [
      { title: '다이어리', to: 'diary', icon: { icon: 'mdi-notebook' } }, //test폴더 안의 test.vue 파일을 의미 아이콘 사용 불가
    ],
  },
]
