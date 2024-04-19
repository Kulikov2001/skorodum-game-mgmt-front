<template>
    <div class="wrapper">
        <input type="file" @change="handleFileChange" ref="fileInput" hidden/>
        <div v-if="true" class="pick">
            <div class="item">
                <FolderAdd height="32" width="32" />
                <button @click="selectFile" :color="'var(--main)'">
                    <Transition>
                        <span v-if="!isUploading">Выбрать файл</span>
                    </Transition>
                        <Transition>
                        <progress v-if="isUploading" max="100" :value="uploadPercentage"></progress>
                    </Transition>
                </button>

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
import type {AxiosProgressEvent} from 'axios'
import { config } from '@/config'
import MediaPic from '@/assets/MediaPic.vue'
import type { IMedia } from '@/stores/game'
import { useGameStore } from '@/stores/game'
import FolderAdd from "@/assets/FolderAdd.vue";
const store = useGameStore()
const isUploading = ref(false);
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
const uploadPercentage = ref(0);
const fileInput = ref<any>(null)
const selectedFile = ref<any>(null)
const uploadSuccess = ref<boolean>(false)
const uploadedFile = ref<string>('')
const fileType = ref<string>('')

const fileName = computed(() => {
    return 'supermedia'
})


const selectFile = async () => {
    await fileInput.value.click()
}
const handleFileUpload = async () => {
    isUploading.value = true;
    const formData = new FormData()
    formData.append('file', selectedFile.value)

    try {
        const response = await axios.post(config.urls.upload.c, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
                onUploadProgress: function(progressEvent: AxiosProgressEvent) {
                    uploadPercentage.value = parseInt(String(Math.round((progressEvent.loaded / progressEvent.total!) * 100)));
                }.bind(this),
            }
        ).then(function(res){
            uploadedFile.value = res.data.file
            uploadSuccess.value = true
            console.log('SUCCESS!!');
            //store.propagandeMedia(filename)
        })
            .catch(function(){
                store.globalNotification.type = "error"
                store.globalNotification.isFixed = true;
                store.globalNotification.message = "Ошибка при загрузке файла. Подробности в консоли"
            });

    } catch (error) {
        console.error(error)
    } finally {
        isUploading.value = false;
    }
}
const handleFileChange = () => {
    selectedFile.value = fileInput.value.files[0]

    //const ext = selectedFile.value[selectedFile.value.name.split('.').length - 1].toLowerCase()
    try{
        handleFileUpload()
    } catch (e) {
        console.error(e)
    }

    // if (VIDEO_EXTENSTION.map((allowed: string) => allowed === ext).includes(true)) {
    //     handleFileUpload()
    // } else if (selectedFile.value.name.split('.') in PHOTO_EXTENSTION) {
    //     handleFileUpload()
    // } else {
    //     console.error('no one')
    //     handleFileUpload()
    // }

    console.log(selectedFile.value)
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
.item{
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-items: center;
    align-items: center;
    gap: 1em;
}
progress{
    accent-color: var(--success-notification-bg);
    min-height: 2em;
}
</style>
