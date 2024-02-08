<script setup>
import Notifications from '@/@core/components/Notifications.vue'
import avatar3 from '@images/avatars/avatar-3.png'
import avatar4 from '@images/avatars/avatar-4.png'
import avatar5 from '@images/avatars/avatar-5.png'
import paypal from '@images/svg/paypal.svg'


import { useStore } from 'vuex'
import axios from '@axios'

const store = useStore()

// 로그인 스토어와 사용자 스토어의 상태를 가져옵니다.
const userInfo = computed(() => store.state.userStore.userInfo)
const connetId=userInfo.value.id
const name = computed(() => store.state.userStore.userInfo ? store.state.userStore.userInfo.name : null)

let noticlists = ref([])
const getNoticList = async (id) =>{

    await axios.get('http://localhost:4000/Notic/View.do', { params: { id: id } })
    .then(response => {
        console.log('가져오기 성공')
        console.log(response.data)
        noticlists.value = response.data        
    }).catch(error => {
        // 업데이트 중 오류가 발생했을 때의 처리
        console.log('실패')
    })    
}

</script>

<template>
  <Notifications
    :noticlists="noticlists"
    @click="getNoticList(connetId)"
    :noticflag = false
    :getNoticList = getNoticList   
  />
</template>
