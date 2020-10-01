export const state = () => ({
  mapSize:{desktop:0,mobile:0},
})

export const mutations = {
  changeMapSize(state,value){
    console.log('changing map size')
    state.mapSize.desktop =  parseInt(value.desktop);
    state.mapSize.mobile = parseInt(value.mobile);
  },
}
