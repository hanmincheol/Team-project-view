import comm from "./comm"
import test from "./test"

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
    to: { name: 'third-page' },
    icon: { icon: 'mdi-file-document-outline' },
  },
  {
    title: '마이페이지',
    to: { name: 'fourth-page' },
    icon: { icon: 'mdi-file-document-outline' },
  },
  {
    title: '고객센터',
    to: { name: 'fifth-page' },
    icon: { icon: 'mdi-file-document-outline' },
  },

  ...test,
  ...comm,
]
