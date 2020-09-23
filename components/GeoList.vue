<template>
  <div class="geoList">
    <label for="geoInput" id="geoInputLabel">
      <input id="geoInput" type="text" v-model="inputValue" @keypress.13="inputMap" placeholder="MapName">
    </label>
   <div>
     <div class="textDisplay">
       <div v-for="(text, index) in displayText" class="geoItem" :class="{selected: index === $store.state.masterList.Controller}">
         <div class="actionable" @click="changeController(index)"><p class="geoItemText">{{text.mapName}}</p></div>
         <button class="geoDeleteButton" @click="emitDelete(index)">X</button>
       </div>
   </div>
  </div>
  </div>
</template>

<script>
export default {
name: "GeoList",
  data(){
    return{
      inputValue:'',
      geoList: [],
    }
  },
  computed:{
    displayText(){
      if(this.$store.state.masterList.Values){
        return this.$store.state.masterList.Values
      } else {
        return ['...']
      }
    },
    controller(){
      return this.$store.state.masterList.Controller
    },
    values(){
      return this.$store.state.masterList.Values
    }
  },
  methods:{
  inputMap(){
    this.$emit('addMap', this.inputValue)
    this.inputValue = ''
  },
  changeController(index){
    this.$store.commit('masterList/changeController', index)
  },
  emitDelete(index){
    if(this.controller === this.values.length -1 && this.controller !== 0){
      this.$store.commit('masterList/changeController', this.controller -1)
    }
    this.$emit('deleteMap',index)
  }

  }
}
</script>

<style scoped lang="scss">
#geoInputLabel{
  width: 100%;
  input{
    width: 100%;
    height: 40px;
    padding: 0;
  }
}
.selected{
  background-color: hsla(0,0%,100%,0.5) !important;
  color: red !important;
  transition: .5s;
}
.geoItem{
  background-color: hsla(0,0%,100%,0.0);
  color: black;
  padding: .3rem;
  display: grid;
  grid-template-columns: 1fr auto;
  grid-column-gap: 1rem;
  border-bottom: 1px solid #000000;
.actionable{
  width: 100%;
  cursor: pointer;
  display: grid;
  align-items: center;
}
  p{
    margin: 0;
  }
.geoDeleteButton{
  cursor: pointer;
  justify-self: end;
  background-color: red;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 3px;
  padding: 0;
  height: 1.5rem;
  width: 1.5rem;
  margin: 0;
}
transition: .5s;
}
.textDisplay{
  overflow-y: scroll;
  height: 100%;
  margin-top: 1rem;
}
</style>
