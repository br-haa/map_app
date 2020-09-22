<template>
<div>
  <code v-if="this.$store.state.masterList.Values">
    {{this.$store.state.masterList.Values}}
  </code>

</div>
</template>

<script>
export default {
name: "CodeExport"
}
</script>

<style scoped>

</style>
