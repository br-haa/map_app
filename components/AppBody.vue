<template>
  <div class="holder">
<div class="wrapper">
  <side-bars>
    <geo-list @deleteMap="cutFromMasterList" @addMap="createMapObject"></geo-list>
  </side-bars>
  <div id="mapGrid">
    <map-ui @renamePin="renamePin" @removePin="removePin" @uiUpdate="uiUpdate"></map-ui>
    <div id="mapOverlap" :style="{height: getHeight}">
      <div id="overlapIndicator">{{message}}</div>
    <map-holder id="map" @pinClick="setActivePin" @addPin="addPin"></map-holder>
    </div>
  </div>
  <side-bars>
    <code-export></code-export>
  </side-bars>
</div>
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
    markers: [],
    activePin: undefined,
    getHeight: undefined
  }
  },
  computed:{
    getCenterArr(){
      let arr = this.center.split(',')
      let newArr = []
      arr.forEach(x => {
        parseFloat(x)
        newArr.push(x)
      })
      return newArr
    },
    message(){
      if(this.$store.state.masterList.Values.length === 0){
        return 'add a map to edit'
      }
    }
  },
  methods: {
  createMapObject(payload){
    if(payload){
      let sendObj = {mapName:payload, mapZoom: this.zoom, mapCenter: this.getCenterArr, mapMarkers: []}
      // when map is created push default hard code map to master
      console.log(sendObj)
      this.pushToMasterList(sendObj)
    }
  },
  pushToMasterList(payload){
    this.$store.commit('masterList/pushValues', payload) // commit map object as payload
  },
  cutFromMasterList(payload){
    this.$store.commit('masterList/removeValue', payload)
  },
  changeCurrent(payload){ // TODO fix whatever this shit is
    let current = this.$store.state.masterList.Values[this.$store.state.masterList.Controller]
    let sendObj = {mapName:current.mapName, mapZoom: current.mapZoom, mapCenter: current.mapCenter, mapMarkers: current.mapMarkers}
    if(payload.type === 'zoom'){
      this.pushToMasterList({mapName:current.mapName, mapZoom: payload.value, mapCenter: current.mapCenter, mapMarkers: current.mapMarkers})
    }
    else if(payload.type === 'center'){
      this.pushToMasterList({mapName:current.mapName, mapZoom: current.mapZoom, mapCenter: payload.value, mapMarkers: current.mapMarkers})
    }
    else if(payload.type === 'markers'){
      this.pushToMasterList({mapName:current.mapName, mapZoom: current.mapZoom, mapCenter: current.mapCenter, mapMarkers: payload.value})
    }
  },
    addPin(location){
      let namePin = prompt("enter name"); // sets name of pin through prompt
      if(namePin === null || namePin === ""){
      } else {
        this.$store.commit('masterList/addMarker', {text: namePin, location: location}) // commits name of pin and the lat lang to add marker in the store
      }
    },
    setActivePin(index){
    this.activePin = index
    },
    renamePin(){
    if(this.$store.state.masterList.Values.length > 0){
      let namePin = prompt("enter name");
      if(namePin === null || namePin === ""){
      } else {
        this.$store.commit('masterList/renameMarker', {index: this.activePin, value: namePin})
        this.selectedPin = undefined
      }
    }

    },
    removePin(){
      if(this.$store.state.masterList.Values.length > 0){
        console.log('remove '+ this.activePin )
        this.$store.commit('masterList/removeMarker', (this.activePin -1))
      } else {
        console.log('confusion')
      }
    },
    uiUpdate(values){
      if(this.$store.state.masterList.Values.length > 0){
        this.changeCurrent({type:'zoom', value:values.zoom})
        this.changeCurrent({type:'center', value:this.setCenterArr(values.center)})
      }
    },
    setCenterArr(centerString){
      let arr = centerString.split(',')
      let newArr = []
      arr.forEach(x => {
        parseFloat(x)
        newArr.push(x)
      })
      return newArr
    },
    setHeight(){
      let map = document.querySelector('#mapOverlap')
      if(map){
        this.getHeight = `${map.clientWidth}px`
      }
    },
  },
  mounted() {
  this.setHeight()
  }
}
</script>

<style scoped lang="scss">
.holder{
  height: 100vh;
  width:100vw;
  display: grid;
  align-items: center;
}
.wrapper{
  display: grid;
  height: 80%;
  width: 100%;
  grid-template-columns: 1fr 1fr 1fr;
  align-items: center;
  justify-items: center;
  #mapGrid{
    width: 100%;
    display: grid;
    grid-template-rows: auto 1fr;
    height: 100%;
    #mapOverlap{
      display: grid;
      box-shadow: 0 0 3px 1px;
      #map{
        grid-area: 1/1/1/1;
      }
      #overlapIndicator{
        pointer-events: none;
        z-index: 900;
        grid-area: 1/1/1/1;
        align-self: start;
        justify-self: start;
        width: 70%;
        height: 25%;
        background-color: hsla(0,100%,30%,.08);
        display: grid;
        place-items: center;
        font-size: 2rem;
        text-shadow: 0 0 2px black;
      }
    }
  }
}
</style>
