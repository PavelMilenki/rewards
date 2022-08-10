<template>
  <b-tab :title="title" :active="active" title-link-class="text-dark" class="tabWrapper pt-3">
    <div class="d-flex ml-3 mb-4" v-for="(reward, i) in rewards" :key="i">
      <b-avatar size="3rem"/>
      <div class="ml-3">
        <div class="font-weight-bold">{{ reward.forUserName }} <span class="font-weight-normal">rewarded by</span>
          {{ reward.fromUserName }}
        </div>
        <div class="date">{{ reward.createOn | dateFormat }}</div>
        <div class="mt-1">{{ reward.description }}</div>
      </div>
    </div>
  </b-tab>
</template>

<script>
export default {
  name: "Tab",
  props: {
    rewards: {
      type: Array,
      default: [],
    },
    title: {
      type: String,
      default: 'Feed',
    },
    active: {
      type: Boolean,
      default:false
    }
  },
};
</script>

<style lang="scss">
.rewards-container {
  .tabWrapper {
    height: 66vh;
    overflow-y: scroll;
    background-color: #e8eaee;
  }

  .date {
    font-size: 11px;
  }
}

</style>
