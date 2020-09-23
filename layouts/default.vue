<template>
  <div>
    <Nuxt />
    <client-only>
      <app-body></app-body>
    </client-only>
  </div>
</template>


<script>
import AppBody from "~/components/AppBody";
export default {
  components: {AppBody}
}
</script>
<style scoped lang="scss">

</style>
