/* eslint-disable import/order */
import '@/@fake-db/db'
import '@/@iconify/icons-bundle'
import App from '@/App.vue'
import layoutsPlugin from '@/plugins/layouts'
import vuetify from '@/plugins/vuetify'
import { loadFonts } from '@/plugins/webfontloader'
import router from '@/router'
import friend from '@/views/pages/user-profile/friend/index.vue'
import '@core/scss/template/index.scss'
import '@styles/styles.scss'
import 'bootstrap'
import { createApp } from 'vue'
import store from './store'

// import 'bootstrap/dist/css/bootstrap.min.css'
import { createPinia } from 'pinia'

loadFonts()


// Create vue app
const app = createApp(App)

app.component('Friend', friend)

// Use plugins
app.use(vuetify)
app.use(createPinia())
app.use(router)
app.use(layoutsPlugin)
app.use(store) 

//app.use(xroute)
// Mount vue app
app.mount('#app')
