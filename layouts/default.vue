<template>
  <VApp>
    <head>
      <!-- Smartsupp Live Chat script -->
      <!-- <script type="text/javascript">
        var _smartsupp = _smartsupp || {}
        _smartsupp.key = '0578727af992fe9663cc0e8441a4e64ed2bc6f1f'
        window.smartsupp ||
          (function (d) {
            var s,
              c,
              o = (smartsupp = function () {
                o._.push(arguments)
              })
            o._ = []
            s = d.getElementsByTagName('script')[0]
            c = d.createElement('script')
            c.type = 'text/javascript'
            c.charset = 'utf-8'
            c.async = true
            c.src = 'https://www.smartsuppchat.com/loader.js?'
            s.parentNode.insertBefore(c, s)
          })(document)
      </script> -->
      <!-- <noscript> Powered by <a href=“https://www.smartsupp.com” target=“_blank”>Smartsupp</a></noscript> -->
    </head>

    <div class="white">
      <!-- navbar section -->
      <nav>
        <v-app-bar
          app
          class="px-0 mx-0"
          :class="$vuetify.breakpoint.mdAndDown ? 'blurr' : 'accent'"
          flat
        >
          <div class="d-flex align-center">
            <div class="ma-0 pa-0">
              <v-img
                width="60"
                height="40"
                @click="$router.push('/')"
                style="cursor: pointer"
                contain
                src="/logo/line.svg"
              ></v-img>
            </div>
            <div class="ma-0 pa-0">
              <div
                class="accent--text ma-0 pa-0 text--lighten-4 d-none d-md-block font-weight-medium text-h6"
              >
                Deluxe Integrity Bank
              </div>
              <!-- <div
                class="accent--text ma-0 pa-0 text--lighten-4 d-block d-md-none font-weight-regular"
              >
                F.M.B
              </div> -->
            </div>
          </div>
          <VSpacer />
          <div>
            <v-menu
              offset-y
              open-on-hover
              transition="scale-transition"
              v-for="nav in navLinks"
              :key="nav.name"
            >
              <template v-slot:activator="{ on, attrs }">
                <VBtn
                  class="text-capitalize font-weight-light d-md-inline-block d-none"
                  color="white"
                  :ripple="false"
                  :class="nav.options ? null : 'mt-5'"
                  v-bind="attrs"
                  v-on="on"
                  plain
                  :to="nav.to"
                  text
                  >{{ nav.name }}</VBtn
                >
              </template>

              <v-list class="boxshadow" elevation="0" v-if="nav.options">
                <v-list-item
                  v-for="(item, index) in nav.options"
                  :key="index"
                  :to="item.to"
                  class="my-0 py-2 py-0 align-center"
                  active-class="primary lighten-5"
                >
                  <div class="d-flex">
                    <v-list-item-icon class="mx-0 px-0 mx-4"
                      ><v-img :src="item.src" contain width="20"></v-img
                    ></v-list-item-icon>
                    <div
                      class="d-flex flex-column align-start text-right justify-start"
                    >
                      <v-list-item-title
                        class="text-right font-weight-medium align-self-start"
                        >{{ item.title }}</v-list-item-title
                      >
                      <v-list-item-subtitle>{{
                        item.text
                      }}</v-list-item-subtitle>
                    </div>
                  </div>
                </v-list-item>
              </v-list>
            </v-menu>
            <v-google-translate
              class="grey--text mr-2 d-block d-md-none"
              dark
            />
            <div class="d-md-inline d-none" @click="$router.push('/login')">
              <VBtn
                class="white accent--text text-capitalize d-md-inline d-none"
                large
                depressed
                text
                >Log in</VBtn
              >
            </div>
          </div>
          <VBtn
            color="transparent"
            fab
            icon
            class="d-block d-md-none"
            @click="drawer = true"
            ><VIcon color="white">mdi-menu</VIcon></VBtn
          >
        </v-app-bar>
        <VDivider class="red secondary" />
      </nav>

      <!-- navigation drawer section -->
      <aside>
        <VNavigationDrawer
          v-model="drawer"
          right
          temporary
          app
          color="accent"
          style="height: 100vh"
        >
          <v-list class="white--text">
            <VBtn color="" fab icon @click="drawer = false"
              ><VIcon color="secondary">mdi-chevron-right</VIcon></VBtn
            >
            <VCard
              flat
              color="transparent"
              max-height="100"
              class="mx-auto mt-n5 ma-0 pa-0 text-center d-flex justify-center"
            >
              <div @click="$router.push('/')">
                <v-img
                  width="80"
                  height="100"
                  contain
                  src="/logo/line2.svg"
                ></v-img>
              </div>
            </VCard>
            <v-list-group
              v-for="nav in navLinks"
              append-icon=""
              :key="nav.name"
              no-action
            >
              <template v-slot:activator>
                <v-list-item-content>
                  <v-list-item-title class="white--text"
                    ><VBtn
                      text
                      block
                      plain
                      :ripple="false"
                      depressed
                      :to="nav.to ? nav.to : null"
                      class="white--text text-right"
                      >{{ nav.name }}</VBtn
                    >
                  </v-list-item-title>
                  <VDivider class="primary darken-2" />
                </v-list-item-content>
              </template>

              <div v-if="nav.options">
                <v-list-item
                  v-for="child in nav.options"
                  :key="child.src"
                  :to="child.to"
                >
                  <v-list-item-icon class="mx-0 px-0 mx-4"
                    ><v-img
                      :src="child.src"
                      contain
                      width="10"
                      height="60"
                    ></v-img
                  ></v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title
                      class="white--text"
                      v-text="child.title"
                    ></v-list-item-title>
                    <v-list-item-subtitle
                      class="white--text"
                      v-text="child.text"
                    ></v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </div>
            </v-list-group>
          </v-list>
        </VNavigationDrawer>
      </aside>

      <!-- main content -->
      <v-main>
        <v-slide-x-reverse-transition>
          <nuxt />
        </v-slide-x-reverse-transition>
      </v-main>

      <!-- footer content -->
      <footer>
        <VFooter color="accent">
          <v-row class="mx-0 px-0" align="start" justify="center">
            <VCol cols="12" md="3" class="d-flex justify-center">
              <VCard flat color="transparent">
                <v-img
                  width="150"
                  height="70"
                  contain
                  src="/logo/line.svg"
                ></v-img>
                <div>
                  <v-google-translate
                    class="primary--text mr-2 d-none d-md-block"
                  />
                </div>
              </VCard>
            </VCol>
            <VCol
              cols="12"
              md="3"
              v-for="nav in navLinks"
              :key="nav.name"
              class="d-flex flex-column flex-wrap justify-center align-center"
            >
              <VBtn
                class="secondary--text text-capitalize font-weight-bold text-subtitle-2 text-md-subtitle-1"
                color="transparent"
                block
                :to="nav.to ? nav.to : null"
                :ripple="false"
                depressed
                >{{ nav.name }}</VBtn
              >
              <!-- <VBtn
                class="secondary--text text-capitalize font-weight-medium text-left text-caption text-md-subtitle-2"
                color="transparent"
                depressed
                >{{ child.text }}</VBtn
              > -->

              <v-list
                dense
                class="secondary--text text-capitalize font-weight-medium text-left text-caption text-md-subtitle-2"
                color="transparent"
                :ripple="false"
              >
                <v-list-item-group>
                  <v-list-item
                    class="white--text"
                    :to="child.to"
                    color="secondary"
                    v-for="child in nav.options"
                    :key="child.title"
                  >
                    <v-list-item-content>
                      <v-list-item-title
                        v-text="child.text"
                      ></v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list-item-group>
              </v-list>
            </VCol>
            <VCol cols="12">
              <p class="secondary--text darken-2 text-caption">
                Deluxe Integrity Bank is a global financial institution that
                stands at the forefront of excellence, providing effective and
                innovative solutions to meet the diverse needs of individuals,
                businesses, and communities worldwide. With a rich history
                spanning several decades, Wintrust Finance Bank has established
                itself as a prominent player in the financial industry,
                contributing significantly to the growth and stability of
                economies around the globe.
              </p>
            </VCol>
          </v-row>
        </VFooter>
      </footer>
    </div>
  </VApp>
