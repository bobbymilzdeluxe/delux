<template>
  <div>
    <div style="height: 100%">
      <VCard
        flat
        rounded="lg"
        class="wavy teal accent-2 pa-4 pa-md-4"
        :min-height="$vuetify.breakpoint.mdAndDown ? '170' : '145'"
      >
        <div class="">
          <p class="black--text font-weight-light text-body-2 text-md-body-1">
            Loan
          </p>
        </div>
        <div>
          <p
            class="black--text font-weight-bold text-subtitle-2 text-md-subtitle-1"
          >
            Need some cash?
          </p>
        </div>
        <div>
          <p class="black--text font-weight-light text-caption">
            Get an affordable loan without collateral
          </p>
        </div>
      </VCard>

      <div class="mx-auto text-center d-flex justify-center">
        <VCol cols="8">
          <div>
            <v-card flat class="green darken-3 d-flex mt-n7" style="z-index: 3">
              <div class="mx-auto text-center">
                <VBtn
                  color="white"
                  text
                  class="text-capitalize"
                  to="/dashboard/loan"
                  >Apply for loan</VBtn
                >
              </div>
            </v-card>
          </div>
        </VCol>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style>
.aquaColor1 {
  background: rgba(16, 221, 201, 0.993);
}
</style>
