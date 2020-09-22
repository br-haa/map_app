<template>
  <div class="geoList">
    <label for="geoInput" id="geoInputLabel">
      <input id="geoInput" type="text" v-model="inputValue" @keypress.13="inputMap" placeholder="MapName">
    </label>
   <div>
     <div>
       <div v-for="(text, index) in displayText" class="geoItem" :class="{selected: index === $store.state.masterList.Controller}">
         <div class="actionable" @click="changeController(index)"><p class="geoItemText">{{text}}</p></div>
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

    }
  },
  methods:{
  inputMap(){
    this.$emit('addMap', this.inputValue)
  },
  changeController(index){
    this.$store.commit('masterList/changeController', index)
  },
  emitDelete(index){
    this.$emit('deleteMap',index)
  }

  }
}
</script>

<style scoped lang="scss">
.selected{
  background-color: hsla(0,0%,100%,0.5) !important;
  color: black !important;
  transition: .5s;
}
.geoItem{
  background-color: hsla(0,0%,100%,0.0);
  color: white;
  padding: .3rem;

  display: grid;
  grid-template-columns: 1fr auto;
  grid-column-gap: 1rem;
  border-bottom: 1px solid white;
.actionable{
  width: 100%;
  cursor: pointer;
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
  background-color: rgba(0, 0, 0, 0.54);
  overflow-y: scroll;
  height: 600px;
  padding: 1rem;
}
</style>
