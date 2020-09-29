<template>
  <div>
    <Nuxt />
    <options-modal></options-modal>
    <client-only>
      <app-body></app-body>
    </client-only>
  </div>
</template>


<script>
import AppBody from "~/components/AppBody";
import OptionsModal from "@/components/OptionsModal";
export default {
  components: {OptionsModal, AppBody}
}
</script>
<style scoped lang="scss">

</style>
