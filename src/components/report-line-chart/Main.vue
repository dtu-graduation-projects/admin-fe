<template>
    <Chart type="line" :width="width" :height="height" :data="data" :options="options" />
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
  calculateMonthCategory: {
    type: Object,
    required: true,
    default: () => ({}),
  },
});
const chartRef = ref();
const init = () => {
  watch(props, () => {
    console.log(props.calculateMonthCategory);
  });

};

onMounted(() => {
  init();
});

const darkMode = computed(() => useDarkModeStore().darkMode);
const colorScheme = computed(() => useColorSchemeStore().colorScheme);

const data = computed(() => {
  const totalPrices = [];

  for (const month in props.calculateMonthCategory) {
    totalPrices.push(props.calculateMonthCategory[month].priceTotal);
  }
  return {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "# of Votes",
        data: totalPrices,
        borderWidth: 2,
        borderColor: colorScheme.value ? colors.primary(0.8) : "",
        backgroundColor: "transparent",
        pointBorderColor: "transparent",
        tension: 0.4,
      },
      {
        label: "# of Votes",
        data: [0, 300, 400, 560, 320, 600, 720, 850, 690, 805, 1200, 1010],
        borderWidth: 2,
        borderDash: [2, 2],
        borderColor: darkMode.value
          ? colors.slate["400"](0.6)
          : colors.slate["400"](),
        backgroundColor: "transparent",
        pointBorderColor: "transparent",
        tension: 0.4,
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
    scales: {
      x: {
        ticks: {
          font: {
            size: 12,
          },
          color: colors.slate["500"](0.8),
        },
        grid: {
          display: false,
          drawBorder: false,
        },
      },
      y: {
        ticks: {
          font: {
            size: 12,
          },
          color: colors.slate["500"](0.8),
          callback: function (value) {
            return "$" + value;
          },
        },
        grid: {
          color: darkMode.value
            ? colors.slate["500"](0.3)
            : colors.slate["300"](),
          borderDash: [2, 2],
          drawBorder: false,
        },
      },
    },
  };
});
</script>
