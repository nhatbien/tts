<template>
  <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <thead
        class="
          text-xs text-gray-700
          uppercase
          bg-gray-50
          dark:bg-gray-700 dark:text-gray-400
        "
      >
        <tr>
                    <th scope="col" class="px-6 py-3">No.</th>

          <th scope="col" class="px-6 py-3">Content</th>
          <th scope="col" class="px-6 py-3">Length</th>
          <th scope="col" class="px-6 py-3">Listen</th>
          <th scope="col" class="px-6 py-3">
            <span class="sr-only">Edit</span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(convert, index) in converts"
          :key="index"
          class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
        >
         <td class="px-6 py-4">
            {{ index }}
          </td>
          <th
            scope="row"
            class="
              px-6
              py-4
              font-medium
              text-gray-900
              dark:text-white
              whitespace-nowrap
            "
          >
            {{ convert.text.substring(0, 30) }}...
          </th>
          <td class="px-6 py-4">
            {{ convert.text.length }}
          </td>
          <td class="px-6 py-4">
            <audio controls :src="convert.linkAudio">
              Your browser does not support the
              <code>audio</code> element.
            </audio>
          </td>
          <td class="px-3 py-2 text-right">
            <a
              :href="convert.linkAudio"
              
              >
            <font-awesome-icon @click="deleteById(convert._id)" icon="download" class="text-lg font-medium
                text-blue-600
                dark:text-blue-500
                  px-3
                hover:underline" />
             </a >
             <font-awesome-icon @click="deleteById(convert._id)" icon="trash" class="text-lg font-medium
                text-red-600
                dark:text-blue-500
                px-3
                hover:underline" />
            
          </td>
        </tr>
      </tbody>
    </table>
  </div>
   <NotificationFail
        v-if="message && successful === false"
        :message="message"
        :successful="successful"
      />
      <NotificationSuccess
        v-if="message && successful === true"
        :message="message"
        @click="refresh"
        :successful="successful"
      />
</template>

<script>
import NotificationFail from "./Notification/NotificationFail.vue";
import NotificationSuccess from "./Notification/NotificationSuccess.vue";
import ServiceTTS from "@/controller/Convert.controller";
import TTSModel from '../models/tts.model';

export default {
    props: {
        converts: { type: Array, default: [] },
        activeIndex: { type: Number, default: -1 },
    },
    data() {
        return {
            successful: false,
            message: "",
        };
    },
    emits: ["update:activeIndex"],
    methods: {
        updateActiveIndex(index) {
            this.$emit("update:activeIndex", index);
        },
        async deleteById(id) {
          const data = {
            id : id
          } 
          try {
                const response = await ServiceTTS.delete(data);
                this.message = "Thành công";
                this.successful = true;
            }
            catch (error) {
                this.message = error;
                this.successful = false;
            }
        },
        refresh(){
                window.location.reload();
        }
    },
    components: { NotificationFail, NotificationSuccess }
};
</script>