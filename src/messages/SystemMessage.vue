<template>
  <div class="sc-message--system">
    <slot :message="data">
      {{ data.text }}
      <p v-if="data.meta" class="sc-message--meta">
        {{ data.meta }}
      </p>
    </slot>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      required: true
    },
    messageColors: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
.sc-message--system {
  padding: 8px 20px;
  border-radius: 6px;
  font-weight: 300;
  background-color: rgb(234, 234, 234);
  font-size: 12px;
  line-height: 1.2;
  white-space: pre-wrap;
  -webkit-font-smoothing: subpixel-antialiased;
  font-style: italic;
  opacity: 0.65;
  color: red;
  margin-left: 10px;
}

.sc-message--meta {
     font-size: xx-small;
   margin-top: 0.65rem !important;
   color: rgb(97, 108, 118) !important;
   position: absolute !important;
   text-align: center;
}
</style>
