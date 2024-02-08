<script setup>
import { useChat } from '@/views/apps/chat/useChat'
import axios from '@axios'
import {
  avatarText,
  formatDateToMonthShort,
} from '@core/utils/formatters'
import { computed, ref } from 'vue'
import { useStore } from 'vuex'

const props = defineProps({
  isChatContact: {
    type: Boolean,
    required: false,
    default: false,
  },
  user: {
    type: null,
    required: true,
  },
})

const store = useStore()
const ruser = ref("")

// 로그인 스토어와 사용자 스토어의 상태를 가져옵니다.
const userInfo = computed(() => store.state.userStore.userInfo)
const connetId=userInfo.value.id
const { resolveAvatarBadgeVariant } = useChat()

const isActive = ref(false)

// 메서드 정의
const fetchData = async () => {
  try {
    const response = await axios.post('http://localhost:4000/chat/selectChat.do', {
      id: connetId,
    })

    console.log(response.data)
    ruser.value = response.data.ruser
    isActive.value = store.state.activeChat?.contact.id === props.user.id
  } catch (error) {
    console.error(error)
  }
}

// 컴포넌트가 마운트되었을 때 fetchData를 호출합니다.
onMounted(fetchData)

// computed 속성 정의
const isChatContactActive = computed(() => {
  if (!props.isChatContact)
    return !store.state.activeChat?.chat && isActive.value

  return isActive.value
})

//:color="resolveAvatarBadgeVariant(props.user.status)"
</script>


<template>
  <li
    :key="isChatContactActive"
    class="chat-contact cursor-pointer d-flex align-center"
    :class="{ 'chat-contact-active': isChatContactActive }"
    :data-x="isChatContactActive"
  >
    <VBadge
      dot
      location="bottom right"
      offset-x="3"
      offset-y="3"
      :color="resolveAvatarBadgeVariant(props.user.status)"
      bordered
      :model-value="props.isChatContact"
    >
      <VAvatar
        size="40"
        :variant="!props.user.avatar ? 'tonal' : undefined"
        :color="!props.user.avatar ? resolveAvatarBadgeVariant(props.user.status) : undefined"
      >
        <VImg
          v-if="props.user.avatar"
          :src="props.user.avatar"
          alt="John Doe"
        />
        <span v-else>{{ avatarText(user.fullName) }}</span>
      </VAvatar>
    </VBadge>
    <div class="flex-grow-1 ms-4 overflow-hidden">
      <span>{{ props.user.fullName }}</span>
      <span class="d-block text-sm text-truncate text-medium-emphasis">{{ props.isChatContact && 'chat' in props.user ? props.user.chat.lastMessage.message : props.user.about }}</span>
    </div>
    <div
      v-if="props.isChatContact && 'chat' in props.user"
      class="d-flex flex-column align-self-start"
    >
      <span class="d-block text-disabled whitespace-no-wrap">{{ formatDateToMonthShort(props.user.chat.lastMessage.time) }}</span>
      <VBadge
        v-if="props.user.chat.unseenMsgs"
        color="error"
        inline
        :content="props.user.chat.unseenMsgs"
        class="ms-auto"
      />
    </div>
  </li>
</template>

<style lang="scss">
@use "@styles/variables/_vuetify.scss";
@use "@core/scss/base/mixins";
@use "vuetify/lib/styles/tools/states" as vuetifyStates;

.chat-contact {
  border-radius: vuetify.$border-radius-root;
  margin-block-end: 6px;
  padding-block: 12px;
  padding-inline: var(--chat-content-spacing-x);

  @include mixins.before-pseudo;
  @include vuetifyStates.states($active: false);

  &.chat-contact-active {
    background: linear-gradient(270deg, rgb(var(--v-theme-primary)) 0%, #fff 300%);
    color: #fff;

    --v-theme-on-background: #fff;

    .v-avatar {
      background: #fff;
    }
  }

  .v-badge--bordered .v-badge__badge::after {
    color: #fff;
  }
}
</style>
