<template>
<div id="uiGrid">
  <button id="delete" @click="$emit('removePin')">remove pin</button>
  <div id="inputGrid">
    <label id="centerInput">
      <input v-model="centerVmodle" @keypress.13="waitForPress">
      coordinates
    </label>
    <label id="zoomInput">
      <input v-model="zoomVmodle" @keypress.13="waitForPress">
      zoom
    </label>
  </div>
  <button id="rename" @click="$emit('renamePin')">rename pin</button>
</div>
</template>

<script>
export default {
name: "MapUi",
  data(){
  return{
    centerVmodle:'44.977161, -93.265322',
    zoomVmodle: 8,
  }
  },
  methods: {
    waitForPress(){
      this.$emit('uiUpdate',{center: this.centerVmodle, zoom: parseInt(this.zoomVmodle) })
    },
  },
  mounted() {
  }
}
</script>

<style scoped lang="scss">
#uiGrid{
  display: grid;
  grid-template-columns: auto 1fr auto;
  place-self: center;
  width: 100%;
  align-items: center;
  margin-bottom: 1rem;
    @mixin buttons{
      height: 60px;
      width: 60px;
      border-radius: 360px;
      border: none;
      box-shadow: 0 0 3px 1px;
    }
    #delete{
      @include buttons;
      justify-self: start;
    }
    #rename{
      @include buttons;
      justify-self: end;
    }
    #inputGrid{
      justify-self: center;
      display: flex;
    }
    #zoomInput{
      width: 70px;
      align-self: center;
      margin-left: 10px;
      text-align: center;
      font-size: .8rem;
      input{
        width: 100%;
        text-align: center;
        height: 40px;
      }
    }
    #centerInput{
      align-self: center;
      width: 200px;
      text-align: center;
      font-size: .8rem;
      input{
        width: 100%;
        text-align: center;
        height: 40px;
      }
    }

}
</style>
