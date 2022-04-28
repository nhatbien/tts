<template>
  <div>
    <p>
      <strong>Email:</strong>
        {{ currentUser }}
    </p>
  </div>
</template>

<script>

export default {
    name: "Home",
    /* async created(){
       const response = await axios.get('username')
       console.log(response)
    }, */
    computed: {
        currentUser() {
            console.log(this.$store.state.auth.user);
            return this.$store.state.auth.user;
        }
    },
    mounted() {
        if (!this.currentUser) {
            this.$router.push("/login");
        }
    },
    methods: {
        logOut() {
            this.$store.dispatch("auth/logout");
            this.$router.push("/login");
        }
    },
}
</script>
