<template>
  <div class="holder">
<div class="wrapper">
  <side-bars>
    <geo-list @deleteMap="cutFromMasterList" @addMap="createMapObject"></geo-list>
  </side-bars>
  <div id="mapGrid">
    <map-ui @renamePin="renamePin" @removePin="removePin" @uiUpdate="uiUpdate"></map-ui>
    <div id="mapOverlap" :style="{width:activeWidth, height: getHeight}">
      <div id="overlapIndicator">{{message}}</div>
    <map-holder id="map" @pinClick="setActivePin" @addPin="addPin" :reloadMap="reloadMapSwitch"></map-holder>
    </div>
  </div>
  <side-bars>
    <code-export></code-export>
  </side-bars>
</div>
    <div id="switchWrapper">
      <p>{{deviceLabel}}</p>
    <label class="switch">
      <input type="checkbox" v-model="deviceDesktop" @change="setWidth(); setLabel(); ">
      <span class="slider"></span>
    </label>
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
    getHeight: undefined,
    activeWidth:'100%',
    deviceDesktop: true,
    deviceLabel: 'Desktop',
    reloadMapSwitch: true,
  }
  },
  props:{
  update:{
    type: Boolean
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
    getColors(){ // getting the colors for the pins
      let singleColor = this.$store.state.masterList.Values[this.$store.state.masterList.Controller]?.mapColors
      let globalColor = this.$store.state.masterList.DefaultColors
      if(singleColor && singleColor.default === false){
        console.log('single')
        return singleColor
      } else {
        if(this.$store.state.masterList.Values.length > 0){
          console.log('global')
          this.$store.commit('masterList/changeColors',globalColor)
          return  singleColor
        } else {
          return globalColor
        }
      }
    },
    getSizes(){ // getting the sizes for the pins
      let singleSize = this.$store.state.masterList.Values[this.$store.state.masterList.Controller]?.mapSizes
      let globalSize = this.$store.state.masterList.DefaultSizes
      if(singleSize && singleSize.default === false){
        console.log('single')
        return singleSize
      } else {
        if(this.$store.state.masterList.Values.length > 0){
          console.log('global')
          this.$store.commit('masterList/changeSizes',globalSize)
          return  singleSize
        } else {
          return globalSize
        }
      }
    },
    message(){
      if(this.$store.state.masterList.Values.length === 0){
        return 'add a map to edit'
      }
    },
  },
  methods: {
  createMapObject(payload){
    // let length = this.$store.state.masterList.Values.length
    // this.$store.commit('masterList/changeController', length)
    if(payload){
      let sendObj = {mapName:payload, mapZoom: this.zoom, mapCenter: this.getCenterArr, mapMarkers: [], mapColors:this.getColors, mapSizes:this.getSizes}
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
    widthSwitch(){
    this.deviceDesktop = !this.deviceDesktop

    },
    setWidth(){
    let desktop = this.$store.state.options.mapSize.desktop;
    let mobile = this.$store.state.options.mapSize.mobile
    if(this.deviceDesktop){
      if(desktop !== 0 && desktop !== undefined){
        this.activeWidth = desktop+'px'
      }
    } else {
      if(mobile !==0 && mobile !== undefined){
        this.activeWidth = mobile+'px'
      }
    }
    this.setHeight()
    },
    setHeight(){
    if(this.activeWidth === '100%'){
      let map = document.querySelector('#mapOverlap')
      console.log('running height')
      if(map){
        this.getHeight = `${map.clientWidth}px`
      }
    } else {
      this.getHeight = this.activeWidth
    }
    this.reloadMapSwitch = !this.reloadMapSwitch
    },
    setLabel(){
      if(this.deviceDesktop){
        this.deviceLabel = 'Desktop'
      } else {
        this.deviceLabel = 'Mobile'
      }
    }
  },
  watch:{
update: function (){
  this.setWidth()
}
  },
  mounted() {
  this.setWidth()
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
  grid-area: 1/1/1/1;
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
      place-self: center;
      height: 600px;
      width: 600px;
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
#switchWrapper{
  grid-area: 1/1/1/1;
  align-self: end;
  justify-self: center;
  margin-bottom: 1rem;
  width: 55px;
  height: 30px;
  background: hsla(100,50%,100%,0.5);
  border-radius: 360px;
  padding: .2rem;
  display: grid;
  p{
    grid-area: 1/1/1/1;
    margin: 0;
    transform: translateY(-25px);
    text-align: center;
    color: white;
    user-select: none;
    pointer-events: none;
  }
  .switch {
    grid-area: 1/1/1/1;
    cursor: pointer;
    background: hsla(100,50%,100%,0.5);
    box-sizing: border-box;
    padding: .2rem;
    border-radius: 360px;
    display: grid;
    height: 100%;
    width: 100%;
    input{
      grid-area: 1/1/1/1;
      opacity: 0;
      width: 0;
      height: 0;
    }
    .slider{
      border-radius: 360px;
      transition: .3s;
      grid-area: 1/1/1/1;
      justify-self: end;
      width: 50%;
      height: 100%;
      background: hsla(195,50%,50%,1);
    }
    input:checked + .slider{
      justify-self: start;
    }
  }
}

</style>
