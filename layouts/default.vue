<template>
  <div>
    <Nuxt />
    <options-modal @update="updatePoint = !updatePoint"></options-modal>
    <client-only>
      <app-body :update="updatePoint"></app-body>
    </client-only>
  </div>
</template>


<script>
import AppBody from "~/components/AppBody";
import OptionsModal from "@/components/OptionsModal";
export default {
  components: {OptionsModal, AppBody},
  data(){
    return{
      updatePoint: false
    }
  }
}
</script>
<style scoped lang="scss">

</style>
