<template>
<div id="optionsWrapper">
    <div id="optionsControlHolder" tabindex="0" @click="openClose = !openClose">
 <div class="bootlegButton" :class="{bootlegButtonOpen: openClose, bootlegButtonClosed: !openClose}" >
   <div  class="line"></div>
   <div  id="alsoX" :class="{xMode: !openClose}" class="line" ></div>
   <div class="line"></div>
 </div>
    </div>
  <transition name="fall">
    <div v-if="openClose" id="optionsBody">
      <div id="optionsBodyGrid">
        <div id="optionsNav">
          <button v-for="option in navOptions" :class="{selected: optionsView === option.link}" @click="optionsView = option.link">{{option.name}}</button>
        </div>
        <transition name="fade" mode="out-in">
          <component :is="optionsView" @setMapSize="setMapSize" @pinColors="setPinColors" @pinSizes="setPinSizes"> </component>
        </transition>

      </div>
    </div>
  </transition>
</div>
</template>

<script>
import MapSize from "@/components/Options/MapSize";
import PinStyles from "@/components/Options/PinStyles";
import UploadDownload from "@/components/Options/UploadDownload";
export default {
name: "OptionsModal",
  data(){
  return{
    openClose: false,
    navOptions:[
      {name:'Change Map Size', link:'MapSize'},
      {name:'Style Map Pins', link:'PinStyles'},
      {name:'Upload / Download', link:'UploadDownload'},
    ],
    optionsView: 'PinStyles'
  }
  },
  components:{
    MapSize,
    PinStyles,
    UploadDownload
  },
  methods:{
    setMapSize(sizeObject){
      console.log('helllo')
      this.$store.commit('options/changeMapSize', sizeObject)
      this.$emit('update')
    },
    setPinColors(colorObject){
      this.$store.commit('masterList/setDefaultColor', colorObject)
    },
    setPinSizes(sizeObject){
      this.$store.commit('masterList/setDefaultSize', sizeObject)
    }
  },
  mounted() {

  }
}
</script>

<style scoped lang="scss">
#optionsWrapper{
  display: grid;
  height: 100vh;
  width: 100vw;
  position: fixed;
  user-select: none;
  pointer-events: none;
  z-index: 9998;
  #optionsControlHolder{
    margin: 1rem 1rem 0 0;
    grid-area: 1/1/1/1;
    align-self: start;
    justify-self: end;
    width: 50px;
    height: 50px;
    cursor: pointer;
    pointer-events: initial;
    z-index: 9999;
    transition: .3s;
    &:focus{
      outline: none;
    }
    .line{
      background: white;
    }
    .bootlegButtonOpen{
      width: 95%;
      height: 95%;
      animation: open 1s forwards ;
      display: grid;
      .line{
        grid-area: 1/1/1/1;
        &:nth-of-type(1){
          height: 6px;
          animation: disappear 1s backwards;
          animation-fill-mode: forwards;
          align-self: start;
          margin-top: 10px;
        }
        &:nth-of-type(2){
          animation: lineOpen .8s forwards;
          align-self: center;
          width: 100%;
          height: 100%;
        }
        &:nth-of-type(3){
          height: 6px;
          animation: disappear 1s backwards ;
          animation-fill-mode: forwards;
          align-self: end;
          margin-bottom: 10px;
        }
      }
    }
    .bootlegButtonClosed{
      width: 95%;
      height: 95%;
      animation: close 1s forwards ;
      display: grid;
      .line{
        width: 100%;
        height: 6px;
        grid-area: 1/1/1/1;
        &:nth-of-type(1){
          animation: appear 1s forwards;
          align-self: start;
          margin-top: 10px;
        }
        &:nth-of-type(2){
          animation: lineClose .8s forwards;
          align-self: center;
        }
        &:nth-of-type(3){
          animation: appear 1s forwards;
          align-self: end;
          margin-bottom: 10px;
        }
      }
    }
  }
#optionsBody{
  background: hsla(200,40%,20%,0.9);
  grid-area: 1/1/1/1;
  backdrop-filter: blur(5px);
  pointer-events: initial;
  display: grid;
  place-items: center;
  #optionsBodyGrid{
    width: 90%;
    height: 80%;
    display: grid;
    grid-template-rows: auto 1fr;
    grid-row-gap: 1rem;
    #optionsNav{
      width: 100%;
      display: flex;
      background-color: hsla(100,50%, 100%, 0.6);
      align-self: start;
      justify-self: center;
      height: 3rem;
      border-radius: 3px;
      justify-content: center;
      button{
        cursor: pointer;
        background: none;
        border: none;
        font-size: 1rem;
        text-align: center;
        color: hsla(195,50%,30%,1);
        text-decoration: underline hsla(195,50%,20%,1);
        padding: 0 2rem 0 2rem;
        transition: .3s;
        &:focus{
          outline: none;
        }
      }
      .selected{
        font-size: 1.5rem !important;
      }
    }
  }
}
}
@keyframes open {
  0%{transform: rotate(0deg)}
  10%{transform: rotate(-10deg)}
  75%{transform: rotate(370deg)}
  85%{transform: rotate(370deg)}
  100%{transform: rotate(360deg)}
}
@keyframes lineOpen {
  0%{clip-path: polygon(20% 0%, 0 0, 0 50%, 0 100%, 22% 100%, 51% 100%, 80% 100%, 100% 100%, 100% 48%, 100% 0, 80% 0%, 46% 0); height: 6px}
  100%{clip-path: polygon(20% 0%, 0% 20%, 30% 50%, 0% 80%, 20% 100%, 50% 70%, 80% 100%, 100% 80%, 70% 50%, 100% 20%, 80% 0%, 50% 30%); height: 100%}
}
@keyframes lineClose {
  0%{clip-path: polygon(20% 0%, 0% 20%, 30% 50%, 0% 80%, 20% 100%, 50% 70%, 80% 100%, 100% 80%, 70% 50%, 100% 20%, 80% 0%, 50% 30%); height: 100%}
  100%{clip-path: polygon(20% 0%, 0 0, 0 50%, 0 100%, 22% 100%, 51% 100%, 80% 100%, 100% 100%, 100% 48%, 100% 0, 80% 0%, 46% 0); height: 6px}
}
@keyframes close {
  0%{transform: rotate(0deg)}
  10%{transform: rotate(-10deg)}
  75%{transform: rotate(370deg)}
  85%{transform: rotate(370deg)}
  100%{transform: rotate(360deg)}
}
@keyframes appear {
  0%{opacity: 0}
  100%{opacity: 1;}
}
@keyframes disappear {
  0%{opacity: 1}
  100%{opacity: 0;}
}
.fall-enter-active, .fall-leave-active{
  transform: translateY(0);
  transition: .5s;
}
.fall-enter, .fall-leave-to{
  transform: translateY(-100vh);
}
.fade-enter-active, .fade-leave-active{
  opacity: 1;
  transition: .5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
