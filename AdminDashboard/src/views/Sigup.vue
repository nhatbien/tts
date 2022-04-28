<template>
  <div
    class="
      flex flex-col
      items-center
      justify-center
      min-h-screen
      py-2
      bg-gray-200 bg-hero-pattern
    "
  >
    <main
      class="
        flex flex-col
        items-center
        justify-center
        w-full
        flex-1
        px-20
        text-center
      "
    >
      <div
        class="
          bg-white
          rounded-2xl
          shadow-2xl
          flex
          w-full
          xl:w-6/12
          max-w-4xl
          relative
          h-full
        "
      >
        <div class="w-full xl:w-3/5 p-5 m-auto py-12 px-6 sm:p-20">
          <div class="text-left font-bold">
            <span class="text-blue-500">Person</span> Bie
          </div>
          <div class="py-10">
            <h2 class="text-3xl font-bold text-blue-500 mb-2">
              Register Account
            </h2>
            <div
              class="border-2 w-full xl:w-10 border-blue-500 inline-block mb-2"
            ></div>
            <p class="text-gray-400 my-3"></p>
            <div class="flex flex-col items-center">
              <form @submit.prevent="handleRegister">
                <div class="bg-gray-100 w-64 p-2 flex items-center mb-3">
                  <font-awesome-icon
                    icon="file-text"
                    class="text-gray-400 m-2"
                  />
                  <input
                    v-model="user.email"
                    type="text"
                    name="field"
                    placeholder="Full Name"
                    class="bg-gray-100 outline-none text-sm flex-1"
                  />

                  <!-- <div
                                        v-if="errors.has('username')"
                                        class="alert alert-danger"
                                        role="alert"
                                    >Username is required!</div>-->
                </div>
                <div class="bg-gray-100 w-64 p-2 flex items-center mb-3">
                  <font-awesome-icon icon="user" class="text-gray-400 m-2" />
                  <input
                    v-model="user.username"
                    type="text"
                    name="field"
                    placeholder="Username"
                    class="bg-gray-100 outline-none text-sm flex-1"
                  />

                  <!-- <div
                                        v-if="errors.has('username')"
                                        class="alert alert-danger"
                                        role="alert"
                                    >Username is required!</div>-->
                </div>
                <div class="bg-gray-100 w-64 p-2 flex items-center mb-3">
                  <font-awesome-icon icon="key" class="text-gray-400 m-2" />
                  <input
                    v-model="user.password"
                    type="password"
                    placeholder="Password"
                    autocomplete="on"
                    class="bg-gray-100 outline-none text-sm flex-1"
                  />
                  <!--  <div
                                        v-if="errors.has('password')"
                                        class="alert alert-danger"
                                        role="alert"
                                    >Password is required!</div>-->
                </div>

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
                  Sign Up
                </button>
              </form>
            </div>

            <div class="max-w-lg mx-auto text-center py-2">
              <p class="text-black">
                Do you have an account?
                <a href="/login" class="font-bold hover:underline">Sign in</a>.
              </p>
            </div>
          </div>
        </div>
        <div
          hidden
          class="
            lg:block
            w-2/5
            bg-blue-500
            text-white
            rounded-tr-2xl
            py-36
            px-12
          "
        >
          <h2 class="text-3xl font-bold mb-2">Hello, Fen</h2>
          <div class="border-2 w-10 border-white inline-block mb-2"></div>
          <p class="mb-2">Welcome to AI Text to Speech zalo</p>
          <a
            href="/login"
            class="
              border-2 border-white
              rounded-full
              px-12
              py-2
              inline-block
              font-semibold
              hover:bg-white hover:text-blue-500
            "
            >Sign in</a
          >
        </div>
      </div>
    </main>
    <footer class="max-w-lg mx-auto flex justify-center text-white">
      <a href="#" class="hover:underline">Contact</a>
      <span class="mx-3">•</span>
      <a href="#" class="hover:underline">Privacy</a>
    </footer>
  </div>
  <NotificationFail
    v-if="message && successful === false"
    :message="message"
    :successful="successful"
  />
  <NotificationSuccess
    v-if="message && successful === true"
    :message="message"
    :successful="successful"
    route="login"
    routeName="Đăng Nhập"
  />
</template>



<script>
import User from "../models/user";
import NotificationSuccess from "../components/Notification/NotificationSuccess.vue";
import NotificationFail from "../components/Notification/NotificationFail.vue";

export default {
  name: "Register",
  data() {
    return {
      user: new User("", "", ""),
      submitted: false,
      successful: false,
      message: "",
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  created() {
    if (this.loggedIn) {
      this.$router.push("/");
    }
  },
  methods: {
    handleRegister() {
      this.message = "";
      this.submitted = true;
      if (this.user.username && this.user.password && this.user.email) {
        this.$store.dispatch("auth/register", this.user).then(
          (data) => {
            this.message = data.message;
            this.successful = true;
          },
          (error) => {
            this.message =
              (error.response && error.response.data.message) ||
              error.message ||
              error.toString();
            this.successful = false;
          }
        );
      }
    },
    gotoLogin() {
      this.$router.push({ name: "login" });
    },
  },
  components: { NotificationSuccess, NotificationFail },
};
</script>