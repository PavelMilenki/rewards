<template>
  <div class="login-wrapper">
    <div class="login-form">
      <b-tabs content-class="mt-3"
              active-nav-item-class="text-uppercase">
        <span class="text-danger">{{ error }}</span>
        <b-tab title="Login" active title-link-class="text-dark" @click="resetForm">
          <b-form-group label="Login"
                        label-for="login">
            <b-form-input id="login"
                          v-model="login"
                          type="text"
                          placeholder="Enter login"/>
          </b-form-group>
          <b-form-group class="mt-1"
                        label="Password"
                        label-for="password">
            <b-form-input id="password"
                          v-model="password"
                          type="password"
                          placeholder="Enter password"/>
          </b-form-group>
          <b-form-group class="mt-2">
            <b-button class="w-100" size="sm" @click="signIn">Sign In</b-button>
          </b-form-group>
        </b-tab>
        <b-tab title="Registration" title-link-class="text-dark" @click="resetForm">
          <span class="text-success">{{ message }}</span>
          <b-form-group label="Login"
                        label-for="regLogin">
            <b-form-input id="regLogin"
                          v-model.trim="login"
                          type="text"
                          placeholder="Enter login"/>
          </b-form-group>
          <b-form-group label="First Name"
                        label-for="firstName">
            <b-form-input id="firstName"
                          v-model="firstName"
                          type="text"
                          placeholder="Enter first name"/>
          </b-form-group>
          <b-form-group label="Last Name"
                        label-for="lastName">
            <b-form-input id="lastName"
                          v-model="lastName"
                          type="text"
                          placeholder="Enter last name"/>
          </b-form-group>
          <b-form-group class="mt-2"
                        label="Password (8 more characters)"
                        label-for="regPassword">
            <b-form-input id="regPassword"
                          v-model.trim="password"
                          type="password"
                          placeholder="Enter password"/>
          </b-form-group>
          <b-form-group class="mt-2"
                        label="Confirm Password"
                        label-for="confirmPassword">
            <b-form-input id="confirmPassword"
                          v-model.trim="confirmPassword"
                          type="password"
                          placeholder="Confirm password"/>
          </b-form-group>
          <b-form-group class="mt-2">
            <b-button class="w-100" size="sm" @click="signUp">Sign Up</b-button>
          </b-form-group>
        </b-tab>
      </b-tabs>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "LoginPage",
  data: () => ({
    login: '',
    password: '',
    firstName: '',
    lastName: '',
    confirmPassword: '',
    error: '',
    message: '',
  }),
  methods: {
    async signIn() {
      try {
        this.error = '';
        const response = await axios.post('auth/login', {
          login: this.login,
          password: String(this.password),
        });
      
        if (response.status === 200) {
          axios.defaults.headers.common.authorization = `Bearer ${response.data.token}`;
          window.localStorage.setItem('token', response.data.token);
          window.localStorage.setItem('info', JSON.stringify(response.data.userInfo));
          await this.$router.push('/rewards');
        }
      } catch (e) {
        this.error = e.response.data.message;
        console.log(e);
      } finally {
        setTimeout(() => {
          this.error = '';
        }, 4000);
      }
    },
    async signUp() {
      try {
        this.message = '';
        if (this.password !== this.confirmPassword || this.password === '' || !!this.confirmPassword === '') {
          return this.error = 'Passwords do not match';
        }
        this.error = '';
        const response = await axios.post('auth/registration', {
          login: this.login,
          password: String(this.password),
          firstName: this.firstName,
          lastName: this.lastName,
        });
        if (response.status === 200) {
          this.message = response.data.message;
          this.password = '';
          this.confirmPassword = '';
          this.login = '';
          this.firstName = '';
          this.lastName = '';
        }
      } catch (e) {
        this.error = e.response.data.message;
        console.log(e);
      } finally {
        setTimeout(() => {
          this.error = '';
          this.message = '';
        }, 4000);
      }
    },
    resetForm() {
      this.login = '';
      this.password = '';
      this.confirmPassword = '';
      this.firstName = '';
      this.lastName = '';
      this.error = '';
      this.message = '';
    },
  },
};
</script>

<style lang="scss">
.login-wrapper {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  overflow: auto;

  .login-form {
    margin: auto;
  }
}
</style>
