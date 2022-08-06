<script setup>
import { ref, computed } from 'vue'
import styles from 'figma-plugin-ds/dist/figma-plugin-ds.css'

// const colorFindArray = ref([{ hex: '#000000' }])

const colorFind = ref('#000000')
const colorReplace = ref('#000000')
// const colorFindUpperCase = computed(() => {
//     return ref(colorFind.value.toUpperCase()).value
// })
// const colorReplaceUppercase = computed(() => {
//     return ref(colorReplace.value.toUpperCase()).value
// })

const addNewColor = () => {
    colorFindArray.value.push({ hex: '#000000' })
}

const reset = () => {
    colorFindArray.value = [{ hex: '#000000' }]
}

const create = () => {
    parent.postMessage(
        {
            pluginMessage: {
                type: 'apply-colors',
                colorFind: colorFind.value,
                colorReplace: colorReplace.value
            }
        },
        '*'
    )
}

const cancel = () => {
    parent.postMessage({ pluginMessage: { type: 'cancel' } }, '*')
}
</script>

<template>
    <label for="colorFind">Find your color</label>
    <br />
    <input id="colorFindPicker" type="color" v-model="colorFind" />
    <input id="colorFindText" type="text" v-model="colorFind" />
    <br />
    <label for="colorReplace">Replace by:</label>
    <br />
    <input id="colorReplacePicker" type="color" v-model="colorReplace" />
    <input id="colorReplaceText" type="text" v-model="colorReplace" />
    <br />
    <button @click="create">Create</button>
    <button @click="cancel">Cancel</button>
    <button @click="reset">reset</button>
</template>

<style>
input[type='color'] {
    background-color: transparent;
    height: 26px;
    width: 20px;
    border: none;
    padding: 0;
    margin: 0;
}
</style>
