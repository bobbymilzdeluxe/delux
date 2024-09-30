<template>
  <div>
    <v-row class="mx-0 px-0" justify="center" align="center">
      <VCol cols="12" md="10">
        <VCard
          class="d-flex align-center justify-center wavy"
          color="rgba(255,4,117,.1)"
          flat
          rounded="xl"
          min-height="300px"
        >
          <VCardText>
            <div>
              <p
                class="text-h4 text-md-h3 accent--text font-weight-bold text-center"
              >
                <slot name="text"></slot>
              </p>
              <p class="d-flex justify-center">
                <VBtn color="primary" large depressed to="/register">
                  <slot name="btn"></slot>
                </VBtn>
              </p>
            </div>
          </VCardText>
        </VCard>
      </VCol>
    </v-row>
  </div>
</template>

<script>
export default {}
</script>

<style></style>
