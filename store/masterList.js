export const state = () => ({
  Values:[
  ],
  Controller: 0,
  DefaultColors: {pin:'#0c0066',label:'#0c0066', default: true},
  DefaultSizes: {pin:70,label:25, default: true}
})

export const mutations = {
  pushValues(state, value){
    let mapObj = {mapName:value.mapName, mapZoom: value.mapZoom, mapCenter: value.mapCenter, mapMarkers: value.mapMarkers, mapPinColors: value.mapPinColors, mapPinSizes: value.mapPinSizes}
    let check = [];
    state.Values.forEach(obj => {
      if(obj.mapName === value.mapName){
        check.push(true)
        console.log('dupe')
        obj.mapZoom = value.mapZoom;
        obj.mapCenter = value.mapCenter;
      }
        else if(value.mapName === '' || value.mapName === undefined || value.mapName === null){
          console.log('empty')
          check.push(true)
      }
      else {
        console.log('not dupe')
        check.push(false)
      }
    })

    if(check.some((x) => { return x === true }) || value.mapName === '' || value.mapName === undefined || value.mapName === null){
      check = []
    } else {
      state.Values.push(mapObj)
      check = []
    }
  },
  removeValue(state,value){
    state.Values.splice(value,1)
  },
  addMarker(state,value){
    state.Values[state.Controller].mapMarkers.push({text: value.text, location: value.location})
  },
  removeMarker(state,value){
    let chosenGet = (element) => element.name === value
    let chosen = state.Values[state.Controller].mapMarkers.findIndex(chosenGet)
    state.Values[state.Controller].mapMarkers.splice(chosen,1)
  },
  renameMarker(state,value){
    state.Values[state.Controller].mapMarkers[value.index].text = value.value
  },
  changeController(state,value) {
    state.Controller = value
  },
  changeColors(state,value){
    state.Values[state.Controller].mapPinColors = value
  },
  changeSizes(state,value){
    state.Values[state.Controller].mapPinSizes = value
  },
  setDefaultColor(state,value){
    state.DefaultColors = value
  },
  setDefaultSize(state,value){
    state.DefaultSizes = value
  }
}
