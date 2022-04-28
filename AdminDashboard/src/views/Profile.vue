<template>
  <div>
    <!-- Breadcrumb -->
    <!--     <Breadcrumb breadcrumb="Forms" />
 -->

    <div class="mt-8">
      <div class="mt-4">
        <div class="p-6 bg-white rounded-md shadow-md">
          <h2 class="text-lg font-semibold text-gray-700 capitalize">
            Account settings
          </h2>

          <form @submit.prevent="register">
            <div class="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
              <div>
                <label class="text-gray-700" for="username">Username</label>
                <input
                  readonly="readonly"
                  class="
                    py-2
                    px-1
                    w-full
                    mt-2
                    border-zinc-900
                    bg-gray-300
                    rounded-md
                    focus:border-indigo-200
                    focus:ring
                    focus:ring-opacity-40
                    focus:ring-indigo-500
                  "
                  type="label"
                  :value="currentUser.username"
                />
              </div>

              <div>
                <label class="text-gray-700" for="emailAddress">Email</label>
                <input
                  readonly="readonly"
                  class="
                    py-2
                    px-1
                    w-full
                    mt-2
                    bg-gray-100
                    border-gray-200
                    rounded-md
                    focus:border-indigo-600
                    focus:ring
                    focus:ring-opacity-40
                    focus:ring-indigo-500
                  "
                  type="email"
                  :value="currentUser.email"
                />
              </div>

              <div>
                <label class="text-gray-700" for="keyzalo">API Key Zalo</label>
                <input
                  class="
                    py-2
                    px-1
                    bg-gray-300
                    w-full
                    mt-2
                    border-gray-200
                    rounded-md
                    focus:border-indigo-600
                    focus:ring
                    focus:ring-opacity-40
                    focus:ring-indigo-500
                  "
                  type="text"
                  v-model="user.keyzl"
                />
              </div>

              <div>
                <label class="text-gray-700" for="passwordConfirmation"
                  >Change Password
                </label>
                <input
                  class="
                    py-2
                    px-1
                    w-full
                    mt-2
                    border-indigo-600
                    rounded-md
                    focus:border-indigo-600
                    focus:ring
                    focus:ring-opacity-40
                    focus:ring-indigo-500
                  "
                  type="password"
                />
              </div>
            </div>
            {{message}}
            <div class="flex justify-end mt-4">
              <button               @click="handleSubmit"

                class="
                  px-4
                  py-2
                  text-gray-200
                  bg-gray-800
                  rounded-md
                  hover:bg-gray-700
                  focus:outline-none focus:bg-gray-700
                "
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
   <NotificationSuccess
    v-if="message && successful === true"
    :message="message"
    @click="refresh"
    :successful="successful"
  />
</template>


<script>
import User from "../models/user";
import NotificationSuccess from "../components/Notification/NotificationSuccess.vue";

export default {
  name: "Profile",
  data() {
    return {
      user: new User(),
      message: "",
      successful: false,
    };
  },
  computed: {
    currentUser() {
      this.user.keyzl =  this.$store.state.auth.user.keyzl;
      console.log(this.$store.state.auth.user);
      return this.$store.state.auth.user;
    },
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push("/login");
    }
  },
    components: { NotificationSuccess },

  methods: {
    logOut() {
      this.$store.dispatch("auth/logout");
      this.$router.push("/login");
    },
    async handleSubmit() {
      if (!this.user.keyzl) {
        this.message = "Key Zalo Không thể bỏ trống";
        return;
      }
      const data = {
        id: this.currentUser.id,
        username: this.currentUser.username,
        email: this.currentUser.email,
        keyzl: this.user.keyzl,
        accessToken: this.currentUser.accessToken,
      };
      this.$store.dispatch("auth/update", data).then(
        () => {
          this.message = "Thành công";
          this.successful = true;
        },
        (error) => {
          this.success = false;
          this.message =
            (error.response && error.response.data.message) ||
            error.message ||
            error.toString();
        }
      );
    },
    refresh() {
      window.location.reload();
    },
  },
};
</script>
