<script setup>
import Calendar from '@/pages/apps/calendar.vue'
import Timeline from '@/pages/components/timeline.vue'
import CrmActivityTimeline from '@/views/dashboards/crm/CrmActivityTimeline.vue'
</script>

<template>
  <section>
    <VRow class="match-height">
      <VCol
        cols="12"
        md="8"
      >
        <div
          id="accordionExample"
          class="accordion"
        >
          <div class="accordion-item">
            <h2 class="accordion-header">
              <button
                class="accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseOne"
                aria-expanded="true"
                aria-controls="collapseOne"
              >
                Calendar
              </button>
            </h2>
            <div
              id="collapseOne"
              class="accordion-collapse collapse show"
              data-bs-parent="#accordionExample"
            >
              <div class="accordion-body">
                <Calendar />
              </div>
            </div>
          </div>
        </div>

        <!-- -->
        <ul class="nav nav-tabs">
          <li class="nav-item">
            <a
              class="nav-link active"
              aria-current="page"
              href="#"
            >식단</a>
            <div>
              <Timeline />
            </div>
          </li>
          <li class="nav-item">
            <a
              class="nav-link"
              aria-current="page"
              href="#"
            >경로</a>
          </li>
        </ul>
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
