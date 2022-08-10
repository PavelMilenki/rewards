<template>
  <div class="loading" >
    <b-spinner label="Spinning"/>
  </div>
</template>

<script>
export default {
  name: "Loader",
};
</script>
<style>
.loading {
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
  height: 100vh;
  width: 100vw;
  margin: auto;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, .5);
}
</style>
