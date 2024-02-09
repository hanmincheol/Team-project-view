import mock from '@/@fake-db/mock'
import { genId } from '@/@fake-db/utils'

// Images
import avatar1 from '@images/avatars/avatar-1.png'
import avatar2 from '@images/avatars/avatar-2.png'
import avatar5 from '@images/avatars/avatar-5.png'

const previousDay = new Date(new Date().getTime() - 24 * 60 * 60 * 1000)
const dayBeforePreviousDay = new Date(new Date().getTime() - 24 * 60 * 60 * 1000 * 2)


const database = {
  profileUser: {
    id: 11,
    avatar: avatar1,
    fullName: '안녕',
    status: 'online',
    settings: {
      isTwoStepAuthVerificationEnabled: true,
      isNotificationsOn: false,
    },
  },
  contacts: [
    {
      id: 1,
      fullName: 'Gavin Griffith',
      avatar: avatar5,
      status: 'offline',
    },
    {
      id: 2,
      fullName: 'Harriet McBride',
      about: 'Toffee caramels jelly-o tart gummi bears cake I love ice cream lollipop. Sweet liquorice croissant candy danish dessert icing. Cake macaroon gingerbread toffee sweet.',
      avatar: avatar2,
      status: 'busy',
    },
  ],
  chats: [
    {
      id: 1,
      userId: 2,
      unseenMsgs: 0,
      messages: [
        {
          message: 'Hi',
          time: 'Mon Dec 10 2018 07:45:00 GMT+0000 (GMT)',
          senderId: 11,
          feedback: {
            isSent: true,
            isDelivered: true,
            isSeen: true,
          },
        },
      ],
    },
    {
      id: 2,
      userId: 1,
      unseenMsgs: 1,
      messages: [
        {
          message: 'How can we help? We\'re here for you!',
          time: 'Mon Dec 10 2018 07:45:00 GMT+0000 (GMT)',
          senderId: 11,
          feedback: {
            isSent: true,
            isDelivered: true,
            isSeen: true,
          },
        },
      ],
    },
  ],
}


// ------------------------------------------------
// GET: Return Chats Contacts and Contacts
// ------------------------------------------------
mock.onGet('/apps/chat/chats-and-contacts').reply(async config => {
  const { q = '' } = config.params

  const qLowered = q.toLowerCase()

  const chatsContacts = database.chats
    .map(chat => {
      const contact = JSON.parse(JSON.stringify(database.contacts.find(c => c.id === chat.userId)))

      contact.chat = { id: chat.id, unseenMsgs: chat.unseenMsgs, lastMessage: chat.messages.at(-1) }
      
      return contact
    })
    .reverse()

  const profileUserData = database.profileUser

  const response = {
    chatsContacts: chatsContacts.filter(c => c.fullName.toLowerCase().includes(qLowered)),
    contacts: database.contacts.filter(c => c.fullName.toLowerCase().includes(qLowered)),
    profileUser: profileUserData,
  }

  return [200, response]
})

// ------------------------------------------------
// GET: Return Single Chat
// ------------------------------------------------
mock.onGet('/apps/chat/users/profile-user').reply(() => [200, database.profileUser])

// ------------------------------------------------
// GET: Return Single Chat
// ------------------------------------------------
// 첫 번째 부분: 특정 사용자의 채팅을 반환하는 GET 요청을 처리합니다.
mock.onGet(/\/apps\/chat\/chats\/\d+/).reply(config => {
  // 요청 URL에서 사용자 ID를 추출합니다.
  const userId = Number(config.url?.substring(config.url.lastIndexOf('/') + 1))

  // 사용자 ID를 사용하여 해당 사용자의 채팅을 데이터베이스에서 찾습니다.
  const chat = database.chats.find(c => c.userId === userId)

  // 채팅이 있으면 unseenMsgs를 0으로 설정합니다.
  if (chat)
    chat.unseenMsgs = 0

  // HTTP 상태 코드 200과 함께 채팅과 연락처 정보를 반환합니다.
  return [
    200,
    {
      chat,
      contact: database.contacts.find(c => c.id === userId),
    },
  ]
})

// 두 번째 부분: 새 채팅 메시지를 추가하는 POST 요청을 처리합니다.
mock.onPost(/\/apps\/chat\/chats\/\d+/).reply(config => {
  // URL에서 연락처 ID를 추출합니다.
  const contactId = Number(config.url?.substring(config.url.lastIndexOf('/') + 1))

  // POST 데이터에서 메시지와 보낸이 ID를 추출합니다.
  const { message, senderId } = JSON.parse(config.data)

  // 데이터베이스에서 해당 연락처의 채팅을 찾습니다.
  let activeChat = database.chats.find(chat => chat.userId === contactId)
  
  // 새 메시지 데이터를 생성합니다. 이 데이터는 메시지, 시간, 보낸이 ID, 그리고 피드백 정보를 포함합니다.
  const newMessageData = {
    message,
    time: String(new Date()),
    senderId,
    feedback: {
      isSent: true,
      isDelivered: false,
      isSeen: false,
    },
  }

  // 해당 연락처에 대한 채팅이 없으면 새로운 채팅을 생성하고, 데이터베이스에 추가합니다.
  let isNewChat = false
  if (activeChat === undefined) {
    isNewChat = true
    database.chats.push({
      id: genId(database.chats),
      userId: contactId,
      unseenMsgs: 0,
      messages: "" })

    // 새로운 채팅을 활성 채팅으로 설정합니다.
    activeChat = database.chats.at(-1)
  }
  else {
    // 채팅이 이미 있다면, 새 메시지를 채팅에 추가합니다.
    activeChat.messages.push(newMessageData)
  }

  // HTTP 상태 코드 201과 함께 새 메시지를 반환합니다.
  const response = { msg: newMessageData }

  // 새로운 채팅이 생성되었다면, 이 채팅도 함께 반환합니다.
  if (isNewChat)
    response.chat = activeChat
  
  return [201, response]
})
