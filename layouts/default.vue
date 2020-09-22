<template>
  <div>
    <Nuxt />
    <no-ssr>
      <app-body></app-body>
    </no-ssr>
  </div>
</template>

<style>

</style>
<script>
import AppBody from "~/components/AppBody";
export default {
  components: {AppBody}
}
</script>
