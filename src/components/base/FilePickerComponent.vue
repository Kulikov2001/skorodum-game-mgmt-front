<template>
    <div class="wrapper">
        <div v-if="false" class="pick">
            <div class="item">
                <img src="" alt="" class="ico" />
                <input type="file" @change="handleFileChange" ref="fileInput" hidden />
                <vs-button
                    @click="handleFileUpload"
                    :color="'var(--main)'"
                    :disabled="!selectedFile"
                    >Upload File</vs-button
                >
            </div>
        </div>
        <div v-if="true" class="exist">
            <div class="item">
                <img class="ico" src="" alt="" />
                <div class="meta">
                    <h4>File title info.mp4</h4>
                    <div class="size">999KB</div>
                </div>
                <img src="" class="delete" alt="" />
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref, computed } from 'vue'
import axios from 'axios'

const fileInput = ref(null)
const selectedFile = ref(null)
const uploadSuccess = ref(false)
const uploadedFile = ref('')

const handleFileChange = () => {
    selectedFile.value = fileInput.value.files[0]
}

const handleFileUpload = async () => {
    const formData = new FormData()
    formData.append('file', selectedFile.value)

    try {
        const response = await axios.post('path/to/your/upload-endpoint', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        uploadSuccess.value = true
        uploadedFile.value = response.data.file
    } catch (error) {
        console.error(error)
    }
}
</script>
<style scoped>
.wrapper {
    padding: 1em;
    border-radius: 2em;
    border: 2px dashed var(--text-darker);
    margin: 0.5em;
}
</style>
