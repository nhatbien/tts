<template>
  <h4 class="py-3 px-2 text-lg font-bold">Manager Convert TTS</h4>
  <button
    type="button"
    @click="gotoAdd"
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
    Thêm Mới
  </button>

  <TTSTable v-if="convertCount > 0" :converts="filteredConvert" />
  <p v-else>Page Not Found</p>
</template>

<script>
import ServiceTTS from "@/controller/Convert.controller";
import TTSTable from "../components/TTSTable.vue";
import TTSModel from "../models/tts.model";

export default {
    name: "Tôi",
  data() {
    return {
      converts: [],
      activeIndex: -1,
      searchText: "",
    };
  },
  watch: {
    searchText() {
      this.activeIndex = -1;
    },
  },
  created() {
    this.fetchConverts();
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    convertStrings() {
      return this.converts.map((item) => {
        const model = new TTSModel(item);
        console.log(model);
        return model;
      });
    },
    filteredConvert() {
      if (!this.searchText) return this.converts;
      return this.converts.filter((_convert, index) =>
        this.convertStrings[index].includes(this.searchText)
      );
    },
    convertCount() {
      return this.filteredConvert.length;
    },
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push("/login");
    }
  },
  methods: {
    async fetchConverts() {
      try {
        this.converts = await ServiceTTS.getAll(this.currentUser.id);
      } catch (error) {
        console.log(error);
      }
    },
     gotoAdd() {
      this.$router.push({ name: "convert" });
    },
  },
  components: { TTSTable },
};
</script>