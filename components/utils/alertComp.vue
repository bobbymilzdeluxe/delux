<template>
  <div>
    <v-snackbar
      :timeout="-1"
      :value="alert.is"
      app
      shaped
      top
      :color="alertColor[alert.type]"
      :right="$vuetify.breakpoint.mdAndDown ? null : true"
      :centered="$vuetify.breakpoint.mdAndDown ? true : null"
      :max-width="$vuetify.breakpoint.mdAndDown ? '300' : '500'"
      elevation="2"
      :transition="alert.is ? 'scale-transition' : 'slide-x-reverse-transition'"
    >
      <div class="ma-0 pa-0 d-flex align-center" style="gap: 7px">
        <div>
          <VIcon>{{ alertIcon[alert.type] }}</VIcon>
        </div>
        <p class="ma-0 pa-0">
          {{ alert.message }}
        </p>
        <VSpacer />
        <div v-if="alert.close">
          <VIcon @click="closeAlert">mdi-close</VIcon>
        </div>
      </div>
    </v-snackbar>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  computed: {
    ...mapGetters({ alert: 'authentication/getAlert' }),
    alertIcon() {
      return {
        error: 'mdi-alert-circle',
        success: 'mdi-information',
      }
    },
    alertColor() {
      return {
        success: 'primary',
        error: 'red darken-1',
      }
    },
  },
  methods: {
    ...mapMutations({ alertClose: 'authentication/setAlert' }),
    closeAlert() {
      this.alertClose({
        message: this.alert.message,
        type: this.alert.type,
        is: false,
        close: this.alert.message,
      })
    },
  },
}
</script>

<style></style>
