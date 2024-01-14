export default [
  { heading: '관리' },
  {
    title: '운동 및 수면',
    icon: { icon: 'mdi-weight-lifter' }, // icon
    children: [
      { title: '', to: '' }, //test폴더 안의 test.vue 파일을 의미 아이콘 사용 불가
      { title: '', to: '' }, //test폴더 안의 test2.vue 파일을 의미
    ],
  },
  {
    title: '식단 기록',
    icon: { icon: 'mdi-pencil-plus-outline' }, // icon
    children: [
      { title: '식단 기록하기', to: 'diet-dietRecord', icon: { icon: 'mdi-pencil-plus-outline'  } }, //test폴더 안의 test.vue 파일을 의미 아이콘 사용 불가
    ],
  },
  {
    title: '마음돌봄',
    icon: { icon: 'mdi-hand-heart-outline' }, // icon
    children: [
      { title: '', to: '' }, //test폴더 안의 test.vue 파일을 의미 아이콘 사용 불가
      { title: '', to: '' }, //test폴더 안의 test2.vue 파일을 의미
    ],
  },
]
