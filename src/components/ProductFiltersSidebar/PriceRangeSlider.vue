<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  min: { type: Number, default: 0 },
  max: { type: Number, default: 100 },
  modelMin: { type: Number, default: 0 },
  modelMax: { type: Number, default: 100 },
})

const emit = defineEmits(['update:range'])

const localMin = ref(props.modelMin)
const localMax = ref(props.modelMax)
let lastEmitted = { min: null, max: null }

watch(
  () => [props.modelMin, props.modelMax],
  ([mn, mx]) => {
    localMin.value = mn
    localMax.value = mx
  }
)

function clampAndEmit() {
  let min = Math.min(localMin.value, localMax.value)
  let max = Math.max(localMin.value, localMax.value)
  min = Math.max(props.min, min)
  max = Math.min(props.max, max)
  if (lastEmitted.min === min && lastEmitted.max === max) return
  lastEmitted = { min, max }
  emit('update:range', min, max)
}

watch(
  [localMin, localMax],
  () => {
    clampAndEmit()
  }
)

watch(
  () => [props.min, props.max],
  () => {
    clampAndEmit()
  }
)

function onMinInput(e) {
  localMin.value = Number(e.target.value) || props.min
}

function onMaxInput(e) {
  localMax.value = Number(e.target.value) || props.max
}
</script>

<template>
  <div class="mb-6">
    <h3 class="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-2">Price Range</h3>
    <div class="flex items-center gap-2">
      <input
        type="number"
        :min="min"
        :max="max"
        :value="localMin"
        class="w-20 px-2 py-1 text-sm border border-gray-300 rounded"
        @input="onMinInput"
      />
      <span class="text-gray-500">–</span>
      <input
        type="number"
        :min="min"
        :max="max"
        :value="localMax"
        class="w-20 px-2 py-1 text-sm border border-gray-300 rounded"
        @input="onMaxInput"
      />
      <span class="text-sm text-gray-600">৳</span>
    </div>
    <input
      type="range"
      :min="min"
      :max="max"
      :value="localMin"
      class="mt-2 w-full"
      @input="onMinInput({ target: { value: $event.target.value } })"
    />
    <input
      type="range"
      :min="min"
      :max="max"
      :value="localMax"
      class="mt-1 w-full"
      @input="onMaxInput({ target: { value: $event.target.value } })"
    />
  </div>
</template>
