<template>
  <div class="sc-suggestions-row">
    <button
      v-for="(suggestion, idx) in suggestions"
      :key="idx"
      class="sc-suggestions-element"

      @click="$emit('sendSuggestion', suggestion)"
    >
      {{ suggestion }}
    </button>
  </div>
</template>

<script>
export default {
  props: {
    suggestions: {
      type: Array,
      default: () => []
    },
    colors: {
      type: Object,
      required: true
    }
  },
  data() {
    return {}
  }
}
</script>

<style>
.sc-suggestions-row {
  text-align: center;
  background: inherit;
}

.sc-suggestions-element {
  display: inline-flex;
  vertical-align: top;
  -webkit-box-align: center;
  align-items: center;
  max-width: 100%;
  background: inherit;
  font-weight: 500;
  line-height: 1.2;
  outline: transparent solid 2px;
  outline-offset: 2px;
  border-radius: 0.375rem !important;
  min-height: 1.5rem;
  min-width: 1.5rem;
  font-size: 0.875rem !important;
  padding-inline-start: 0.5rem;
  padding-inline-end: 0.5rem;
  --badge-color: #718096;
  color: #3E63DD !important;
  box-shadow: inset 0 0 0px 1px #3E63DD;
  padding-top: 0.25rem !important;
  padding-bottom: 0.25rem !important;
  border: none !important;
  font-weight: 500;
}

.sc-suggestions-row {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 1rem;
  margin-top: 0.5rem;
  gap: 0.5;
}
</style>
