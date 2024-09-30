<template>
  <div>
    <main class="accent carb d-flex align-center" style="height: 50vh">
      <vContainer>
        <vContainer>
          <VCol cols="12">
            <div>
              <p
                class="text-center white--text font-weight-bold text-h4 text-md-h2"
              >
                Contact Us
              </p>
              <p class="text-center white--text text-subtitle-1 text-md-h5">
                Need support? Have a question? Running into a problem? We’re
                here to help.
              </p>
            </div>
          </VCol>
        </vContainer>
      </vContainer>
    </main>

    <main class="my-4 my-md-10 py-5 py-md-9">
      <vContainer>
        <vContainer>
          <v-row class="mx-0 px-0">
            <VCol cols="12" md="4" v-for="con in conCards" :key="con.text">
              <VCard
                color="white"
                rounded="lg"
                min-height="400px"
                style="box-shadow: rgba(0, 0, 0, 0.04) 0px 3px 5px"
              >
                <VCardTitle primary-title>
                  <v-img
                    :src="con.pic"
                    max-width="50"
                    height="50"
                    contain
                  ></v-img>
                </VCardTitle>
                <VCardText
                  class="font-weight-bold accent--text text-h6 text-md-h5"
                >
                  {{ con.title }}
                </VCardText>
                <VCardText
                  class="grey--text text-subtitle-2 text-md-subtitle-1"
                >
                  {{ con.text }}
                </VCardText>
                <VCardText class="mt-10 mt-md-10">
                  <nuxt-link to="/faqs">Visit the FAQs Page</nuxt-link>
                </VCardText>
              </VCard>
            </VCol>
          </v-row>
        </vContainer>
      </vContainer>
    </main>
  </div>
</template>

<script>
export default {
  created() {
    window.scrollTo(0, 0)
  },
  computed: {
    conCards() {
      return [
        {
          pic: 'https://assets-global.website-files.com/6453bf08503f6d73d5ffe98e/6465dcbeb9aadaaaad9a7b0f_Questions.svg',
          title: 'Have a question?',
          text: `Check out our FAQ section for tons of answers to some of ourmost common customer questions. It’s the fastest way to getthe answer you’re looking for!`,
        },
        {
          pic: 'https://assets-global.website-files.com/6453bf08503f6d73d5ffe98e/646f3ee0eeb4ddfdaefe46bd_Drop%20msg.svg',
          title: 'Drop us a message',
          text: 'Our support team is on hand to take your queries and offer prompt resolutions to your tickets.',
        },
        {
          pic: 'https://assets-global.website-files.com/6453bf08503f6d73d5ffe98e/646f3ee0eeb4ddfdaefe46bc_community%20icon.svg',
          title: 'Ask the community',
          text: 'We have a vibrant community of Deluxe Integrity Bank customers where we communicate regular updates about our products and services.',
        },
      ]
    },
  },
  head: {
    titleTemplate: 'Contact - Deluxe Integrity Bank ',
  },
}
</script>

<style></style>
