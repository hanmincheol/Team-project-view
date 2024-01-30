<script setup>
import { PerfectScrollbar } from 'vue3-perfect-scrollbar'

const props = defineProps({
  togglerIcon: {
    type: String,
    required: true,
    default: 'mdi-robot-confused-outline',
  },
})

const router = useRouter()
</script>

<template>
  <IconBtn>
    <VIcon
      :icon="props.togglerIcon"
      size="x-large"
      color="success"
    />

    <VMenu
      activator="parent"
      offset="20px"
      location="bottom end"
      :close-on-content-click="false"
    >
      <VCard
        width="550"
        max-height="700"
        class="d-flex flex-column"
      >
        <VCardItem class="py-4">
          <VCardTitle>ChatBot</VCardTitle>

          <template #append>
            <IconBtn>
              <VIcon icon="mdi-robot-confused-outline" />
            </IconBtn>
          </template>
        </VCardItem>

        <VDivider />

        <PerfectScrollbar :options="{ wheelPropagation: false }">
          <VRow class="ma-0 mt-n1">
            <div class="chat-container">
              <div class="send">
                <p class="chat-bubble">
                  Hey there! What's up
                </p>
              </div>
              <div class="receive">
                <p class="chat-bubble">
                  Checking out iOS7 you know..
                </p>
              </div>
              <div class="send">
                <p class="chat-bubble">
                  Check out this bubble!
                </p>
              </div>
              <div class="receive">
                <p class="chat-bubble">
                  It's pretty cool…
                </p>
              </div>
              <div class="receive">
                <p class="chat-bubble">
                  Not gonna lie!
                </p>
              </div>
              <div class="send">
                <p class="chat-bubble">
                  Yeah it's pure CSS &amp; HTML
                </p>
              </div>
              <div class="receive">
                <p class="chat-bubble">
                  Wow that's impressive. But what's even more impressive is that this bubble is really high.
                </p>
              </div>
            </div>
          </VRow>
        </PerfectScrollbar>
        <VCol cols="12">
          <VRow>
            <VCol cols="9">
              <VTextarea
                prepend-inner-icon="mdi-comment-outline"
                label="prepend-inner-icon"
                rows="1"
              />
            </VCol>
            <VCol cols="2">
              <VBtn size="x-large">
                전송
              </VBtn>
            </VCol>
          </VRow>
        </VCol>
      </VCard>
    </VMenu>
  </IconBtn>
</template>

<style lang="scss">
/* 채팅방 스타일 */
.chat-container {
  display: flex;
  flex-direction: column;
  inline-size: 100%;
  margin-block: 0;
  margin-inline: auto;
  max-inline-size: 600px;
}

.chat-bubble {
  border-radius: 20px;
  margin-block-end: 10px;
  max-inline-size: 100%;
  padding-block: 10px;
  padding-inline: 20px;
}

.send {
  align-self: flex-end;
  border-radius: 40px 0 0 40px;
  background-color: #86e93a;
  font-weight: bold;
  margin-block-start: 10px;
  max-inline-size: 70%;
  text-align: end;
}

.receive {
  align-self: flex-start;
  border-radius: 0 40px 40px 0;
  background-color: #ad59b4;
  color: white;
  margin-block-start: 10px;
  max-inline-size: 70%;
  text-align: start;
}
</style>
