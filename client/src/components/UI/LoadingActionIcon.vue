<template>
  <div class="lds-loader">
    <img class="w-75 h-75" src="/images/loading.gif" alt="" />
    <div class="lds-back"></div>
    <div class="lds-rotate"></div>
  </div>
</template>

<style scoped>
.lds-loader {
  position: relative;
  width: 60px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.lds-back {
  position: absolute;
  width: 115%;
  height: 115%;
  background-color: #fff;
  z-index: -1;
  animation: rotate-77708760 4s linear infinite;
}

.lds-rotate {
  position: absolute;
  top: -5px;
  width: 100%;
  height: 100%;
  border: 8px solid #262626;
  box-sizing: content-box;
  animation: rotate 4s linear infinite;
}

@keyframes rotate {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
