<script setup lang="ts">
import { getHorizontalBarChartConfig } from '@core/libs/chartjs/chartjsConfig';
import BarChart from '@core/libs/chartjs/components/BarChart';
import { computed } from 'vue';
import { useTheme } from 'vuetify';



const vuetifyTheme = useTheme()

const chartOptions = computed(() => getHorizontalBarChartConfig(vuetifyTheme.current.value))

var currCalorie = 1000; //현재 칼로리
var recommCalorie = 2100; //권장 칼로리
var barColor = '#87DBC6';
if (currCalorie > recommCalorie) {
  barColor = '#FD696E';
}
else if (currCalorie < recommCalorie) {
  barColor = '#A8FED7';
}

const data = {
  labels: [''],
  datasets: [
    {
      maxBarThickness: 30,
      label: '권장 칼로리',
      backgroundColor: '#87DBC6',
      borderColor: 'transparent',
      data: [recommCalorie],
    },
    {
      maxBarThickness: 30,
      backgroundColor: barColor,
      label: '누적 칼로리',
      borderColor: 'transparent',
      data: [currCalorie],
    },
  ],
}
</script>

<template>
  <BarChart
    :height="300"
    :chart-data="data"
    :chart-options="chartOptions"
  />
</template>
