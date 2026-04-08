<script setup>
const props = defineProps({
  title: { type: String, required: true },
  type: { type: String, default: 'checkbox' },
  options: { type: Array, default: () => [] },
  name: { type: String, default: 'filter' },
  modelValue: { type: [String, Number, Array], default: undefined },
  valueKey: { type: String, default: undefined },
  labelKey: { type: String, default: undefined },
})

const emit = defineEmits(['update:modelValue'])

const isOptionObject = (opt) => opt && typeof opt === 'object'

function getValue(opt) {
  if (props.valueKey && isOptionObject(opt)) return opt[props.valueKey]
  return isOptionObject(opt) ? opt.value : opt
}

function getLabel(opt) {
  if (props.labelKey && isOptionObject(opt)) return opt[props.labelKey]
  return isOptionObject(opt) ? opt.label : opt
}

function isChecked(opt) {
  
  const val = getValue(opt)
  if (props.type === 'radio') return props.modelValue === val
  if (Array.isArray(props.modelValue)) return props.modelValue.includes(val)
  return false
}

function onRadioChange(opt) {
  emit('update:modelValue', getValue(opt))
}

function onCheckboxChange(opt, checked) {
  const val = getValue(opt)
  const arr = Array.isArray(props.modelValue) ? [...props.modelValue] : []
  if (checked) {
    if (!arr.includes(val)) arr.push(val)
  } else {
    const i = arr.indexOf(val)
    if (i !== -1) arr.splice(i, 1)
  }
  emit('update:modelValue', arr)
}
</script>

<template>
  <div class="mb-6">
    <h3 class="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-3">{{ title }}</h3>
    <div class="space-y-2">
      <template v-for="(opt, idx) in options" :key="idx">
        <label
          v-if="type === 'radio'"
          class="flex items-center gap-2 cursor-pointer"
        >
          <input
            type="radio"
            :name="name"
            :value="getValue(opt)"
            :checked="isChecked(opt)"
            class="rounded border-gray-300 text-header-blue focus:ring-header-blue"
            @change="onRadioChange(opt)"
          />
          <span class="text-sm text-gray-700">{{ getLabel(opt) }}</span>
        </label>
        <label
          v-else
          class="flex items-center gap-2 cursor-pointer"
        >
          <input
            type="checkbox"
            :checked="isChecked(opt)"
            class="rounded border-gray-300 text-header-blue focus:ring-header-blue"
            @change="onCheckboxChange(opt, ($event.target).checked)"
          />
          <span class="text-sm text-gray-700">{{ getLabel(opt) }}</span>
        </label>
      </template>
    </div>
  </div>
</template>
