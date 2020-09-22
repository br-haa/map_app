export const state = () => ({
  Values:[
  ],
  Controller: 0
})

export const mutations = {
  pushValues(state, value){
    function mapObj(mapName, mapZoom, mapCenter, mapMarkers){
      value.name = mapName;
      value.zoom = mapZoom;
      value.center = mapCenter;
      value.markers = mapMarkers
    }
    let check = [];
    state.Values.forEach(obj => {
      if(obj.name === value.name){
        check.push(true)
        obj.zoom = value.zoom;
        obj.center = value.center;
        obj.markers = value.markers;
      } else {
        check.push(false)
      }
    })

    if(check.some((x) => {
      return x === true
    })){
      check = []
    } else {
      state.Values.push(mapObj)
    }
  },
  removeValue(state,value){
    state.Values.splice(value,1)
  },
  addMarker(state,value){
    state.Values[state.Controller].markers.push({text: value.text, location: value.location})
  },
  removeMarker(state,value){
    let chosenGet = (element) => element.name === value
    let chosen = state.Values[state.Controller].markers.findIndex(chosenGet)
    state.Values[state.Controller].markers.splice(chosen,1)
  },
  renameMarker(state,value){
    state.Values[state.Controller].markers[value.index].text = value.value
  },
  changeController(state,value) {
    state.Controller = value
  }
}
