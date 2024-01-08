<script setup>
import AuthProvider from '@/views/pages/authentication/AuthProvider.vue'
import { useGenerateImageVariant } from '@core/composable/useGenerateImageVariant'
import tree from '@images/pages/tree.png'
import { VNodeRenderer } from '@layouts/components/VNodeRenderer'
import { themeConfig } from '@themeConfig'
import authV2LoginIllustrationBorderedDark from '@images/pages/auth-v2-login-illustration-bordered-dark.png'
import authV2LoginIllustrationBorderedLight from '@images/pages/auth-v2-login-illustration-bordered-light.png'
import authV2LoginIllustrationDark from '@images/pages/auth-v2-login-illustration-dark.png'
import authV2LoginIllustrationLight from '@images/pages/auth-v2-login-illustration-light.png'
import authV2MaskDark from '@images/pages/auth-v2-mask-dark.png'
import authV2MaskLight from '@images/pages/auth-v2-mask-light.png'
import {
  requiredValidatorPw,
} from '@validators'

const router = useRouter()
const refVForm = ref()
const id = ref('test')
const password = ref('')
const form = ref({
  email: '',
  password: '',
  remember: false,
})

const isPasswordVisible = ref(false)
const authThemeImg = useGenerateImageVariant(authV2LoginIllustrationLight, authV2LoginIllustrationDark, authV2LoginIllustrationBorderedLight, authV2LoginIllustrationBorderedDark, true)
const authThemeMask = useGenerateImageVariant(authV2MaskLight, authV2MaskDark)
const login = () => {
  router.push({path:"/"});
}

const loginNext = () => {
  refVForm.value?.validate().then(({ valid: isValid }) => {
    if (isValid)
      login()
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
                &#128100;{{id}}
              </h5>
            </VCardText>
          </VCol>
          <VCardText>
            <VForm 
              ref="refVForm"
              @submit.prevent="router.push('/')">
              <VRow>
                <!-- 비밀번호 입력란 -->
                <VCol cols="12">
                  <VTextField
                    v-model="form.password"
                    label="비밀번호"
                    :rules="[requiredValidatorPw]"
                    :type="isPasswordVisible ? 'text' : 'password'"
                    :append-inner-icon="isPasswordVisible ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
                    @click:append-inner="isPasswordVisible = !isPasswordVisible"
                  />
                  <div class="d-flex align-center flex-wrap mt-1 mb-4" style="justify-content:right">
                    <VCol cols="12"/>
                    <VBtn @click="loginNext()">다음</VBtn>
                  </div>
                  <VCol cols="12"/>
                </VCol>

                 
                <!-- create account -->                
                <VCol
                  cols="12"
                  class="text-center"
                  style="margin-top:-30px"
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
