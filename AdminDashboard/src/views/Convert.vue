



<template>
  <h4 class="py-3 px-2 text-lg font-bold">
    TEXT TO SPEECH CONVERT
    <button
      type="button"
      @click="gotoList"
      class="
        text-white
        bg-blue-700
        hover:bg-blue-800
        focus:ring-4 focus:ring-blue-300
        font-medium
        rounded-lg
        text-sm
        px-5
        py-2.5
        mr-2
        mb-2
        dark:bg-blue-600 dark:hover:bg-blue-700
        focus:outline-none
        dark:focus:ring-blue-800
      "
    >
      Danh sách TTS
    </button>
  </h4>

  <div class="flex justify-center">
    <div class="mb-3 w-full">
      <form @submit.prevent="startConvert">
        <textarea
          class="
            h-full
            w-full
            form-control
            block
            px-3
            py-1.5
            text-base
            font-normal
            text-gray-700
            bg-white bg-clip-padding
            border border-solid border-gray-300
            rounded
            transition
            ease-in-out
            m-0
            focus:text-gray-700
            focus:bg-white
            focus:border-blue-600
            focus:outline-none
            mb-3
          "
          id="exampleFormControlTextarea1"
          rows="3"
          placeholder="Nhập content tối đa 500 ký tự"
          maxlength="500"
          v-model="content"
        ></textarea>
        <button
          class="
            border-2 border-blue-500
            rounded-full
            px-9
            py-2
            inline-block
            font-semibold
            bg-blue-500
            text-white
          "
          type="submit"
        >
          Convert
        </button>
      </form>

      <NotificationFail
        v-if="message && successful === false"
        :message="message"
        :successful="successful"
      />
      <NotificationSuccess
        v-if="message && successful === true"
        :message="message"
        :successful="successful"
        route="listconvert"
        routeName="Danh sách"
      />
    </div>
  </div>
  <FirstForm v-if="!currentUser.keyzl" />

  <loading
    v-model:active="showLoading"
    :can-cancel="true"
    :is-full-page="true"
  />
</template>

<script>
import ServiceTTS from "@/controller/Convert.controller";
import { config, text } from "@fortawesome/fontawesome-svg-core";
import TTSModel from "../models/tts.model";

import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import NotificationSuccess from "../components/Notification/NotificationSuccess.vue";
import NotificationFail from "../components/Notification/NotificationFail.vue";
import FirstForm from "../components/FirstForm.vue";
export default {
  data() {
    return {
      outputAudiofile: "",
      content: "",
      showLoading: false,
      successful: false,
      message: "",
    };
  },
  computed: {
    currentUser() {
      console.log(this.$store.state.auth.user);
      return this.$store.state.auth.user;
    },
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push("/login");
    }
  },
  methods: {
    startConvert() {
      this.startConvert_sub();
    },
    async startConvert_sub() {
      this.showLoading = true;
      this.message = "";
      if (!this.content) {
        this.message = "Không được bỏ trống";
        this.showLoading = false;
        this.successful = false;
      } else {
        await this.startConvert_getVoice();
      }
    },
    async startConvert_getVoice() {
      const params = new URLSearchParams();
      params.append("input", this.content);
      params.append("encode_type", 1);
      try {
        var ok = await ServiceTTS.zaloTts(params, this.currentUser.keyzl);
        this.outputAudiofile = ok.data.url;
      } catch (error) {
        switch (error.response.status) {
          case 401:
            this.message = "Sai APIKey Zalo Kìa, Vui lòng kiểm tra";
            break;
          case 400:
            this.message = "Sai đoạn text gửi lên";
            break;
          case 500:
            this.message = "Lỗi server";
            break;

          default:
            this.message = error;
            break;
        }

        
        this.showLoading = false;
        this.successful = false;
      }
      if (ok.data.url) {
        const data = {
          text: this.content,
          userId: this.currentUser.id,
          linkAudio: ok.data.url,
        };
        this.saveDataTTs(data);
      } else {
        this.message = "Cannot convert";
        this.showLoading = false;
        this.successful = false;
      }
    },

    async saveDataTTs(data) {
      try {
        await ServiceTTS.saveTTS(data);
        this.message =
          "Thành công, bấm vào danh sách để chuyển hướng qua danh sách đã convert";
        this.showLoading = false;
        this.successful = true;
      } catch (error) {
        console.log(error);
        this.message = error;
        this.successful = false;
        this.showLoading = false;
      }
    },
    gotoList() {
      this.$router.push({ name: "listconvert" });
    },
  },
  components: { Loading, NotificationSuccess, NotificationFail, FirstForm },
};
</script>
