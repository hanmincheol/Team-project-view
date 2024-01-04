<script setup>
import Calendar from '@/pages/apps/calendar.vue'
import Timeline from '@/pages/components/timeline.vue'
import CrmActivityTimeline from '@/views/dashboards/crm/CrmActivityTimeline.vue'

const userTab = ref(null)

const tabs = [
  {
    icon: 'mdi-account-outline',
    title: '항목에',
  },
  {
    icon: 'mdi-lock-outline',
    title: '원하는',
  },
  {
    icon: 'mdi-bookmark-outline',
    title: '제목',
  },
  {
    icon: 'mdi-bell-outline',
    title: '정해서',
  },
  {
    icon: 'mdi-link-variant',
    title: '넣기',
  },
]
</script>

<template>
  <section>
    <VRow class="match-height">
      <VCol
        cols="12"
        md="8"
      >
        <VExpansionPanels variant="accordion">
          <VExpansionPanel
            v-for="item in 1"
            :key="item"
          >
            <VExpansionPanelTitle>
              <h6 class="text-h6">
                Calendar
              </h6>
            </VExpansionPanelTitle>
            <VExpansionPanelText>
              <Calendar />
            </VExpansionPanelText>
          </VExpansionPanel>
        </VExpansionPanels>

        <!-- -->
        <VTabs
          v-model="userTab"
          class="v-tabs-pill"
        >
          <VTab
            v-for="tab in tabs"
            :key="tab.icon"
          >
            <VIcon
              start
              :icon="tab.icon"
            />
            <span>{{ tab.title }}</span>
          </VTab>
        </VTabs>   
        
        <VWindow
          v-model="userTab"
          class="mt-6 disable-tab-transition"
          :touch="false"
        >
          <VWindowItem>
            가져올 페이지나 내용 작성
            <Calendar />
          </VWindowItem>

          <VWindowItem>
            <CrmActivityTimeline />
          </VWindowItem>

          <VWindowItem>
            제목에 맞는
          </VWindowItem>

          <VWindowItem>
            내용 정해서
          </VWindowItem>

          <VWindowItem>
            넣기
          </VWindowItem>
        </VWindow>

        <!-- -->
      </VCol>

      <VCol
        cols="12"
        md="4"
      >
        <CrmActivityTimeline />
        <Timeline />
      </VCol>
    </VRow>
  </section>
</template>

<style lang="scss">
  @use "@core/scss/template/libs/apex-chart.scss";
</style>
