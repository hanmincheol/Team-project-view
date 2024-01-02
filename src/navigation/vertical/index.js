import test from "./test"
export default [
  {
    title: 'Home',
    to: { name: 'index' },
    icon: { icon: 'mdi-home-outline' },
  },
  
  {
    title: 'Second page',
    to: { name: 'second-page' },
    icon: { icon: 'mdi-file-document-outline' },
  },
  /*
  {
    title: 'Saasaasdasdsd',
    to: { name: '3rd' },
    icon: { icon: 'mdi-file-document-outline' },
  },*/
  ...test,
]
