<script setup>
import { ref } from 'vue'
import styles from 'figma-plugin-ds/dist/figma-plugin-ds.css'

const colorFind = ref('#000000')
const colorReplace = ref('#000000')

const create = () => {
    parent.postMessage({ pluginMessage: { type: 'apply-colors', colorFind: colorFind.value, colorReplace: colorReplace.value } }, '*')
}

const cancel = () => {
    parent.postMessage({ pluginMessage: { type: 'cancel' } }, '*')
}
</script>

<template>
    <div class="section-title">Find your color</div>

    <div class="color-picker-wrapper input">
        <input id="colorFindPicker" type="color" v-model="colorFind" />
        <input id="colorFindText" type="text" class="input__field" v-model="colorFind" />
    </div>

    <div class="section-title">Replace by:</div>
    <div class="color-picker-wrapper input">
        <input id="colorReplacePicker" type="color" v-model="colorReplace" />
        <input id="colorReplaceText" type="text" class="input__field" v-model="colorReplace" />
    </div>

    <div class="button-group">
        <button class="button button--secondary" @click="cancel">Cancel</button>
        <button class="button button--primary" @click="create">Apply</button>
    </div>
    <footer>
        <p id="version" class="type">v1.1.0</p>
        <a href="https://www.github.com/maximedaraize/find-and-replace" target="_blank" rel="noopener noreferrer" class="button button--tertiary">
            Open a issue on Github</a
        >
    </footer>
</template>

<style>
.color-picker-wrapper {
    display: flex;
    align-items: center;
}

input[type='text'] {
    max-width: 100px;
    text-transform: uppercase;
}
input[type='color'] {
    background-color: transparent;
    height: 28px;
    width: 24px;
    border: none;
    padding-left: 0;
    margin-left: 8px;
    border: none;
}

.button-group {
    display: flex;
    align-items: center;
    column-gap: 8px;
    margin-top: 8px;
    margin-right: 8px;
    justify-content: flex-end;
}

footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 8px;
    margin-inline: 8px;
}
</style>
