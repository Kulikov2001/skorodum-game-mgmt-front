<template>
    <div class="wrapper">
        <input type="file" @change="handleFileChange" ref="fileInput" />
        <div v-if="true" class="pick">
            <div class="item">
                <img src="" alt="" class="ico" />
                <button @click="selectFile" :color="'var(--main)'">Upload File</button>
                <!-- vs-button -->
            </div>
        </div>
        <div v-if="false" class="exist">
            <div class="item">
                <img class="ico" src="" alt="" />
                <div class="meta">
                    <MediaPic
                        width="56"
                        style="float: left; margin-right: 1em; vertical-align: text-top"
                    />
                    <h4>{{ fileName }}</h4>
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
import { config } from '@/config'
import MediaPic from '@/assets/MediaPic.vue'
import type { IMedia } from '@/stores/game'
import { useGameStore } from '@/stores/game'
const store = useGameStore()
const props = defineProps<{
    role: IRole
}>()
interface IRole {
    position: string
    type?: string
}
const VIDEO_EXTENSTION = ['mov', 'avi', 'mp4', 'webm', 'mkv', 'm4v', 'wmv', 'flv']
const PHOTO_EXTENSTION = [
    'jpg',
    'jpeg',
    'jfif',
    'jif',
    'jpe',
    'heif',
    'heic',
    'png',
    'gif',
    'svg',
    'webp',
    'tiff'
]
const qmedia: IMedia = {
    id: 1,
    show_image: true,
    video: {
        before: 'mybeforevide.mp4',
        after: 'myaftervideo.mp4'
    },
    image: {
        before: '',
        after: '',
        player_displayed: false
    }
}
const fileInput = ref<any>(null)
const selectedFile = ref<any>(null)
const uploadSuccess = ref<boolean>(false)
const uploadedFile = ref<string>('')
const fileType = ref<string>('')

const fileName = computed(() => {
    return 'supermedia'
})

const handleFileChange = () => {
    const _fileInput = fileInput.value.files[0]

    const ext = _fileInput[_fileInput.name.split('.').length - 1].toLowerCase()

    if (VIDEO_EXTENSTION.map((allowed: string) => allowed === ext).includes(true)) {
        handleFileUpload()
    } else if (_fileInput.name.split('.') in PHOTO_EXTENSTION) {
        handleFileUpload()
    }

    console.log(selectedFile.value)
}
const selectFile = async () => {
    await fileInput.value.click()
}
const handleFileUpload = async () => {
    const formData = new FormData()
    formData.append('file', selectedFile.value)

    try {
        const response = await axios.post(config.urls.upload.a, formData, {
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

input[type='file'] > input[type='button'] {
    color: greenyellow;
}
</style>
