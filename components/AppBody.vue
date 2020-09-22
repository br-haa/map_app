<template>
<div class="wrapper">
  <side-bars>
    <geo-list @deleteMap="cutFromMasterList" @addMap="createMapObject"></geo-list>
  </side-bars>
  <div id="mapGrid">
    <map-ui @renamePin="renamePin" @removePin="removePin"></map-ui>
    <map-holder @pinClick="setActivePin" @addPin="addPin"></map-holder>
  </div>
  <side-bars>
    <code-export></code-export>
  </side-bars>
</div>
</template>

<script>
import SideBars from "~/components/SideBars";
import MapUi from "~/components/MapUi";
import MapHolder from "~/components/MapHolder";
import CodeExport from "~/components/CodeExport";
import GeoList from "~/components/GeoList";
export default {
name: "AppBody",
  components: {GeoList, CodeExport, MapHolder, MapUi, SideBars},
  data(){
  return {
    zoom: 8,
    center: '44.977161, -93.265322',
    markers: [{text:'Minneapolis', location:[44.977161, -93.265322]},],
    activePin: undefined,
  }
  },
  computed:{
    getCenterArr(){
      let arr = this.center.split(',')
      let newArr = []
      arr.forEach(x => {
        parseFloat(x)
        console.log(parseFloat(x))
        newArr.push(x)
      })
      return newArr
    },
  },
  methods: {
  createMapObject(payload){
    function sendObj(mapName, mapZoom, mapCenter, mapMarkers){
      payload = mapName;
      this.zoom = mapZoom;
      this.getCenterArr = mapCenter;
      this.markers = mapMarkers;
    }
    this.pushToMasterList(sendObj)
  },
  pushToMasterList(payload){
    this.$store.commit('masterList/pushValues', payload)
  },
  cutFromMasterList(payload){
    this.$store.commit('masterList/removeValue', payload)
  },
  changeCurrent(payload){
    let current = this.$store.state.masterList.Values[this.$store.state.masterList.Controller]
    function sendObj(mapName, mapZoom, mapCenter, mapMarkers){
      current.name = mapName;
      current.zoom = mapZoom;
      current.center = mapCenter;
      current.markers = mapMarkers;
    }
    if(payload.type === 'zoom'){
      this.pushToMasterList(sendObj(current.name, payload.value))
    }
    else if(payload.type === 'center'){
      this.pushToMasterList(sendObj(current.name, current.zoom, payload.value))
    }
    else if(payload.type === 'markers'){
      this.pushToMasterList(sendObj(current.name, current.zoom, current.markers, payload.value))
    }
  },
    addPin(location){
      let namePin = prompt("enter name");
      if(namePin === null || namePin === ""){
      } else {
        this.$store.commit('masterList/addMarker', {text: namePin, location: location})
      }
    },
    setActivePin(index){
    this.activePin = index
    },
    renamePin(){
      let namePin = prompt("enter name");
      if(namePin === null || namePin === ""){
      } else {
        this.$store.commit('masterList/renameMarker', {index: this.activePin, value: namePin})
        this.selectedPin = undefined
      }
    },
    removePin(){
    this.$store.commit('masterList/removeMarker', this.activePin)
    }
  }
}
</script>

<style scoped lang="scss">
.wrapper{
  display: grid;
  height: 100vh;
  width:100vw;
  grid-template-columns: 1fr 1fr 1fr;
  align-items: center;
  justify-items: center;
  #mapGrid{
    width: 100%;
    display: grid;
    grid-template-rows: auto 1fr;
    height: 100%;
  }
}
</style>
