<script setup>
import axios from '@axios'
import { computed } from 'vue';

// ...

const filteredPaylist = computed(() => {
  if (selected.value.length === 0) {
    // 선택된 카테고리가 없는 경우 전체 paylist 반환
    return paylist.value;
  } else if (selected.value.includes('지출') && selected.value.includes('수입') && selected.value.includes('충전')) {
    // '지출'과 '수입'이 모두 선택된 경우 전체 paylist 반환
    return paylist.value;
  } else if (selected.value.includes('지출')) {
    // '지출'이 선택된 경우 data.payType이 1인 paylist만 반환
    return paylist.value.filter(data => data.payType === 1);
  } else if (selected.value.includes('수입')) {
    // '수입'이 선택된 경우 data.payType이 2인 paylist만 반환
    return paylist.value.filter(data => data.payType === 2);
  } else if (selected.value.includes('충전')) {
    // '수입'이 선택된 경우 data.payType이 2인 paylist만 반환
    return paylist.value.filter(data => data.payType === 0);
  } else {
    // 그 외의 경우 빈 배열 반환
    return [];
  }
});

// paylist
const paylist = ref([]);
const searchuser = 'OSH' //접속중인 유저 아이디값 받아넣기
const form = ref('')

const fetchData = async () => {
  axios
    .get('http://localhost:4000/PaymentList',{
      params: {
        id: searchuser,
      },
    })
    .then((response) => {
      if (response.status === 200) {
        paylist.value = response.data;
        console.log(response.data)
        console.log(paylist.value)
      } else {
        console.log('데이터 가져오기 실패');
      }
    })
    .catch((error) => {
      console.error(error);
   });
};

const items = [
  '지출',
  '수입',
  '충전'
]

const selected = ref([])

onMounted(fetchData);


</script>

<template>
  <VRow>
    <!-- 👉 Payment Methods -->

    <VCol cols="12">
      <!-- 👉 Billing Address -->
      <VCard title="결제 이력 정보">
        <VCardText>
          <VRow>
            <VCol
              cols="12"
              lg="12"
            >
              <VCol>
                <!-- 카테고리 추가 -->
                <VRow>
                  <VCol
                    cols="5"
                    style="margin-top: -15px;"
                  >
                      <VSelect
                        v-model="selected"
                        :items="items"
                        label="카테고리"
                        chips
                        multiple
                      />
                  </VCol>
                  <VCol
                    cols="5"
                    style="margin-top: -15px;"
                  >
                    <VTextField
                      v-model="q"
                      class="search px-1 flex-grow-1"
                      placeholder="Search"
                      :style="{ border: `1px solid ${borderColor}`, borderRadius: '5px' }"  
                      @focus="borderColor = '#28a745'"  
                      @blur="borderColor = '#ccc'" 
                    />
                  </VCol>
                </VRow>
              </VCol>
              <VTable class="billing-address-table">
                <tr>
                    <th>
                        <h6 class="text-sm text-no-wrap font-weight-medium mb-4">
                            결제 일자
                        </h6>
                    </th>
                    <th>
                        <h6 class="text-sm text-no-wrap font-weight-medium mb-4">
                            결 제 명
                        </h6>
                    </th>
                    <th>
                        <h6 class="text-sm text-no-wrap font-weight-medium mb-4">
                            결제 금액
                        </h6>
                    </th>
                    <th>
                        <h6 class="text-sm text-no-wrap font-weight-medium mb-4">
                            결제 수단
                        </h6>
                    </th>
                </tr>
                
                <tr 
                  v-for="(data, index) in filteredPaylist"
                  :key="index"
                  :style="data.payType === 1 ? 'background-color: rgba(0,0,255,0.05)' : 'background-color: rgba(255,0,0,0.05)'"
                  >
                  <td>
                    <p class="text-body-2">
                      {{data.payDate}}
                    </p>
                  </td>
                  <td>
                    <p class="text-body-2">
                      {{data.payName}}
                    </p>
                  </td>
                  <td>
                    <p class="text-body-2">
                      {{data.payPrice}}
                    </p>
                  </td>
                  <td>
                    <p class="text-body-2">
                      {{data.payMethod}}
                    </p>
                  </td>
                </tr>
              </VTable>
            </VCol>
          </VRow>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
</template>

<style lang="scss">
table{
  border: solid 2px black;
  text-align: center;
}
th{
  border-bottom:solid 2px black;
  border-left:solid 2px black;
}
th:first-child {
  border-left: none;
}
td{
  border-bottom:solid 1px gray;
  border-left:solid 1px gray;
}
td:first-child {
  border-left: none;
}
tr:last-child td {
  border-bottom: none;
}

</style>
