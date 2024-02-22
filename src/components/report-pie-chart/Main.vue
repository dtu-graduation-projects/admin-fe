<template>
    <Chart type="pie" :width="width" :height="height" :data="data" :options="options" />
</template>

<script setup>
import { computed } from "vue";
import { useDarkModeStore } from "@/stores/dark-mode";
import { useColorSchemeStore } from "@/stores/color-scheme";
import { colors } from "@/utils/colors";
import { onMounted, ref, inject, watch } from "vue";
const props = defineProps({
  width: {
    type: [Number, String],
    default: "auto",
  },
  height: {
    type: [Number, String],
    default: "auto",
  },
  listPercentCategory: {
    type: Object,
    required: true,
    default: () => ({}),
  },
});

const darkMode = computed(() => useDarkModeStore().darkMode);
const colorScheme = computed(() => useColorSchemeStore().colorScheme);



const chartColors = () => {
  const initialColors = [
    colors.primary(0.9),
    colors.warning(0.9),
    colors.pending(0.9),
  ];

  if (props.listPercentCategory.pricePercentage.other) {
    initialColors.unshift(colors.secondary(0.9))
  }

  return initialColors;
};
const init = () => {
  watch(props, () => {
    console.log(props.listPercentCategory);
  });

};

onMounted(() => {
  init();
});
const data = computed(() => {
  const chartData = [];
  const labels = [];
  if (props.listPercentCategory.pricePercentage) {
    props.listPercentCategory.pricePercentage.top3.map((item, index) => {
      chartData.push(item[1])
      labels.push(item[0])
    })
    if (props.listPercentCategory.pricePercentage.other) {
      chartData.push(props.listPercentCategory.pricePercentage.other)
      labels.push('Other')
    }
    chartData.reverse()
    labels.reverse()
  }
  return {
    labels: labels,
    datasets: [
      {
        data: chartData,
        backgroundColor: colorScheme.value ? chartColors() : "",
        hoverBackgroundColor: colorScheme.value ? chartColors() : "",
        borderWidth: 5,
        borderColor: darkMode.value ? colors.darkmode[700]() : colors.white,
      },
    ],
  };
});

const options = computed(() => {
  return {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
  };
});
</script>
