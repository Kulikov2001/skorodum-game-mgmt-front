<template>
    <button
      v-bind="$attrs"
      :disabled="$attrs.disabled"
      :value="value"
      class="input-switch vs-switch--input"
      type="checkbox"
      @input="toggleValue"
    >
      <span
        ref="on"
        :class="{'active-text':isChecked || $attrs.checked}"
        class="text-on text-switch vs-switch--text"
      >
        <slot name="on" />
        <vs-icon
          :icon-pack="iconPack"
          :icon="vsIconOn || vsIcon"
          class="icons-switch vs-switch--icon"
        />
      </span>
      <span
        ref="off"
        :class="{'active-text':!isChecked && !$attrs.checked}"
        class="text-off text-switch vs-switch--text"
      >
        <slot name="off" />
        <vs-icon
          :icon-pack="iconPack"
          :icon="vsIconOff || vsIcon"
          class="icons-switch vs-switch--icon"
        />
      </span>
      <span class="vs-circle-switch vs-switch--circle" />
    </button>
  </template>
  
  <script setup lang="ts">
  <script setup lang="ts">
import { ref, computed, watchEffect } from 'vue'
import _color from './color.ts'

interface Props {
 value: any
 color: string
 vsIcon: string | null
 vsIconOn: string | null
 vsIconOff: string | null
 iconPack: string
 vsValue: any
}

const props = withDefaults(defineProps<Props>(), {
 value: null,
 color: 'primary',
 vsIcon: null,
 vsIconOn: null,
 vsIconOff: null,
 iconPack: 'material-icons',
 vsValue: null,
})

const on = ref<HTMLElement | null>(null)
const off = ref<HTMLElement | null>(null)
const widthx = ref(42)
const checkboxClicked = ref(false)

const isChecked = computed(() => {
 return Array.isArray(props.value) ? isArrayIncludes() : props.value
})

const style = computed(() => {
 return {
   background: props.value ? _color.getColor(props.color, 1) : null,
   width: `${widthx.value}px`,
 }
})

watchEffect(() => {
 if (on.value && off.value) {
   const w =
     on.value.clientWidth > off.value.clientWidth
       ? on.value.clientWidth
       : off.value.clientWidth
   widthx.value = w + 24
  }
})

const toggleValue = (evt: Event) => {
 if (Array.isArray(props.value)) {
  
setArray(evt) } else { emit('update:modelValue', !props.value) emit('change', evt) } }

const setArray = (evt: Event) => { const value = [...props.value] // Copy Array. if (isArrayIncludes()) { value.splice(value.indexOf(props.vsValue), 1) // delete value emit('update:modelValue', value) emit('change', evt) } else { value.push(props.vsValue) // add value new emit('update:modelValue', value) emit('change', evt) } }

const isArrayIncludes = () => { let modelx = props.value let value = props.vsValue return modelx.includes(value) }

const emit = defineEmits(['update:modelValue', 'change']) </script>
  </script>