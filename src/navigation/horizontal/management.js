export default [
  { heading: '관리' },
  {
    title: '운동 및 수면',
    icon: { icon: 'mdi-weight-lifter' }, // icon
    children: [
      { title: '', to: '' }, 
      { title: '', to: '' },
    ],
  },
  {
    title: '식단 기록',
    icon: { icon: 'mdi-pencil-plus-outline' }, // icon
    children: [
      { title: '식단 기록하기', to: 'diet-dietRecord', icon: { icon: 'mdi-pencil-plus-outline'  } }, 
    ],
  },
  {
    title: '마음돌봄',
    icon: { icon: 'mdi-hand-heart-outline' }, // icon
    children: [
      { title: '', to: '' },
      { title: '', to: '' },
    ],
  },
]
