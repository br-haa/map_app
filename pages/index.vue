<template>
  <div id="backgroundHolder">
    <client-only>
<background-base :lightness="30" :saturation="40"></background-base>
    </client-only>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss">
$accentColor: hsla(195,50%,50%,1);
body{
  margin:  0;
}
#backgroundHolder{
  background: linear-gradient( to bottom right , hsla(195,40%,40%,1), hsla(200,40%,40%,1));
  z-index: -1;
  position: fixed;
  height: 100vh;
  width: 100vw;
  display: grid;
  place-items: center;
  #backgroundBase{
    height: 100%;
    width: 100%;
  }
}
</style>
