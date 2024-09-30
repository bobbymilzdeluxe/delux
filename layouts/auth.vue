<template>
  <VApp class="accent">
    <div class="wavy2 bgStrange accent d-flex justify-center align-center">
      <v-main>
        <v-slide-x-transition>
          <nuxt />
        </v-slide-x-transition>
      </v-main>
    </div>
    <alert-comp />
  </VApp>
</template>

<script>
import alertComp from '~/components/utils/alertComp.vue'
export default {
  components: { alertComp },
}
</script>

<style>
.bgStrange {
  background-attachment: fixed;
}
</style>
