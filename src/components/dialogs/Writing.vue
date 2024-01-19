<script setup>
import It from '@/pages/views/demos/components/tabs/ImageTab.vue'
import Hashtag from '@/pages/views/demos/forms/form-elements/textarea/Hashtag.vue'
import Text from '@/pages/views/demos/forms/form-elements/textarea/WritingText.vue'
import Sub from '@/views/demos/Subject.vue'
import { size } from '@floating-ui/dom'
import avatar1 from '@images/avatars/avatar-1.png'
import { computed, ref } from 'vue'


const props = defineProps({
  isDialogVisible: {
    type: Boolean,
    required: true,
  },
})

const emit = defineEmits(['update:isDialogVisible'])

const imageUrls = ref([]) // 각 이미지의 URL을 저장하는 배열

const isprofile = ref(false)

const people = ref(false)

const textValue = ref('')
const hashtagValue = ref('')
const imageUrlsValue = ref([])

const dialogVisibleUpdate = value => {
  emit('update:isDialogVisible', value)
}

const isButtonDisabled = computed(() => {
  return !textValue.value && !hashtagValue.value && imageUrlsValue.value.length === 0
})

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
      <!--
        <VImg
        :src="bg"
        style=" filter: contrast(200%);opacity: 0.5;"
        /> 
      -->

      <VCard>
        <VCardText>
          <div
            class="d-flex justify-end"
            style="margin-top: 10px;"
          >
            <VBtn :disabled="isButtonDisabled">
              글 등록
            </VBtn>
          </div>
          <VRow>
            <VCol cols="6">
              <VRow style=" margin-top: 20px;">
                <VCol cols="6">
                  <VListItem 
                    v-for="(member, index) in members" 
                    :key="index"
                  >
                    <template #prepend>
                      <VAvatar 
                        class="text pointer-cursor"
                        :image="member.avatar" 
                        @click="isprofile=true"
                      />
                    </template>
                    <VListItemTitle 
                      class="text pointer-cursor"
                      style="font-weight: bold;"
                      @click="isprofile=true"
                      @mouseover="size"  
                    >
                      {{ member.name }}
                    </VListItemTitle>
                  </VListItem>
                </VCol>
                <VCol
                  cols="4"
                  style=" margin-left: 85px;"
                >
                  <Sub />
                </VCol>
              </VRow>
              <VRow style=" margin-top: -10px;">
                <VCol cols="12">
                  <Text v-model="textValue" />
                </VCol>
              </VRow>
              <VRow style=" margin-top: -10px;">
                <VCol cols="12">
                  <Hashtag v-model="hashtagValue" />
                </VCol>
              </VRow>
              <VRow style="margin-top: -10px;">
                <div
                  class="demo-space-x"
                  style="display: flex; width: 100%; justify-content: flex-end;"
                >
                  <VSwitch
                    v-model="people"
                    value="people"
                  />
                  <h3
                    v-if="people"
                    style="margin-top: 17px; margin-left: 2px;"
                  >
                    공개
                  </h3>
                  <h3
                    v-if="!people"
                    style="margin-top: 17px; margin-left: 2px;"
                  >
                    비공개
                  </h3>
                </div>
              </VRow>
            </VCol>
            <VCol cols="6">
              <VCardItem>
                <It
                  v-model="imageUrlsValue"
                  :image-urls="imageUrls"
                />
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
