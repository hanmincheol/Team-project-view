<script setup>
import ChatContact from '@/views/apps/chat/ChatContact.vue'
import { useChatStore } from '@/views/apps/chat/useChatStore'
import axios from '@axios'
import { onMounted, ref } from 'vue'
import { PerfectScrollbar } from 'vue3-perfect-scrollbar'
import { useChat } from './useChat'

const props = defineProps({
  search: {
    type: String,
    required: true,
  },
  isDrawerOpen: {
    type: Boolean,
    required: true,
  },
})

const emit = defineEmits([
  'openChatOfContact',
  'showUserProfile',
  'close',
  'update:search',
])

onMounted(async () => {
  //실제 사용자 ID 넣기!!!
  await fetchDatabase('LSY')
  await fetchFriendDatabase('LSY')
})

const database = ref({
  profileUser: {
    id: null,
    avatar: null,
    fullName: null,
  },
  contacts: [],  // 친구 목록을 저장할 배열
})

async function fetchDatabase(userId) {
  try {
    console.log("userId:", userId)

    const response = await axios.get("http://localhost:4000/comm/profile", { params: { id: userId } })

    console.log("response.data:", response.data)

    database.value.profileUser.id = userId
    database.value.profileUser.avatar = response.data.profilePath
    database.value.profileUser.fullName = response.data.name

    console.log("database.profileUser.id", database.value.profileUser.id)
    console.log("database.profileUser.avatar", database.value.profileUser.avatar)
    console.log("database.profileUser.fullName", database.value.profileUser.fullName)
  
  } catch (error) {
    console.error(`데이터를 가져오는데 실패했습니다: ${error}`)
  }
}

async function fetchFriendDatabase(userId) {
  try {
    console.log("userId:", userId)

    const response = await axios.get("http://localhost:4000/comm/friend", { params: { id: userId } })

    console.log("response.data:", response.data)

    response.data.forEach(item => {
      database.value.contacts.push({
        id: item.friend_id,
        avatar: item.profilePath,
        fullName: item.name,
        status: item.status || 'offline', 
      })
    })

    database.value.contacts.forEach((contact, index) => {
      console.log(`database.contacts[${index}].id`, contact.id)
      console.log(`database.contacts[${index}].avatar`, contact.avatar)
      console.log(`database.contacts[${index}].fullName`, contact.fullName)
    })
  
  } catch (error) {
    console.error(`데이터를 가져오는데 실패했습니다: ${error}`)
  }
}

const { resolveAvatarBadgeVariant } = useChat()
const search = useVModel(props, 'search', emit)
const store = useChatStore()
</script>

<template>
  <!-- 👉 Chat list header -->
  <div
    v-if="database.profileUser"
    class="chat-list-header"
  >
    <VBadge
      dot
      location="bottom right"
      offset-x=""
      offset-y="3"
      size="8"
      :color="resolveAvatarBadgeVariant(database.profileUser.status)"
      bordered
    >
      <VAvatar
        size="40"
        class="cursor-pointer"
        @click="$emit('showUserProfile')"
      >
        <VImg
          :src="database.profileUser.avatar"
          :alt="database.profileUser.fullName"
        />
      </VAvatar>
    </VBadge>

    <VTextField
      v-model="search"
      density="compact"
      placeholder="검색할 단어를 입력해주세요"
      prepend-inner-icon="mdi-magnify"
      class="ms-4 me-1 chat-list-search"
    />

    <IconBtn
      v-if="$vuetify.display.smAndDown"
      @click="$emit('close')"
    >
      <VIcon
        icon="mdi-close"
        class="text-medium-emphasis"
      />
    </IconBtn>
  </div>
  <VDivider />

  <PerfectScrollbar
    tag="ul"
    class="chat-contacts-list px-3"
    :options="{ wheelPropagation: false }"
  >
    <li>
      <span class="chat-contact-header d-block text-primary text-xl font-weight-medium">채팅방</span>
    </li>
    <ChatContact
      v-for="contact in store.chatsContacts"
      :key="`chat-${contact.id}`"
      :user="contact"
      is-chat-contact
      @click="$emit('openChatOfContact', contact.id)"
    />
    <span
      v-show="!store.chatsContacts.length"
      class="no-chat-items-text text-disabled"
    >존재하지 않습니다.</span>
    <li>
      <span class="chat-contact-header d-block text-primary text-xl font-weight-medium">친구 목록</span>
    </li>
    <ChatContact
      v-for="contact in database.contacts"
      :key="`chat-${contact.id}`"
      :user="contact"
      @click="$emit('openChatOfContact', contact.id)"
    />
    <span
      v-show="!database.contacts.length"
      class="no-chat-items-text text-disabled"
    >존재하지 않습니다.</span>
  </PerfectScrollbar>
</template>

<style lang="scss">
.chat-contacts-list {
  --chat-content-spacing-x: 12px;

  padding-block-end: 0.75rem;

  .chat-contact-header {
    margin-block-end: 1rem;
    margin-block-start: 1.25rem;
  }

  .chat-contact-header,
  .no-chat-items-text {
    margin-inline: var(--chat-content-spacing-x);
  }
}
</style>
