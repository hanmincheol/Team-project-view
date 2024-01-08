<script setup>
import AuthProvider from '@/views/pages/authentication/AuthProvider.vue'
import { useGenerateImageVariant } from '@core/composable/useGenerateImageVariant'
import authV2LoginIllustrationBorderedDark from '@images/pages/auth-v2-login-illustration-bordered-dark.png'
import authV2LoginIllustrationBorderedLight from '@images/pages/auth-v2-login-illustration-bordered-light.png'
import authV2LoginIllustrationDark from '@images/pages/auth-v2-login-illustration-dark.png'
import authV2LoginIllustrationLight from '@images/pages/auth-v2-login-illustration-light.png'
import authV2MaskDark from '@images/pages/auth-v2-mask-dark.png'
import authV2MaskLight from '@images/pages/auth-v2-mask-light.png'
import tree from '@images/pages/tree.png'
import { VNodeRenderer } from '@layouts/components/VNodeRenderer'
import { themeConfig } from '@themeConfig'

import {
  requiredValidatorId,
} from '@validators'
const router = useRouter()

// const form = ref({
//   email: '',
//   password: '',
//   remember: false,
// })
const refVForm = ref()

const id = ref('')
const rememberMe = ref(false)

const isPasswordVisible = ref(false)
const authThemeImg = useGenerateImageVariant(authV2LoginIllustrationLight, authV2LoginIllustrationDark, authV2LoginIllustrationBorderedLight, authV2LoginIllustrationBorderedDark, true)
const authThemeMask = useGenerateImageVariant(authV2MaskLight, authV2MaskDark)

const loginId = () => {
  router.push({path:"/login-password"});
}
const loginNext = () => {
  refVForm.value?.validate().then(({ valid: isValid }) => {
    if (isValid)
      loginId()
  })
}
</script>

<template>
  <div>
    <video autoplay loop muted>
      <source src="@/assets/video/sample.mp4" type="video/mp4">
    </video>
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
      <VCol
        class="d-none d-md-flex align-center justify-center position-relative"
      >
      </VCol>

      <VCol
        cols="12"
        class="auth-card-v2 d-flex align-center justify-center"
      >
        <VCard
          flat
          :max-width="500"
          class="mt-12 mt-sm-0 pa-4"
          style="border:solid 2px gray;width:500px;height:500px;opacity: 0.8;"
        >
          <VCol
            class="text-center" 
          >
          
            <VCardText>              
              <h5 class="text-h5 mb-1">
                &#128100;로그인
              </h5>
            </VCardText>
          </VCol>
          <VCardText>
            <VForm
              ref="refVForm" 
              @submit.prevent="router.push('/')">
              <VRow>
                <!-- 아이디 입력란 -->
                <VCol cols="12">
                  <VTextField
                    v-model="id"
                    label="아이디"
                    type="id"
                    :rules="[requiredValidatorId]"
                  />
                </VCol>
                  <VCol cols="12">
                  <div class="d-flex align-center flex-wrap justify-space-between mt-1 mb-4">
                    <VCheckbox
                      v-model="rememberMe"
                      label="Remember me"
                    />
                    <VBtn @click="loginNext()">다음</VBtn>
                  </div>
                  <VCol
                    cols="12"                  
                    class="d-flex align-center"
                  >
                    <VDivider />
                    <span class="mx-4">or</span>
                    <VDivider />
                  </VCol>                  
                </VCol> 
                <!-- create account -->
                <VCol
                  cols="12"
                  class="text-center"
                  style="margin-top:-30px"
                >
                  <!-- /AuthProvider.vue -->
                  <!-- 소셜로그인(AuthProvider) 부분 정렬 -->                
                  <VCol
                    cols="12"
                    class="text-center"
                  >
                    <AuthProvider />
                  </VCol>
                  <span>서비스가 궁금하신가요?</span>
                  <RouterLink
                    class="text-primary ms-2"
                    :to="{ name: 'register' }"
                  >
                    회원가입
                  </RouterLink>
                  <br/><br/>
                  <RouterLink
                      class="text-primary ms-2 mb-1"
                      :to="{ name: 'forgot-id' }"
                    >
                      아이디 찾기
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
video {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>

<route lang="yaml">
meta:
  layout: blank
  action: read
  subject: Auth
  redirectIfLoggedIn: true
</route>
