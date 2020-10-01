<template>
<div class="mapSizeGrid">
  <h1>
    Map/<br>
    Size
  </h1>
  <div class="inputWrapper">
    <div class="inputGrid">
      <label>
        Desktop Size (in px)
        <input type="number" v-model="DesktopMapSize">
      </label>

      <label>
        Mobile Size (in px)
        <input type="number" v-model="MobileMapSize">
      </label>
      <button @click="setSize">Set</button>
  </div>
</div>
</div>
</template>

<script>
export default {
name: "MapSize",
  data(){
  return {
    DesktopMapSize: 0,
    MobileMapSize: 0,
  }

  },
  methods:{
  setSize(){

    this.$emit('setMapSize', {desktop:this.DesktopMapSize, mobile:this.MobileMapSize})
  }
  }
}
</script>

<style scoped lang="scss">
.mapSizeGrid{
  display: grid;
  grid-template-columns: 1fr 1fr;
  h1{
    font-size: 10rem;
    place-self: center;
    color: white;
  }
  .inputWrapper{
    display: grid;
    place-self: center;
    width: 100%;
    height: 100%;
    place-items: center;
    border-left: 2px solid white;
    .inputGrid{
    display: grid;
      grid-template-columns: 1fr 1fr;
      grid-gap: 1rem;
      place-items: center;
      label{
        display:grid;
        grid-template-rows: auto 1fr;
        justify-items: center;
        color: white;
        input{
          height: 40px;
          text-align: center;
        }
      }
      button{
        grid-column: 1/3;
        height: 40px;
        width: 100%;
        background-color: white;
        border: black 1px solid;
        box-shadow: 0 0 3px 1px;
        cursor: pointer;
        text-decoration: underline hsla(195,50%,50%,1);
        font-weight: bold;
      }
    }
  }
}

</style>
