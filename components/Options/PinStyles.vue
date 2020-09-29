<template>
<div class="pinStylesGrid">
  <div class="colorWrapper">
    <div class="colorGrid">
      <h1>Color</h1>
      <div class="inputGrid">
        <label>
          Pin Color
          <input type="color">
        </label>
        <label>
          Label Color
          <input type="color">
        </label>
        <button>Set Colors</button>
      </div>
    </div>
  </div>

  <div class="sizeWrapper">
    <div class="sizeGrid">
      <h1>Size</h1>
      <div class="inputGrid">
        <label>
          Pin Size (in px)
          <input type="number">
        </label>
        <label>
          Label Size (in px)
          <input type="number">
        </label>
        <button>Set Sizes</button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: "PinStyles"
}
</script>

<style scoped lang="scss">
.pinStylesGrid{
  display: grid;
  grid-template-columns: 1fr 1fr;
  height: 100%;
  .colorWrapper{
    width:100%;
    height: 100%;
    border-right: 2px solid white;
    display: grid;
    .colorGrid{
      justify-self: center;
      width: 60%;
      display: grid;
      grid-template-rows: auto 1fr;
      grid-row-gap: 1rem;
      h1{
        border-bottom: 2px solid white;
        font-size: 6rem;
        color: white;
        text-align: center;
        margin: 0;
      }
    }
  }
  .sizeWrapper{
    width:100%;
    height: 100%;
    display: grid;
    .sizeGrid{
      justify-self: center;
      width: 60%;
      display: grid;
      grid-template-rows: auto 1fr;
      grid-row-gap: 1rem;
      h1{
        border-bottom: 2px solid white;
        font-size: 6rem;
        color: white;
        text-align: center;
        margin: 0;
      }
    }
  }
  .inputGrid{
    margin-top: -10rem;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 1rem;
    place-self: center;
    place-items: center;
    label{
      display:grid;
      grid-template-rows: auto 1fr;
      justify-items: center;
      color: white;
      input{
        height: 40px;
        text-align: center;
      }
    }
    button{
      grid-column: 1/3;
      height: 40px;
      width: 100%;
      background-color: white;
      border: black 1px solid;
      box-shadow: 0 0 3px 1px;
      cursor: pointer;
      text-decoration: underline hsla(195,50%,50%,1);
      font-weight: bold;
    }
  }
}
</style>