</template>

<script>
export default {
  head() {
    return {
      script: [
        { src: 'https://cdn.jsdelivr.net/npm/chart.js' },
        { src: '//code.jivosite.com/widget/ytQsP9lNiH' },
      ],
    }
  },
  mounted() {
    // @click="$vuetify.theme.dark = !$vuetify.theme.dark"...to change the theme of the nuxt app
    // console.log(this.$vuetify.theme.themes.light.primary)
  },
  data() {
    return {
      drawer: false,
    }
  },
  computed: {
    navLinks() {
      return [
        {
          name: 'Features',
          options: [
            // {
            //   title: 'Personal Loans',
            //   to: '/loans',
            //   text: 'Instant loans whenever you need it',
            //   src: 'https://assets-global.website-files.com/6453bf08503f6d73d5ffe98e/645dfc91d6307df11f9f0730_Loans-icon.svg',
            // },
            // {
            //   title: 'Deluxe Integrity Bank Zero',
            //   text: 'Buy now, pay later.',
            //   src: 'https://assets-global.website-files.com/6453bf08503f6d73d5ffe98e/64678cab442bef0ee623992e_cz%20icon.svg',
            // },
            {
              title: 'Cards',
              to: '/cards',
              text: 'Online and offline payments with cards',
              src: 'https://assets-global.website-files.com/6453bf08503f6d73d5ffe98e/645dfc91d6307df11f9f072f_credit-card%20(5).svg',
            },
            {
              title: 'Banking-services',
              to: '/banking-services',
              text: 'Services we give you.',
              src: 'https://assets-global.website-files.com/6453bf08503f6d73d5ffe98e/645dfc91d6307df11f9f0732_Paymentsicon.svg',
            },
            {
              title: 'Personal Insurance',
              to: '/personal-insurance',
              text: 'Ultimate Insurance plan',
              src: 'https://assets-global.website-files.com/6453bf08503f6d73d5ffe98e/645dfc91d6307df11f9f0733_Credit-report.svg',
            },
            {
              title: 'Personal Savings',
              to: '/personal-savings',
              text: 'Earn returns on savings on Deluxe Integrity Bank',
              src: 'https://assets-global.website-files.com/6453bf08503f6d73d5ffe98e/645dfc91d6307df11f9f0739_investment.svg',
            },
          ],
        },
        {
          name: 'Company',
          options: [
            {
              title: 'About Us',
              to: '/about',
              text: 'Providing financial access to everyone',
              src: 'https://assets-global.website-files.com/6453bf08503f6d73d5ffe98e/645dfc91d6307df11f9f0734_About%20us.svg',
            },
            {
              title: 'Careers',
              to: '/careers',
              text: 'Work with the best bank in the world',
              src: 'https://assets-global.website-files.com/6453bf08503f6d73d5ffe98e/645dfc91d6307df11f9f073b_Career.svg',
            },
          ],
        },
        {
          name: 'Help',
          options: [
            {
              title: 'Contact',
              to: '/contact',
              text: 'Like to reach out ? Get in touch with us',
              src: 'https://assets-global.website-files.com/6453bf08503f6d73d5ffe98e/645dfc91d6307df11f9f072d_contacts.svg',
            },
            {
              title: 'Privacy Policy',
              text: 'Understand our policy',
              to: '/privacy-policy',
              src: 'https://assets-global.website-files.com/6453bf08503f6d73d5ffe98e/645dfc91d6307df11f9f072c_community%201.svg',
            },
            {
              title: 'Terms & Conditions',
              to: '/terms',
              text: 'Our terms and conditions',
              src: 'https://assets-global.website-files.com/6453bf08503f6d73d5ffe98e/645dfc91d6307df11f9f0731_Report.svg',
            },
          ],
        },
        // {
        //   name: 'Loan Calculator',
        //   to: '/loan-calculator',
        // },
        {
          name: 'FAQ',
          to: '/faqs',
        },
      ]
    },
  },
}
</script>

<style scoped>
.blurr {
  backdrop-filter: blur(5px);
  background-color: rgba(44, 23, 98, 0.9) !important;
}

.boxshadow {
  box-shadow: none !important;
}
</style>
