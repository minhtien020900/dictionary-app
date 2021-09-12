<template>
  <transition name="fade" mode="out-in">
  <component :is="this.$route.meta.layout">
    <transition name="fade" mode="out-in">
      <router-view/>
    </transition>
  </component>
  </transition>

</template>

<script>

export default {
  name: 'App',

  data: () => ({
    //
  }),
};
</script>
<style>
.slither-enter-active, .slither-leave-active {
  transition: transform 0.2s;
}

.slither-enter, .slither-leave-to {
  transform: translateX(-100%);
}

.slither-enter-to, .slither-leave {
  transform: translateX(0);
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}


.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
