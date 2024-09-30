<template>
  <div>
    <main
      style="height: 50vh"
      :class="`${$vuetify.breakpoint.mdAndDown ? 'waver2' : 'waver'}`"
      class="d-flex align-center"
    >
      <vContainer>
        <vContainer>
          <v-row class="mx-0 px-0">
            <VCol
              cols="12"
              md="4"
              class="py-0 my-0"
              data-aos="fade-up"
              data-aos-duration="800"
            >
              <p class="accent--text text-h4 text-md-h2 font-weight-bold">
                Frequently Asked Questions
              </p>
            </VCol>
          </v-row>
        </vContainer>
      </vContainer>
    </main>

    <main>
      <vContainer>
        <vContainer>
          <v-row class="mx-0 px-0">
            <v-expansion-panels accordion>
              <VCol
                cols="12"
                md="6"
                v-for="(faq, i) in faqs"
                :key="i"
                data-aos="fade-up"
                :data-aos-delay="i * 200 + 500"
              >
                <v-expansion-panel
                  style="border-radius: 5px; border: 2px ridge #ff0475"
                  class="shadowfloat"
                >
                  <v-expansion-panel-header
                    expand-icon="mdi-chevron-up"
                    class="accent--text font-weight-bold text-subtitle-1 text-md-h6"
                  >
                    {{ faq.title }}
                  </v-expansion-panel-header>
                  <v-expansion-panel-content class="grey--text">
                    {{ faq.text }}
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </VCol>
            </v-expansion-panels>
          </v-row>
        </vContainer>
      </vContainer>
    </main>

    <main>
      <vContainer>
        <vContainer>
          <loans-sec-4>
            <template #text>
              Still can’t find the answer to your question?
            </template>
            <template #btn> Visit our help center </template>
          </loans-sec-4>
        </vContainer>
      </vContainer>
    </main>
  </div>
</template>

<script>
import loansSec4 from '~/components/loansComps/loansSec4.vue'
export default {
  components: { loansSec4 },
  created() {
    window.scrollTo(0, 0)
  },
  computed: {
    faqs() {
      return [
        {
          title: 'What is Deluxe Integrity Bank?',
          text: 'Deluxe Integrity Bank is a global financial institution that stands at the forefront of excellence, providing effective and innovative solutions to meet the diverse needs of individuals, businesses, and communities worldwide. With a rich history spanning several decades, Wintrust Finance Bank has established itself as a prominent player in the financial industry, contributing significantly to the growth and stability of economies around the globe.',
        },
        {
          title: 'Is Deluxe Integrity Bank an Investment Bank?',
          text: 'Yes. Deluxe Integrity Bank is an Investment Bank.',
        },
        {
          title: 'How safe is Deluxe Integrity Bank Services',
          text: `Deluxe Integrity Bank is the safest among it's rivals. We designed Deluxe Integrity Bank specifically to protect client's private information and funds. Unlike other Internet-based or online banks that simply add security features to their existing services or Internet sites, we designed our network frame and server from the ground up with strong security in mind.`,
        },
        {
          title: 'Are my personal data and funds secured?',
          text: 'Yes they are. We use many methods to provide the most secure possible environment for your data and funds deposited with us. All of the information contained inside each online safe deposit account are encrypted - that is, encoded so that only the account holder(s) with a passcode to that specific account can view its balance. We use the same encryption technology (256 bit AES) that the military employs to protect top secret data.',
        },
        {
          title: 'How Do I claim and transfer funds desposited on my behalf?',
          text: `Beneficiaries are expected to complete and an application form required for opening and online safe deposit account, where their capital funds/ contract/heritage fund as well as loan from creditors, shall be credited. Once the account is created, the account holder receives via email , a unique username and passcode needed to access their account online. And from the account balance, the account holder can make direct funds transfer to their other bank account domiciled anywhere in the world, using our access code. Usually fund transfer via our security server are completed within 6minutes; that is the destination bank account confirms the delivery of the funds transfer within 48 - 72 hours using our secure RTDD server.`,
        },
        {
          title: 'How secure are data entered into our server?',
          text: 'Our server is encrypted with a 256 bit AES security (as used by the military to protect secret data). We also have a privacy policy which does not allow the sharing of any information with any third party. Personal access codes are not stored on our server and we do not keep records of any personal username or passcodes used on the RTDD interface.',
        },
        {
          title: 'How much does this service cost?',
          text: 'This service is absolutely FREE of charge to all special accounts meant for beneficiary funds payout. Also each completed transaction are FREE.',
        },
      ]
    },
  },
}
</script>

<style>
.waver {
  background-image: url(https://assets-global.website-files.com/6453bf08503f6d73d5ffe98e/6464a1cd5d0d2c49f4d64ffd_bulb_FAQs.webp),
    url(https://assets-global.website-files.com/6453bf08503f6d73d5ffe98e/64628f1aba6705db8e3715ce_curved%20shape.webp);
  background-position: center;
  background-size: cover;
}
.waver2 {
  background-image: url(https://assets-global.website-files.com/6453bf08503f6d73d5ffe98e/6464a1cd5d0d2c49f4d64ffd_bulb_FAQs.webp);
  background-color: rgba(180, 140, 252, 0.1);
  background-position: center;
  background-size: contain;
}
.shadowfloat {
  /*box-shadow: 0 5px 11px -7px rgba(180, 140, 252, 0.3),
    0 7px 20px -6px rgba(255, 4, 117, 0.3) !important;*/
  box-shadow: 0 0 0 !important;
}
</style>
