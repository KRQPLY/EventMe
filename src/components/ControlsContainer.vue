<template>
  <div class="controls-container">
    <div class="controls-main">
      <slot></slot>
    </div>
    <div class="controls-row">
      <slot name="row"></slot>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.controls-container {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  z-index: 1000;

  .controls-main {
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    top: -27px;
  }
  .controls-row {
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 0 20px;
    margin-top: 50px;
  }
}

@include media-xs {
  .controls-container {
    .controls-row {
      padding: 0 40px;
    }
  }
}

@include media-md {
  .controls-container {
    .controls-main {
      top: -32px;
    }
  }
}
</style>
