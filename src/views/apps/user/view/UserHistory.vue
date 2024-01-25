<script setup>
import { VDataTable } from 'vuetify/labs/VDataTable'
import UserInvoiceTable from './UserInvoiceTable.vue'
import axios from '@axios'

// Images
import avatar2 from '@images/avatars/avatar-2.png'
import figma from '@images/icons/project-icons/figma.png'
import html5 from '@images/icons/project-icons/html5.png'
import python from '@images/icons/project-icons/python.png'
import react from '@images/icons/project-icons/react.png'
import sketch from '@images/icons/project-icons/sketch.png'
import vue from '@images/icons/project-icons/vue.png'
import xamarin from '@images/icons/project-icons/xamarin.png'


const getDotColor = (index) => {
  const colors = ['primary', 'info', 'success', 'error'];
  return colors[index % colors.length];
}

// mh는 Member_History 테이블을 뜻하는 약자
const mhdate = ref([]);
const searchuser = 'HMC' //접속중인 유저 아이디값 받아넣기
const form = ref('')

const fetchData = async () => {
  try {
    const response = await axios.post('http://localhost:4000/memberhistory/View.do', form.value, {
      params: {
        id: searchuser,
      },
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 200) {
      console.log('데이터 가져오기 성공');
      // console.log(response.data);
      mhdate.value = response.data;
    } else {
      console.log('데이터 가져오기 실패');
    }
  } catch (error) {
    console.error(error);
  }
};

onMounted(fetchData);

</script>

<template>
  <VRow>
    <VCol cols="12">
      <!-- :point_right: Activity timeline -->
      <VCard title="히스토리">
        <VCardText>
          <VTimeline
            density="compact"
            align="start"
            truncate-line="both"
            class="v-timeline-density-compact"
            v-if="mhdate.length > 0"                        
          >
            <VTimelineItem
              v-for="(data, index) in mhdate"
              :key="index"
              :dot-color="getDotColor(index+1)"
              size="x-small"
            >
              <div class="d-flex justify-space-between align-center flex-wrap gap-2 mb-3">
                <span class="app-timeline-title">                  
                  {{data.mem_colname == 'NAME' ? '이름을' : 
                    data.mem_colname == 'GENDER' ? '성별을' :
                    data.mem_colname == 'B_DAY' ? '생일을' : 
                    data.mem_colname == 'TEL' ? '번호를' :
                    data.mem_colname == 'USERADDRESS' ? '주소를' : 
                    data.mem_colname == 'HEIGHT' ? '키를' :
                    data.mem_colname == 'WEIGHT' ? '몸무게를' : 
                    data.mem_colname == 'GOAL_NO' ? '목표를' : ''}} '{{data.before_value}}'에서 '{{data.after_value}}'로 수정하셨습니다.
                </span>
                <span class="app-timeline-meta">{{data.update_day}}</span>
              </div>
            </VTimelineItem>
          </VTimeline>
          <div v-else>
            변경 이력이 없습니다.
          </div>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
</template>