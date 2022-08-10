<template>
  <div id="app">
    <Loader v-if="$store.state.loader"/>
    <router-view/>
  </div>
</template>

<script>
import axios from "axios";
import Loader from "@/assets/Loader";

export default {
  components: {Loader},
  methods: {
    async isAuth() {
      try {
        const response = await axios.post('auth/isAuth');
        const auth = response?.data?.auth;
        if (auth) {
          if (this.$route.path !== '/rewards') {
            await this.$router.push('/rewards');
          }
        } else if (this.$route.path !== '/login') {
          await this.$router.push('/login');
        }
      } catch (e) {
        console.log(e);
        await this.$router.push('/login');
      }
    },
  },
  async created() {
    await this.isAuth();
  },
};
</script>
<style>
@import '../node_modules/bootstrap/dist/css/bootstrap.css';
@import '../node_modules/bootstrap-vue/dist/bootstrap-vue.css';
</style>

