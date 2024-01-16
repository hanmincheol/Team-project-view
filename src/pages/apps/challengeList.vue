<script setup>
import { useRoute } from 'vue-router'
import axios from '@axios'

const router = useRoute()
const projectData = ref([])

const fetchProjectData = () => {
    axios.get('/pages/profile', { params: { tab: 'projects' } }).then(response => {
      projectData.value = response.data
    })
}

watch(router, fetchProjectData, { immediate: true })


const moreList = [
  {
    title: 'Rename Project',
    value: 'Rename Project',
  },
  {
    title: 'View Details',
    value: 'View Details',
  },
  {
    title: 'Add to favorites',
    value: 'Add to favorites',
  },
  {
    type: 'divider',
    class: 'my-2',
  },
  {
    title: 'Leave Project',
    value: 'Leave Project',
    class: 'text-error',
  },
]

// 주어진 날짜 형식을 'YY/MM/DD'에서 'YYYY-MM-DD'로 변환
const changeDate = (date) => {
  const parts = date.split('/');
  const year = `20${parts[0]}`;
  const month = parts[1];
  const day = parts[2];
  const formattedDate = new Date(`${year}-${month}-${day}`);
  return formattedDate
}

const getHourDifference = (deadline, startDate) => {  
  const deadlineDate = changeDate(deadline);
  const startDateDate = changeDate(startDate);
  // 두 날짜 간의 시간 차이 계산
  const hourDifference = Math.abs(deadlineDate - startDateDate) / 36e5;
  return hourDifference;
}
const currentDate = (() => {
  const today = new Date();
  const year = today.getFullYear().toString().slice(-2);
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}/${month}/${day}`;
})();
</script>

<template>
    <VRow v-if="projectData">
        <VCol
            v-for="data in projectData"
            :key="data.title"
            cols="12"
            sm="6"
            lg="4"
        >
            <VCard>
                <VCardItem>
                    <template #prepend>
                        <VAvatar
                            :image="data.avatar"
                            size="38"
                        />
                    </template>

                    <VCardTitle>{{ data.title }}</VCardTitle>
                    <div class="d-flex align-center flex-wrap justify-space-between mt-1 mb-0">
                        <span class="font-weight-medium me-1">방장:{{ data.client }}</span>
                        <span>모인 금액 : {{parseInt(data.pay) * parseInt(data.members)}}원</span>
                    </div>

                    <template #append>
                        <div class="mt-n8 me-n3">
                        <MoreBtn
                            item-props
                            :menu-list="moreList"
                        />
                        </div>
                    </template>
                </VCardItem>

                <VCardText>
                    <div class="d-flex align-center justify-space-between flex-wrap gap-x-2 gap-y-4">
                        <div class="pa-2 bg-var-theme-background rounded">              
                        <h6 class="text-base font-weight-medium">
                            참가비 : <span class="text-body-1"> {{ data.pay }}원</span>
                        </h6>
                        </div>

                        <div>
                        <h6 class="text-base font-weight-medium">
                            시작일: <span class="text-body-1">{{ data.startDate }}</span>
                        </h6>
                        <h6 class="text-base font-weight-medium mb-1">
                            종료일: <span class="text-body-1">{{ data.deadline }}</span>
                        </h6>
                        </div>
                    </div>

                    <p class="mt-4 mb-0 clamp-text">
                        {{ data.description }}
                    </p>
                </VCardText>

                <VDivider />

                <VCardText>
                    <div class="d-flex align-center justify-space-between flex-wrap gap-2">
                        <VChip
                        color="error"
                        density="compact"
                        >
                        <span class="text-xs">
                            전체 일자 : {{ getHourDifference(data.deadline, data.startDate)/24 }}일                
                        </span>
                        </VChip>

                        <VChip
                        color="success"
                        density="compact"
                        >
                        <span class="text-xs">
                            종료일까지 : {{ (getHourDifference(data.deadline, currentDate)+9)/24 }}일
                        </span>
                        </VChip>
                    </div>

                    <div class="d-flex align-center justify-space-between flex-wrap text-xs mt-4 mb-2">
                        <span>목표 이행률: {{data.percent}}%</span>
                        <span>{{ Math.round((data.completedTask / data.totalTask) * 100) }}% Completed</span>
                    </div>
                    <VProgressLinear
                        rounded
                        rounded-bar
                        height="8"
                        :model-value="data.completedTask"
                        :max="data.totalTask"
                        color="primary"
                    />

                    <div class="d-flex align-center justify-space-between flex-wrap gap-2 mt-3">
                        <div class="d-flex align-center">
                        <div class="v-avatar-group me-2">
                            <VAvatar
                            v-for="avatar in data.avatarGroup"
                            :key="avatar.name"
                            :image="avatar.avatar"
                            :size="36"
                            />
                        </div>
                        <span class="text-xs">
                            {{ data.members }}
                        </span>
                        </div>
                        <span>
                            <VBtn v-if="changeDate(data.startDate) > changeDate(currentDate)">입장</VBtn>                          
                            <strong v-else>진행중</strong>
                        </span>
                    </div>
                </VCardText>
            </VCard>
        </VCol>
    </VRow>
</template>