<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <router-view class="page-container"></router-view>
    </transition>
  </div>
</template>

<style lang="less">
html,
body {
  height: 100%;
  width: 100%;
  overflow: hidden;
}
#app {
  height: 100%;
  width: 100%;
  background-color: #f3f3f5;
  overflow-x: auto;
}
.page-container {
  width: 100%;
  height: 100%;
  min-width: 1000px;
  overflow: auto;
}
</style>
