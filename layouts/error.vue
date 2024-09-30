<template>
  <v-app dark>
    <!-- <h1 v-if="error.statusCode === 404">
      {{ pageNotFound }}
    </h1>
    <h1 v-else>
      {{ otherError }}
    </h1> -->
    <div class="grey lighten-5 d-flex align-center" style="height: 100vh">
      <v-row class="mx-0 px-0" justify="center">
        <VCol cols="12" md="8">
          <v-img src="/clouderror.svg" class="mx-auto" width="300"></v-img>
          <p
            class="grey--text text-center my-0 py-0 text-darken--2 text-h3 text-md-h1"
          >
            404
          </p>
          <p
            class="grey--text text-center my-0 py-0 text-darken--2 text-caption text-md-body-2"
          >
            Page Not Found
          </p>
          <p
            class="grey--text text-center font-weight-bold my-0 py-0 text-darken--2 text-subtitle-2 text-md-subtitle-1"
          >
            The page you are looking for doesn't exist or an error occured. Go
            back, or head over to
            <NuxtLink style="text-decoration: none" to="/">
              Home page
            </NuxtLink>
            to choose a direction
          </p>
        </VCol>
      </v-row>
    </div>
  </v-app>
</template>

<script>
export default {
  name: 'EmptyLayout',
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      pageNotFound: '404 Not Found',
      otherError: 'An error occurred',
    }
  },
  head() {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title,
    }
  },
}
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
