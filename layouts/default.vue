<template>
  <div>
    <Nuxt />
    <client-only>
      <app-body></app-body>
      <particles></particles>
    </client-only>
  </div>
</template>


<script>
import AppBody from "~/components/AppBody";
import Particles from "~/components/Particles.vue";
export default {
  components: {Particles, AppBody}
}
</script>
<style scoped lang="scss">
div[id^="particles-instance-"] {
  height: 100vh !important;
  width: 100vw !important;
  position: fixed !important;
  top: 0 !important;
  margin: 0 !important;
  padding: 0 !important;
  overflow: hidden !important;
  background: rgba($color: white, $alpha: 0.4);
  z-index: -1;
}
</style>
