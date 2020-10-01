<template>
<div id="codeHolder">
  <code id="code" v-if="this.$store.state.masterList.Values.length > 0">
    [
    <div class="spacer"></div>
    <code v-for="code in this.$store.state.masterList.Values">
      {{code}},
      <div class="spacer"></div>
    </code>
]
  </code>
  <button id="copyButton" @click="copy">Copy Code</button>
</div>
</template>

<script>
export default {
name: "CodeExport",
  methods:{
  copy() {
    if (this.$store.state.masterList.Values.length > 0) {
      let code = document.querySelector('#code')
      this.copyText(code)
    }
  },
    copyText(element) {
      let range, selection, worked;

      if (document.body.createTextRange) {
        range = document.body.createTextRange();
        range.moveToElementText(element);
        range.select();
      } else if (window.getSelection) {
        selection = window.getSelection();
        range = document.createRange();
        range.selectNodeContents(element);
        selection.removeAllRanges();
        selection.addRange(range);
      }

      try {
        document.execCommand('copy');
        alert('text copied');
      }
      catch (err) {
        alert('unable to copy text');
      }
    }
  }
}
</script>

<style scoped lang="scss">
.spacer{
  height: .5rem;
}
#codeHolder{
  display: grid;
  grid-template-rows: 1fr auto;
  height: 100%;
  #copyButton{
    align-self: end;
    height: 40px;
    background-color: white;
    border: black 1px solid;
    box-shadow: 0 0 3px 1px;
    cursor: pointer;
    text-decoration: underline hsla(195,50%,50%,1);
    font-weight: bold;
  }
}
</style>
