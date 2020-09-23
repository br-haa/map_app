<template>
<div class="sideBar">
  <slot></slot>
</div>
</template>

<script>
export default {
  name: "SideBars"
}
</script>

<style scoped lang="scss">
.sideBar{
  width: 80%;
  background-color: hsla(0%,0%,100,.5);
  backdrop-filter: blur(3px);
  box-shadow: 0 0 5px 3px;
  padding: 1rem;
  height: 100%;
}
</style>
