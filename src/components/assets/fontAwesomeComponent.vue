<script setup lang="ts">
// Libraries
import { library } from "@fortawesome/fontawesome-svg-core";

// Icons
import { fas as freeSolidIcons } from "@fortawesome/free-solid-svg-icons";
import { far as freeRegularIcons } from "@fortawesome/free-regular-svg-icons";

//Components
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

defineProps<{
  type: "solid" | "regular",
  icon: string,
  size?: "2xs" | "xs" | "sm" | "lg" | "xl" | "2xl" | "1x" | "2x" | "3x" | "4x" | "5x" | "6x" | "7x" | "8x" | "9x" | "10x"
}>();

library.add(freeSolidIcons, freeRegularIcons);
</script>

<template>
  <FontAwesomeIcon :icon="`fa-${type} fa-${icon}`" :size="size" />
</template>