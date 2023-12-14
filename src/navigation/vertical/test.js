export default [
    { heading: '테스트 타이틀'},
    {
        title: '테스트 작은타이틀',
        icon: { icon: 'mdi-file-document-outline' }, // icon
        children:   [
        { title: 'test1', to: 'test-test' }, //test폴더 안의 test.vue 파일을 의미 아이콘 사용 불가
        { title: 'test2', to: 'test-test2' }, //test폴더 안의 test2.vue 파일을 의미
        ],
    },
]