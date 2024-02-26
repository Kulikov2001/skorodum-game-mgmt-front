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
            :class="{ 'active-text': isChecked || $attrs.checked }"
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
            :class="{ 'active-text': !isChecked && !$attrs.checked }"
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
import { ref, computed, watchEffect } from 'vue'
import _color from './color.ts'

const props = defineProps({
    value: { default: null },
    color: { default: 'primary', type: String },
    vsIcon: { default: null, type: String },
    vsIconOn: { default: null, type: String },
    vsIconOff: { default: null, type: String },
    iconPack: { default: 'material-icons', type: String },
    vsValue: { default: null }
})

const on = ref(null)
const off = ref(null)
const widthx = ref(42)
const checkboxClicked = ref(false)

const isChecked = computed(() => {
    return Array.isArray(props.value) ? isArrayIncludes() : props.value
})

const style = computed(() => {
    return {
        background: props.value ? _color.getColor(props.color, 1) : null,
        width: `${widthx.value}px`
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

const toggleValue = (evt) => {
    if (Array.isArray(props.value)) {
        setArray(evt)
    } else {
        emit('input', !props.value)
        emit('change', evt)
    }
}

const setArray = (evt) => {
    const value = props.value.slice(0) // Copy Array.
    if (isArrayIncludes()) {
        value.splice(value.indexOf(props.vsValue), 1) // delete value
        emit('input', value)
        emit('change', evt)
    } else {
        value.push(props.vsValue) // add value new
        emit('input', value)
        emit('change', evt)
    }
}

const isArrayIncludes = () => {
    let modelx = props.value
    let value = props.vsValue
    return modelx.includes(value)
}
</script>
