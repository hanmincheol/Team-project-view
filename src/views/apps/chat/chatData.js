import { ref, onMounted } from 'vue'
import axios from '@axios'
import { useStore } from 'vuex'

export default function useDatabase() {
  const store = useStore()
  const userInfo = computed(() => store.state.userStore.userInfo)
  const connetId = userInfo.value.id

  const database = ref({
    profileUser: {
      id: null,
      avatar: null,
      fullName: null,
      status: null,
    },
    contacts: [],  // 친구 목록을 저장할 배열
    chats: [],
    isLoading: true,
  })

  const chatsContacts = database.value.chats
    .map(chat => {
      const contact = JSON.parse(JSON.stringify(database.value.contacts.find(c => c.id === chat.userId)))
    
      contact.chat = { id: chat.id, unseenMsgs: chat.unseenMsgs, lastMessage: chat.messages.at(-1) }
    
      return contact
    })
    .reverse()

  let activeChat = database.value.chats.find(chat => chat.userId === connetId)

  async function fetchDatabase(userId) {
    try {
      console.log("userId:", userId)
      
      const response = await axios.get("http://localhost:4000/comm/profile", { params: { id: userId } })
      
      console.log("response.data:", response.data)
      database.value.profileUser.id = userId
      database.value.profileUser.avatar = response.data.profilePath
      database.value.profileUser.fullName = response.data.name
      database.value.profileUser.status = 'online'
      console.log("database.profileUser.id", database.value.profileUser.id)
      console.log("database.profileUser.avatar", database.value.profileUser.avatar)
      console.log("database.profileUser.fullName", database.value.profileUser.fullName)
    } catch (error) {
      console.error(`데이터를 가져오는데 실패했습니다: ${error}`)
    }
  }
      
  async function allData(userId) {
    try {
      console.log("userId:", userId)
      
      const response = await axios.get("http://localhost:4000/chat/allChating.do", { params: { id: userId } })
      
      console.log("response.data:", response.data)
      response.data.forEach((item, index) => {
        database.value.chats.push({
          id: index,
          userId: item.ruser,
          unseenMsgs: 0,
          fullName: item.name,
          messages: [
            {
              message: item.content,
              time: item.sendDate,
              senderId: userId,
              feedback: {
                isSent: true,
                isDelivered: true,
                isSeen: false,
              },
            },
          ],
        })
      })
      database.value.chats.forEach((chat, index) => {
        console.log(`database.chats[${index}].id`, chat.id)
        console.log(`database.chats[${index}].userId`, chat.userId)
        console.log(`database.chats[${index}].unseenMsgs`, chat.unseenMsgs)
        console.log(`database.chats[${index}].fullName`, chat.fullName)
        chat.messages.forEach((message, msgIndex) => {
          console.log(`database.chats[${index}].messages[${msgIndex}].message`, message.message)
          console.log(`database.chats[${index}].messages[${msgIndex}].time`, message.time)
          console.log(`database.chats[${index}].messages[${msgIndex}].senderId`, message.senderId)
          console.log(`database.chats[${index}].messages[${msgIndex}].feedback.isSent`, message.feedback.isSent)
          console.log(`database.chats[${index}].messages[${msgIndex}].feedback.isDelivered`, message.feedback.isDelivered)
          console.log(`database.chats[${index}].messages[${msgIndex}].feedback.isSeen`, message.feedback.isSeen)
        })
      })
      
      
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
          status: 'online',
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
  
  onMounted(async () => {
    //실제 사용자 ID 넣기!!!
    try {
      await Promise.all([
        fetchDatabase(connetId),
        fetchFriendDatabase(connetId),
        allData(connetId),
      ])

      // 모든 데이터를 불러온 후 isLoading 상태를 false로 설정
      database.value.isLoading = false
    } catch (error) {
      console.error(`데이터를 가져오는데 실패했습니다: ${error}`)
      database.value.isLoading = false
    }
  })
  

  return {
    database,
    fetchDatabase,
    fetchFriendDatabase,
    allData,
    chatsContacts,
    connetId,
    activeChat,
  }
}

// 다른 컴포넌트에서 사용할 때
//import useDatabase from '@/views/apps/chat/chatData.js'
//const { database, fetchDatabase, fetchFriendDatabase, allData, chatsContacts, connetId, activeChat } = useDatabase()
