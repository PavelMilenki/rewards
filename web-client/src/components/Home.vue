<template>
  <div class="rewards-container">
    <b-navbar variant="light" class="d-flex justify-content-end">
      <b-button size="sm" @click="logout">Logout</b-button>
    </b-navbar>
    <b-container class="bv-example-row">
      <b-row class="mt-5 mb-5 h4">
        <b-col cols="3" class="d-flex flex-column align-items-center">
          <b-avatar size="6rem"/>
          <div class="mt-2">{{ getCurrentUserFullName }}</div>
        </b-col>
        <b-col cols="3">
          <div class="mt-1">My Rewards</div>
          <div class="mt-1">$ {{ myRewardsValue }}</div>
        </b-col>
        <b-col cols="3">
          <div class="mt-1">Give</div>
          <div class="mt-1">$ {{ myGiveValue }}</div>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols='12' class="position-relative">
          <div class="addRewardButton" @click="showModal=true">
            <div class="cross"></div>
          </div>
          <b-card no-body>
            <b-tabs active-nav-item-class="text-uppercase"
                    title-link-class="text-dark">
              <Tab :rewards="allRewards" title="Feed" :active="true"/>
              <Tab :rewards="myAllRewards" title="My Rewards"/>
            </b-tabs>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
    <b-modal centered v-model="showModal">
      <b-container fluid>
        <b-form-group label="To"
                      label-for="to">
          <b-form-select v-model="selected" :options="options" id="to"></b-form-select>
        </b-form-group>
        <b-form-group label="Reward"
                      label-for="giveValue">
          <b-form-input id="giveValue"
                        v-model.number="rewardValue"
                        type="text"
                        placeholder="$"/>
        </b-form-group>
        <b-form-group label="Why?"
                      label-for="description">
          <b-form-textarea id="description" v-model.trim="description"/>
        </b-form-group>
      </b-container>
      <template #modal-footer>
        <div class="w-100">
          <div class="text-danger" v-if="!validForm">All fields are required</div>
          <b-button size="sm"
                    class="float-right"
                    @click="addReward">
            Reward
          </b-button>
        </div>
      </template>
    </b-modal>
  </div>
</template>

<script>

import axios from "axios";
import Tab from "@/components/Tab";

export default {
  name: "Home",
  components: {Tab},
  data: () => ({
    allRewards: [],
    myAllRewards: [],
    users: [],
    myRewardsValue: null,
    myGiveValue: null,
    showModal: false,
    rewardValue: null,
    description: null,
    selected: null,
    options: [{value: null, text: 'Please select', disabled: true}],
    validForm: true,
  }),
  computed: {
    getCurrentUserId() {
      return JSON.parse(window.localStorage.getItem('info'))?.userId;
    },
    getCurrentUserFullName() {
      const currentUser = JSON.parse(window.localStorage.getItem('info'));
      return `${currentUser?.firstName} ${currentUser?.lastName}`;
    },
  },
  methods: {
    async logout() {
      window.localStorage.removeItem('token');
      window.localStorage.removeItem('info');
      await this.$router.push('/login');
    },
    async getAllRewards() {
      try {
        this.$store.commit('setLoader', true);
        const response = await axios.get('rewards/getAllRewards');
        this.allRewards = response.data.rewards;
        this.myAllRewards = this.allRewards.filter(e => e.forUserId === this.getCurrentUserId);
        this.users = response.data.users;
        this.users
            .filter(a => a.userId !== this.getCurrentUserId)
            .map(e => {
              this.options.push({value: e.userId, text: `${e.firstName} ${e.lastName}`});
            });
        this.myRewardsValue = this.allRewards.filter(el => el.forUserId === this.getCurrentUserId).reduce((acc, a) => acc + a.rewardValue, 0);
        this.myGiveValue = this.allRewards.filter(el => el.fromUserId === this.getCurrentUserId).reduce((acc, a) => acc + a.rewardValue, 0);
      } catch (e) {
        console.log(e);
      } finally {
        this.$store.commit('setLoader', false);
      }
    },
    async addReward() {
      if (!this.selected || !this.description || !this.rewardValue || this.rewardValue === ''
          || this.description === '' || typeof this.rewardValue !== 'number') {
        this.validForm = false;
        return;
      }
      try {
        this.$store.commit('setLoader', true);
        const body = {
          forUserId: this.selected,
          fromUserId: this.getCurrentUserId,
          description: this.description,
          rewardValue: this.rewardValue,
        };
        await axios.post('rewards/addRewards', body);
        this.showModal = false;
      } catch (e) {
        console.log(e);
      } finally {
        await this.getAllRewards();
        this.description = null;
        this.rewardValue = null;
        this.selected = null;
      }
    },
  },
  async created() {
    await this.getAllRewards();
  },
};
</script>
<style lang="scss">
.rewards-container {
  .card {
    border: none;
  }

  .addRewardButton {
    z-index: 10;
    position: absolute;
    right: 10%;
    top: 2%;
    height: 60px;
    width: 60px;
    border-radius: 50%;
    cursor: pointer;
    border: 3px solid #5a6268;
    background-color: #fff;

    .cross {
      overflow: hidden;
      position: relative;
      border: none;
      padding: 0;
      width: 100%;
      height: 100%;
      background: transparent;
      border-radius: 50%;
      color: #5a6268;

      &:hover {
        background: rgba(111, 114, 113, 0.1)
      }

      &:before, &:after {
        position: absolute;
        top: 26%;
        left: 47%;
        width: 4px;
        height: 50%;
        border-radius: 5%;
        transform: rotate(90deg);
        background: currentcolor;
        content: ''
      }

      &:after {
        transform: rotate(0);
      }
    }
  }
}
</style>


