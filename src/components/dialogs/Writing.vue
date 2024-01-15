<script setup>
import Hashtag from '@/pages/views/demos/forms/form-elements/textarea/Hashtag.vue'
import Text from '@/pages/views/demos/forms/form-elements/textarea/WritingText.vue'
import Sub from '@/views/demos/Subject.vue'
import { size } from '@floating-ui/dom'
import avatar1 from '@images/avatars/avatar-1.png'



const props = defineProps({
  isDialogVisible: {
    type: Boolean,
    required: true,
  },
})

const emit = defineEmits(['update:isDialogVisible'])

const isprofile = ref(false)
const text = ref(['공개'])

const dialogVisibleUpdate = value => {
  emit('update:isDialogVisible', value)
}

const members = [
  {
    avatar: avatar1,
    name: '멋쟁이 승환이',
  },
]
</script>

<template>
  <VDialog
    :width="$vuetify.display.smAndDown ? 'auto' : 1100"
    :model-value="props.isDialogVisible"
    @update:model-value="dialogVisibleUpdate"
  >
    <!-- 닫기 버튼 -->
    <VBtn
      icon
      @click="$emit('update:isDialogVisible', false)"
    >
      <VIcon>mdi-close</VIcon>
    </VBtn>
    <VCol cols="12">
      <VCard>
        <VCardText>
          <div
            class="d-flex justify-end"
            style="margin: 10px;"
          >
            <VBtn>글 등록</VBtn>
          </div>
          <VRow>
            <VCol cols="6">
              <VRow style=" margin-top: 10px;">
                <VCol cols="6">
                  <VListItem 
                    v-for="(member, index) in members" 
                    :key="index"
                  >
                    <template #prepend>
                      <VAvatar 
                        class="text-sm pointer-cursor"
                        :image="member.avatar" 
                        @click="isprofile=true"
                      />
                    </template>
                    <VListItemTitle 
                      class="text-sm pointer-cursor"
                      @click="isprofile=true"
                      @mouseover="size"  
                    >
                      {{ member.name }}
                    </VListItemTitle>
                  </VListItem>
                </VCol>
                <VCol
                  cols="4"
                  style=" margin-left: 75px;"
                >
                  <Sub />
                </VCol>
              </VRow>
              <VRow style=" margin-top: -10px;">
                <VCol cols="12">
                  <Text />
                </VCol>
              </VRow>
              <VRow style=" margin-top: -10px;">
                <VCol cols="12">
                  <Hashtag />
                </VCol>
              </VRow>
              <VRow style=" margin-top: -10px;">
                <VSwitch
                  v-model="selectedSwitch"
                  style="margin-left: auto;"
                  :label="text"
                  :value="item"
                  :color="Primary"
                />
              </VRow>
            </VCol>
            <VCol
              cols="6"
              style=" margin-top: 10px;"
            >
              <VCardItem>
                <input
                  id="filebtn"
                  type="file"
                  accept="image/*"
                  hidden
                  @change="uploadImg($event,'imgBefore')"
                >
                <!-- label의 for속성값과 input의 id값을 맞춰줘야 label영역을 클릭했을 때 input태그가 활성화됨 -->
                <label
                  for="filebtn"
                  class="input-plus"
                > 
                  <div :style="{'border-style':'solid', 'width':'100%', 'height':'600px', 'display':'flex','justify-content': 'center','align-items': 'center'}">
                    <img
                      id="imgBefore"
                      :style="{'width':'50px', 'height':'60px'}"
                      src="@images/noimage.png"
                    >
                  </div>
                </label>
              </VCardItem>
            </VCol>
          </VRow>
        </VCardText>
      </VCard>
    </VCol>
  </VDialog>
</template>

<style scoped>
.pointer-cursor {
  cursor: pointer;
}
</style>
