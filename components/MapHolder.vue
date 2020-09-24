<template>
  <div id="map-wrap">
    <l-map :zoom="masterMapArr[controller].mapZoom" :center="masterMapArr[controller].mapCenter" @click="newPinStart" >
      <l-tile-layer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"></l-tile-layer>
      <l-marker v-for="(marker, index) in masterMapArr[controller].mapMarkers" class="mapPin"
                :lat-lng="marker.location" :icon="getIcon(marker)" @click="pinClick(index)" ></l-marker>
      <l-marker v-for="(marker, index) in masterMapArr[controller].mapMarkers" class="mapText"
                :lat-lng="marker.location" :icon="getText(marker)" @click="pinClick(index)"></l-marker>
    </l-map>
  </div>
</template>

<script>
export default {
  name: "MapHolder",
  computed: {
    masterMapArr(){
      if(this.$store.state.masterList.Values.length > 0){
        return this.$store.state.masterList.Values
      }else {
       return  [
         {
           mapName: `default`,
           mapZoom: 8,
           mapCenter: [44.977161, -93.265322],
           mapMarkers:[
             {text:'Minneapolis', location:[44.977161, -93.265322]},
           ],
         }
       ]
      }
    },
    controller(){
      return this.$store.state.masterList.Controller
    }
  },
  methods: {
    getIcon(item) {
      return L.divIcon({
        className: "my-custom-pin",
        html: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 54.892337" height="70" width="50">
  <g transform="translate(-814.59595,-274.38623)">
    <g transform="matrix(1.1855854,0,0,1.1855854,-151.17715,-57.3976)">
      <path d="m 817.11249,282.97118 c -1.25816,1.34277 -2.04623,3.29881 -2.01563,5.13867 0.0639,3.84476 1.79693,5.3002 4.56836,10.59179 0.99832,2.32851 2.04027,4.79237 3.03125,8.87305 0.13772,0.60193 0.27203,1.16104 0.33416,1.20948 0.0621,0.0485 0.19644,-0.51262 0.33416,-1.11455 0.99098,-4.08068 2.03293,-6.54258 3.03125,-8.87109 2.77143,-5.29159 4.50444,-6.74704 4.56836,-10.5918 0.0306,-1.83986 -0.75942,-3.79785 -2.01758,-5.14062 -1.43724,-1.53389 -3.60504,-2.66908 -5.91619,-2.71655 -2.31115,-0.0475 -4.4809,1.08773 -5.91814,2.62162 z" style="fill:${'darkblue'};stroke:${'black'};"/>
      <circle r="3.0355" cy="288.25278" cx="823.03064" id="path3049" style="display:inline;fill:${'white'};"/>
    </g>
  </g>
 </svg>`
      });
    },
    getText(marker) {
      return L.divIcon({
        className: "my-custom-pin",
        html: `<h1>${marker.text}</h1>`
      });
    },
    newPinStart(e){
      // on map click emits the lat and lang of the position clicked if there is a value in the store
      if(this.$store.state.masterList.Values.length > 0){
        this.$emit('addPin',e.latlng)
      } else{
      }
    },
    pinClick(index){
      if(this.$store.state.masterList.Values.length > 0){
        console.log('piin')
        this.$emit('pinClick', index)
      }
    }
  }
}
</script>

<style lang="scss">
#map-wrap{

}
.leaflet-control-zoom{
  display: none;
}
.leaflet-marker-icon{
h1{
  margin-left: -145px;
  margin-top: -10px;
  text-align: center;
  width: 300px;
  text-shadow: 0 0 3px #ffffff;
}
svg{
  margin-top: -50px;
  margin-left: -20px;
}
}
</style>
