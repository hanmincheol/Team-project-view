<script setup>
import { useAppAbility } from '@/plugins/casl/useAppAbility'
import axios from '@axios'
import { useGenerateImageVariant } from '@core/composable/useGenerateImageVariant'
import authV2LoginIllustrationBorderedDark from '@images/pages/auth-v2-login-illustration-bordered-dark.png'
import authV2LoginIllustrationBorderedLight from '@images/pages/auth-v2-login-illustration-bordered-light.png'
import authV2LoginIllustrationDark from '@images/pages/auth-v2-login-illustration-dark.png'
import authV2LoginIllustrationLight from '@images/pages/auth-v2-login-illustration-light.png'
import authV2MaskDark from '@images/pages/auth-v2-mask-dark.png'
import authV2MaskLight from '@images/pages/auth-v2-mask-light.png'
import { VNodeRenderer } from '@layouts/components/VNodeRenderer'
import { themeConfig } from '@themeConfig'
import {
  requiredValidator,
} from '@validators'
import { VForm } from 'vuetify/components/VForm'

const isPasswordVisible = ref(false)
const authThemeImg = useGenerateImageVariant(authV2LoginIllustrationLight, authV2LoginIllustrationDark, authV2LoginIllustrationBorderedLight, authV2LoginIllustrationBorderedDark, true)
const authThemeMask = useGenerateImageVariant(authV2MaskLight, authV2MaskDark)
const route = useRoute()
const router = useRouter()
const ability = useAppAbility()

const errors = ref({
  email: undefined,
  password: undefined,
})

const refVForm = ref()
const id = ref('test')

//const email = ref('admin@demo.com')
//const password = ref('admin')
const rememberMe = ref(false)

const login = () => {
  axios.post('/auth/login', {
    email: email.value,
    password: password.value,
  }).then(r => {
    const { accessToken, userData, userAbilities } = r.data

    localStorage.setItem('userAbilities', JSON.stringify(userAbilities))
    ability.update(userAbilities)
    localStorage.setItem('userData', JSON.stringify(userData))
    localStorage.setItem('accessToken', JSON.stringify(accessToken))

    // Redirect to `to` query if exist or redirect to index route
    router.replace(route.query.to ? String(route.query.to) : '/')
  }).catch(e => {
    const { errors: formErrors } = e.response.data

    errors.value = formErrors
    console.error(e.response.data)
  })
}

const onSubmit = () => {
  refVForm.value?.validate().then(({ valid: isValid }) => {
    if (isValid)
      login()
  })
}

const loginpass = () => {
  router.push({ path: "/login" })
}
</script>

<template>
  <div>
    <!-- Title and Logo -->
    <div class="auth-logo d-flex align-start gap-x-3">
      <VNodeRenderer :nodes="themeConfig.app.logo" />

      <h1 class="font-weight-medium leading-normal text-2xl text-uppercase">
        {{ themeConfig.app.title }}
      </h1>
    </div>

    <VRow
      no-gutters
      class="auth-wrapper"
    >
      <VCol class="d-none d-lg-flex align-center justify-center position-relative" />

      <VCol
        cols="12"
        class="auth-card-v2 d-flex align-center justify-center"        
      >
        <VCard
          flat
          :max-width="500"
          class="mt-12 mt-sm-0 pa-4"
          style="width: 500px;height: 500px;border: solid 2px gray;"
        >
          <VCol class="text-center">
            <VCardText>              
              <h5 class="text-h5 mb-1">
                &#128100;{{ id }}
              </h5>
            </VCardText>
          </VCol>
          <VCardText>
            <VForm
              ref="refVForm"
              @submit.prevent="onSubmit"
            >
              <VRow>                
                <!-- password -->
                <VCol cols="12">  
                  <VTextField
                    v-model="password"
                    label="비밀번호"
                    :rules="[requiredValidator]"
                    :type="isPasswordVisible ? 'text' : 'password'"
                    :error-messages="errors.password"
                    :append-inner-icon="isPasswordVisible ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
                    @click:append-inner="isPasswordVisible = !isPasswordVisible"
                  />
                 

                  <div
                    class="d-flex align-center flex-wrap mt-1 mb-4"
                    style="justify-content: right;"
                  >
                    <VCol cols="12" />
                    <VBtn @click="loginpass">
                      다음
                    </VBtn>
                  </div>
                  <VCol
                    cols="12"                  
                    class="d-flex align-center"
                  />                  
                </VCol>

                <!-- create account -->                
                <VCol
                  cols="12"
                  class="text-center"
                  style="margin-top: -30px;"
                >
                  <RouterLink
                    class="text-primary ms-2 mb-1"
                    :to="{ name: 'forgot-password' }"
                  >
                    비밀번호 찾기
                  </RouterLink>
                </VCol>
              </VRow>
            </VForm>
          </VCardText>
        </VCard>
      </VCol>
    </VRow>
  </div>
</template>

<style lang="scss">
@use "@core/scss/template/pages/page-auth.scss";
</style>

<route lang="yaml">
meta:
  layout: blank
  action: read
  subject: Auth
  redirectIfLoggedIn: true
</route>
