<template>
  <div class="t-preloadPage">
  </div>
</template>

<script>
    export default {}
</script>

<style lang="sass">
.t-preloadPage
  position: absolute
  top: 0
  right: 0
  bottom: 0
  left: 0
  z-index: 100
  background: #ffffff
  display: flex
  align-items: center
  justify-content: center
  opacity: 0.5


.loading
  position: relative
  display: flex
  align-items: center
  justify-content: center

.circle
  margin: 0 8px
  width: 5em
  height: 5em
  border-radius: 50%
  background: #B8D7F5!important
  top: 0
  border: 4px solid #B8D7F5
  &.c1
    border-radius: 50% 50% 0
    background: linear-gradient(90deg, #646, transparent)
    transform: rotate(-45deg)
  &.c2
    border-radius: 0 50% 50%
    transform: rotate(-45deg)
    background: linear-gradient(-90deg, #646, transparent)
    .in
      border-radius: 0 50% 50%

  .in
    position: absolute
    width: 80%
    height: 80%
    left: 10%
    top: 10%
    background-color: #fff
    border-radius: 50% 50% 0

.loader
  position: absolute
  left: 3.5em
  top: 0
  width: 5em
  height: 5em
  animation: loader 1.5s infinite linear
  transform: translate(-60%, 0)
  .in
    position: absolute
    top: 50%
    left: 50%
    width: 20%
    height: 20%
    background-color: rgba(82,168,242,0.7)
    border-radius: 50%
    transform: translate(-50%,200%)
    animation: in 1.5s infinite linear

@keyframes loader
  0%
    transform: translate(-60%,0) rotate(0)
  25%
    transform: translate(60%,0) rotate(0)
  50%
    transform: translate(60%,0) rotate(180deg)
  75%
    transform: translate(-60%,0)  rotate(180deg)
  100%
    transform: translate(-60%,0)  rotate(0deg)
@keyframes in
  0%
    transform: translate(-50%,200%)
  25%
    transform: translate(-50%,-300%)
  50%
    transform: translate(-50%,-300%)
  75%
    transform: translate(-50%,200%)
  100%
    transform: translate(-50%,200%)
</style>