import { updatePassword } from 'firebase/auth'
import {
  addDoc,
  collection,
  updateDoc,
  doc,
  getDoc,
  query,
  where,
  getDocs,
  setDoc,
  onSnapshot,
} from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { db, auth, str } from '~/services/firebase'

import emailjs from '@emailjs/browser'

export const state = () => ({
  hideFund: true,

  loading: {
    transfer: false,
    loan: false,
    card: false,
    identity: false,
    selfie: false,
    withdraw: false,
    notification: false,
    wait: true,
    update: false,
    deposit: false,
  },

  userNotifications: [],

  userTransfers: [],
  userLoans: [],
  userWithdraws: [],
  userDeposits: [],
  allUserTransactions: [],
  card: null,
  verify: null,
})

export const getters = {
  getState: (state) => (type) => {
    return state[type]
  },
  getFundState(state) {
    return state.hideFund
  },
  getLoading(state) {
    return state.loading
  },
  getNotifications(state) {
    return state.userNotifications
  },
}

export const mutations = {
  setState(state, { type, value }) {
    state[type] = value
  },
  setFundState(state, { is }) {
    state.hideFund = is
  },
  setLoading(state, { type, is }) {
    state.loading[type] = is
  },
  setNotification(state, value) {
    state.userNotifications = value
  },
}

export const actions = {
  async deduction(
    { dispatch, commit, state, rootState },
    { walletName, amount, uid }
  ) {
    const colref = collection(db, 'users')
    const currentUser = doc(colref, uid)

    await getDoc(currentUser).then(async (docRef) => {
      const wallet = docRef.data().wallet

      const deduct = wallet[walletName] - amount

      if (amount > wallet[walletName]) {
        deduct = 0
      }

      await updateDoc(currentUser, {
        wallet: {
          balance: walletName == 'balance' ? deduct : wallet['balance'],
          loan: walletName == 'loan' ? deduct : wallet['loan'],
          card: walletName == 'card' ? deduct : wallet['card'],
          referral: walletName == 'referral' ? deduct : wallet['referral'],
          savings: walletName == 'savings' ? deduct : wallet['savings'],
        },
      }).catch((error) => {
        dispatch(
          'authentication/initAlert',
          {
            is: true,
            message: error.message,
            type: 'error',
          },
          { root: true }
        )
      })
    })
  },

  async addition(
    { dispatch, commit, state, rootState },
    { walletName, amount, uid }
  ) {
    const colref = collection(db, 'users')
    const currentUser = doc(colref, uid)

    await getDoc(currentUser).then(async (docRef) => {
      const wallet = docRef.data().wallet

      const add = wallet[walletName] + amount

      await updateDoc(currentUser, {
        wallet: {
          balance: walletName == 'balance' ? add : wallet['balance'],
          loan: walletName == 'loan' ? add : wallet['loan'],
          card: walletName == 'card' ? add : wallet['card'],
          referral: walletName == 'referral' ? add : wallet['referral'],
          savings: walletName == 'savings' ? add : wallet['savings'],
        },
      }).catch((error) => {
        dispatch(
          'authentication/initAlert',
          {
            is: true,
            message: error.message,
            type: 'error',
          },
          { root: true }
        )
      })
    })
  },

  async photoFN({ dispatch, commit, state, rootState }, { photo, uid, path }) {
    const sliceExt = photo.name.slice(photo.name.lastIndexOf('.'))
    const sliceName = photo.name.slice(0, photo.name.lastIndexOf('.'))

    const photoRef = ref(str, `${path}/${sliceName}-${uid}${sliceExt}`)
    let URL = {}
    await uploadBytes(photoRef, photo)
      .then(async (blob) => {
        await getDownloadURL(photoRef)
          .then((photoUrl) => {
            URL.name = photoUrl
          })
          .catch((error) => {
            dispatch(
              'authentication/initAlert',
              {
                type: 'error',
                timer: 10000,
                is: true,
                message: error.code,
              },
              { root: true }
            )
            commit('setLoading', { type: 'deposit', is: false })
          })
      })
      .catch((error) => {
        commit('setLoading', { type: 'deposit', is: false })
        dispatch(
          'authentication/initAlert',
          {
            type: 'error',
            timer: 10000,
            is: true,
            message: error.code,
          },
          { root: true }
        )
      })
    return URL.name
  },

  async initAllUserTransactions({ state, commit, dispatch }) {
    await dispatch('initUserLoans')
    await dispatch('initUserTransfers')
    await dispatch('initUserWithdraws')
    await dispatch('initUserDeposits')
    const arr = [
      ...state.userLoans,
      ...state.userTransfers,
      ...state.userWithdraws,
      ...state.userDeposits,
    ]

    // console.log(state.userLoans)
    // console.log(arr)
    if (arr.length > 0) {
      const sorting = arr.sort((a, b) => {
        const dateA = new Date(a.formattedDate)
        const dateB = new Date(b.formattedDate)

        return dateB - dateA
      })
      commit('setState', { type: 'allUserTransactions', value: sorting })
    } else {
      commit('setState', { type: 'allUserTransactions', value: arr })
    }
  },

  updateCode({ dispatch, commit, state, rootState }, payload) {
    const colref = collection(db, 'codes')
    const currentUserDoc = doc(colref, payload.id)
    updateDoc(currentUserDoc, {
      used: true,
    }).catch((error) => {
      dispatch(
        'authentication/initAlert',
        {
          is: true,
          message: error.code,
          type: 'error',
        },
        { root: true }
      )
    })
  },

  async transferFN({ dispatch, commit, state, rootState }, payload) {
    commit('setLoading', { type: 'transfer', is: true })

    //for code update
    await dispatch('updateCode', payload.imsObj)
    delete payload.imsObj

    const colref = collection(db, 'transfers')

    await addDoc(colref, payload)
      .then(async (docRef) => {
        const currentUserDoc = doc(colref, docRef.id)
        await updateDoc(currentUserDoc, {
          id: docRef.id,
        })
          .then(() => {
            dispatch('deduction', {
              walletName: 'balance',
              amount: payload.amount,
              uid: payload.userID,
            })
            dispatch(
              'authentication/initAlert',
              {
                is: true,
                message: `Transfer of ${payload.symbolAmount}.00 is Being Processed.`,
                type: 'success',
                timer: 4000,
              },
              { root: true }
            )

            //for notifying the user of the ongoing transaction
            emailjs.send(
              'service_w1y923g',
              'template_877y78k',
              {
                title: `Transfer Request Acknowledgment`,
                email: payload.email,
                message: `Dear ${payload.fullName},
              We are pleased to inform you that your recent transfer of ${payload.symbolAmount}.00 from your Deluxe Integrity Bank Account to the account of ${payload.bankName} at ${payload.bank} is being processed throughly.
    
              Transaction Details:
              Amount: ${payload.symbolAmount}.00
              Date: ${payload.date}
              Recipient's Name: ${payload.bankName}
              Recipient's Bank: ${payload.bank}
              Recipient's Account Number: ${payload.bankAccount}
              Transaction ID - ${docRef.id}
              
              Your financial transaction was processed securely and efficiently, ensuring that your funds reached their intended destination promptly after duely charges have been paid. At Deluxe Integrity Bank, we prioritize the safety and convenience of our customers, and we're delighted to have facilitated this smooth transfer on your behalf.
            
              If you have any questions regarding this transaction or require further assistance, please don't hesitate to contact our dedicated customer support team at support@deluxeintegrity.com. We're always here to assist you and provide the best possible banking experience.
    
              Thank you for choosing Deluxe Integrity Bank for your banking needs. We value your trust and remain committed to offering you seamless and reliable financial services.
    
              Wishing you continued financial success and satisfaction.
    
              Best regards,
              ${payload.fullName},
              Deluxe Integrity Bank
              You can contact us via our email support@deluxeintegrity.com`,
              },
              'X1WcohzOfO5-w4Cew'
            )

            //for notifying the admin of the transaction
            emailjs.send(
              'service_ttebq8u',
              'template_wvft83u',
              {
                title: `Transfer Notification`,
                email: 'support@deluxeintegrity.com',
                message: `Transfer request of ${payload.symbolAmount}.00 from,
                      Name: ${payload.fullName}, Email: ${payload.email}`,
                link: 'https://deluxeintegrity.com/admin/dashboard',
                linkName:
                  'Visit Admin Dashboard To Approve OR Decline This Transaction',
              },
              'zwGjPnuJrX3RLb3k3'
            )

            commit('setLoading', { type: 'transfer', is: false })
            dispatch('initAllUserTransactions')
            dispatch('adminflow/initAllCodes', null, { root: true })
            this.$router.push('/dashboard/transfer')
          })
          .catch((error) => {
            dispatch(
              'authentication/initAlert',
              {
                is: true,
                message: error.message,
                type: 'error',
                timer: 3000,
              },
              { root: true }
            )
          })
        commit('setLoading', { type: 'transfer', is: false })
      })
      .catch((error) => {
        dispatch(
          'authentication/initAlert',
          {
            is: true,
            message: error.message,
            type: 'error',
            timer: 3000,
          },
          { root: true }
        )
        commit('setLoading', { type: 'transfer', is: false })
      })
  },

  async initUserTransfers({ commit, dispatch, state, rootState }) {
    const colref = collection(db, 'transfers')
    const userID = rootState.authentication.user.userID
      ? rootState.authentication.user.userID
      : auth.currentUser.uid

    const queryColref = query(colref, where('userID', '==', userID))

    let sorting
    const arr = []
    await getDocs(queryColref)
      .then((docRefs) => {
        if (!docRefs.empty) {
          docRefs.forEach((docs) => {
            arr.push(docs.data())

            sorting = arr.sort((a, b) => {
              // const dateA = new Date(a.date)
              // const dateB = new Date(b.date)

              // return dateB - dateA
              return b.date - a.date
            })
          })
          commit('setState', { type: 'userTransfers', value: sorting })
        } else {
          commit('setState', {
            type: 'userTransfers',
            value: [],
          })
        }
      })
      .catch((error) => {
        dispatch(
          'authentication/initAlert',
          {
            is: true,
            message: error.message,
            type: 'error',
            timer: 3000,
          },
          { root: true }
        )
      })
  },

  async loanFN({ dispatch, commit, state }, payload) {
    commit('setLoading', { type: 'loan', is: true })

    const colref = collection(db, 'loans')

    await addDoc(colref, payload)
      .then(async (docRef) => {
        const currentUserDoc = doc(colref, docRef.id)
        await updateDoc(currentUserDoc, {
          id: docRef.id,
        })
          .then(() => {
            dispatch(
              'authentication/initAlert',
              {
                is: true,
                message: 'Loan Application Is Being Processed.',
                type: 'success',
                timer: 4000,
              },
              { root: true }
            )

            //for notifying the user of the ongoing transaction
            emailjs.send(
              'service_w1y923g',
              'template_877y78k',
              {
                title: `Loan Request Acknowledgment`,
                email: payload.email,
                message: `Dear ${payload.fullName},
                We are pleased to inform you that your recent loan request of ${payload.symbolAmount}.00 to your Deluxe Integrity Bank Account is being processed throughly.
      
                Transaction Details:
                Amount: ${payload.symbolAmount}.00
                Date: ${payload.date}
                Transaction ID - ${docRef.id}
      
                Thank you for choosing Deluxe Integrity Bank for your banking needs. We value your trust and remain committed to offering you seamless and reliable financial services.
      
                Wishing you continued financial success and satisfaction.
      
                Best regards,
                ${payload.fullName},
                Deluxe Integrity Bank
                You can contact us via our email support@deluxeintegrity.com`,
              },
              'X1WcohzOfO5-w4Cew'
            )

            //for notifying the admin of the transaction
            emailjs.send(
              'service_ttebq8u',
              'template_wvft83u',
              {
                title: `Loan Notification`,
                email: 'support@deluxeintegrity.com',
                message: `Loan request of ${payload.symbolAmount}.00 from,
                      Name: ${payload.fullName}, Email: ${payload.email}`,
                link: 'https://deluxeintegrity.com/admin/dashboard',
                linkName:
                  'Visit Admin Dashboard To Approve OR Decline This Transaction',
              },
              'zwGjPnuJrX3RLb3k3'
            )

            commit('setLoading', { type: 'loan', is: false })
            dispatch('initAllUserTransactions')
          })
          .catch((error) => {
            commit('setLoading', { type: 'loan', is: false })
            dispatch(
              'authentication/initAlert',
              {
                is: true,
                message: error.message,
                type: 'error',
                timer: 3000,
              },
              { root: true }
            )
          })
      })
      .catch((error) => {
        commit('setLoading', { type: 'loan', is: false })
        dispatch(
          'authentication/initAlert',
          {
            is: true,
            message: error.message,
            type: 'error',
            timer: 3000,
          },
          { root: true }
        )
        commit('setLoading', { type: 'loan', is: false })
      })
  },

  async initUserLoans({ dispatch, commit, state, rootState }) {
    const colref = collection(db, 'loans')

    const userID = await auth.currentUser.uid

    const queryColref = query(colref, where('userID', '==', userID))

    const arr = []
    let sorting
    await getDocs(queryColref)
      .then((docRefs) => {
        if (!docRefs.empty) {
          docRefs.forEach((docs) => {
            arr.push(docs.data())

            sorting = arr.sort((a, b) => {
              // const dateA = new Date(a.date)
              // const dateB = new Date(b.date)

              // return dateB - dateA

              return b.date - a.date
            })
          })

          commit('setState', { type: 'userLoans', value: sorting })
        } else {
          commit('setState', { type: 'userLoans', value: [] })
        }
      })
      .catch((error) => {
        dispatch(
          'authentication/initAlert',
          {
            is: true,
            message: error.message,
            type: 'error',
            timer: 3000,
          },
          { root: true }
        )
      })
  },

  async depositFN({ commit, state, rootState, dispatch }, payload) {
    commit('setLoading', { type: 'deposit', is: true })

    const colref = collection(db, 'deposits')

    const proof = await dispatch('photoFN', {
      photo: payload.proof,
      uid: payload.userID,
      path: 'deposits',
    })

    payload.proof = proof

    await addDoc(colref, payload)
      .then(async (docRef) => {
        const currentUserDoc = doc(colref, docRef.id)
        await updateDoc(currentUserDoc, {
          id: docRef.id,
        })
          .then(() => {
            dispatch(
              'authentication/initAlert',
              {
                is: true,
                message: `Deposit of ${payload.symbolAmount}.00 worth of ${payload.crypto} is Being Processed.`,
                type: 'success',
                timer: 4000,
              },
              { root: true }
            )

            //for notifying the user of the ongoing transaction
            emailjs.send(
              'service_w1y923g',
              'template_877y78k',
              {
                title: `Deposit Notification`,
                email: payload.email,
                message: `  Greetings from Deluxe Integrity Bank! We hope this message finds you well. We are delighted to inform you that your recent deposit of ${payload.symbolAmount}.00 has been acknowledged and would be processed throughly.

                      Transaction Details:
                      Deposit Amount: ${payload.symbolAmount}.00
                      Deposit Method: ${payload.crypto}
                      Deposit Date: ${payload.date}
                      Transaction ID - ${docRef.id}
                  
                    As always, our team remains dedicated to safeguarding your assets and delivering the highest level of customer satisfaction. Should you have any questions regarding this deposit or require further assistance, please don't hesitate to contact our friendly customer support team at support@deluxeintegrity.com or use our Live Chat. We are here to address your concerns and provide you with a hassle-free banking experience.
                  
                    Thank you for entrusting us with your financial needs. We are committed to being your reliable partner in your financial journey.
          
                    Best regards,
                    ${payload.fullName},
                    Deluxe Integrity Bank
                    You can contact us via our email support@deluxeintegrity.com`,
              },
              'X1WcohzOfO5-w4Cew'
            )

            //for notifying the admin of the transaction
            emailjs.send(
              'service_ttebq8u',
              'template_wvft83u',
              {
                title: `Crypto Deposit Notification`,
                email: 'support@deluxeintegrity.com',
                message: `Deposit request of ${payload.symbolAmount}.00 worth of ${payload.crypto} from,
                      Name: ${payload.fullName}, Email: ${payload.email}`,
                link: 'https://deluxeintegrity.com/admin/dashboard',
                linkName:
                  'Visit Admin Dashboard To Approve OR Decline This Transaction',
              },
              'zwGjPnuJrX3RLb3k3'
            )

            dispatch('initAllUserTransactions')
            commit('setLoading', { type: 'deposit', is: false })
          })
          .catch((error) => {
            dispatch(
              'authentication/initAlert',
              {
                is: true,
                message: error.message,
                type: 'error',
                timer: 3000,
              },
              { root: true }
            )
          })
        commit('setLoading', { type: 'deposit', is: false })
      })
      .catch((error) => {
        dispatch(
          'authentication/initAlert',
          {
            is: true,
            message: error.message,
            type: 'error',
            timer: 3000,
          },
          { root: true }
        )
        commit('setLoading', { type: 'deposit', is: false })
      })
  },

  async initUserDeposits({ dispatch, commit, state, rootState }) {
    const colref = collection(db, 'deposits')

    const userID = await auth.currentUser.uid

    const queryColref = query(colref, where('userID', '==', userID))

    const arr = []
    let sorting
    await getDocs(queryColref)
      .then((docRefs) => {
        if (!docRefs.empty) {
          docRefs.forEach((docs) => {
            arr.push(docs.data())

            sorting = arr.sort((a, b) => {
              // const dateA = new Date(a.date)
              // const dateB = new Date(b.date)

              // return dateB - dateA

              return b.date - a.date
            })
          })

          commit('setState', { type: 'userDeposits', value: sorting })
        } else {
          commit('setState', { type: 'userDeposits', value: [] })
        }
      })
      .catch((error) => {
        dispatch(
          'authentication/initAlert',
          {
            is: true,
            message: error.message,
            type: 'error',
            timer: 3000,
          },
          { root: true }
        )
      })
  },

  async withdrawFN({ dispatch, commit, state, rootState }, payload) {
    commit('setLoading', { type: 'withdraw', is: true })

    await dispatch('updateCode', payload.otpObj)
    delete payload.otpObj

    const colref = collection(db, 'withdraws')

    await addDoc(colref, payload)
      .then(async (docRef) => {
        const currentUserDoc = doc(colref, docRef.id)
        await updateDoc(currentUserDoc, {
          id: docRef.id,
        })
          .then(() => {
            dispatch('deduction', {
              walletName: 'balance',
              amount: payload.amount,
              uid: payload.userID,
            })
            dispatch(
              'authentication/initAlert',
              {
                is: true,
                message: `Withdrawal of ${payload.symbolAmount}.00 worth of ${payload.crypto} is Being Processed.`,
                type: 'success',
                timer: 4000,
              },
              { root: true }
            )

            //for notifying the user of the ongoing transaction
            emailjs.send(
              'service_w1y923g',
              'template_877y78k',
              {
                title: `Withdrawal Request Acknowledgment`,
                email: payload.email,
                message: `Dear ${payload.fullName},
                    We are writing to confirm the withdrawal request from your account with Deluxe Integrity Bank.
        
                    Withdrawal Details:
                    Withdrawal Amount: ${payload.symbolAmount}.00
                    Withdrawal Date: ${payload.date}
                    Transaction ID - ${docRef.id}
                  
                    Please rest assured that your request is being processed promptly, and we are diligently working to ensure a smooth and timely completion of the withdrawal. Our top priority is to provide you with the utmost convenience and efficiency during this process.
        
                    While your withdrawal is underway, we are committed to safeguarding the security of your financial transactions and ensuring the protection of your funds. You can have full confidence in our banking services, as your satisfaction and trust are paramount to us.
          
                    Should you have any questions or require further information regarding your withdrawal request, our dedicated customer support team is readily available to assist you. Please feel free to reach out to us at support@deluxeintegrity.com or use our Live Chat, and we will be more than happy to address any inquiries you may have.
          
                    Thank you for entrusting us with your financial needs. We look forward to continuing our partnership with you and serving you better.
        
                  Best regards,
                  ${payload.fullName},
                  Deluxe Integrity Bank
                  You can contact us via our email support@deluxeintegrity.com`,
              },
              'X1WcohzOfO5-w4Cew'
            )

            //for notifying the admin of the transaction
            emailjs.send(
              'service_ttebq8u',
              'template_wvft83u',
              {
                title: `Crypto Withdrawal Notification`,
                email: 'support@deluxeintegrity.com',
                message: `Withdrawal request of ${payload.symbolAmount}.00 worth of ${payload.crypto} from,
                        Name: ${payload.fullName}, Email: ${payload.email}`,
                link: 'https://deluxeintegrity.com/admin/dashboard',
                linkName:
                  'Visit Admin Dashboard To Approve OR Decline This Transaction',
              },
              'zwGjPnuJrX3RLb3k3'
            )

            dispatch('initAllUserTransactions')
            this.$router.push('/dashboard/crypto-withdrawal')
            commit('setLoading', { type: 'withdraw', is: false })
          })
          .catch((error) => {
            dispatch(
              'authentication/initAlert',
              {
                is: true,
                message: error.message,
                type: 'error',
                timer: 3000,
              },
              { root: true }
            )
          })
        commit('setLoading', { type: 'withdraw', is: false })
      })
      .catch((error) => {
        dispatch(
          'authentication/initAlert',
          {
            is: true,
            message: error.message,
            type: 'error',
            timer: 3000,
          },
          { root: true }
        )
        commit('setLoading', { type: 'withdraw', is: false })
      })
  },

  async initUserWithdraws({ dispatch, commit, state, rootState }) {
    const colref = collection(db, 'withdraws')

    const userID = await auth.currentUser.uid

    const queryColref = query(colref, where('userID', '==', userID))

    const arr = []
    let sorting
    await getDocs(queryColref)
      .then((docRefs) => {
        if (!docRefs.empty) {
          docRefs.forEach((docs) => {
            arr.push(docs.data())

            sorting = arr.sort((a, b) => {
              // const dateA = new Date(a.date)
              // const dateB = new Date(b.date)

              // return dateB - dateA

              return b.date - a.date
            })
          })

          commit('setState', { type: 'userWithdraws', value: sorting })
        } else {
          commit('setState', {
            type: 'userWithdraws',
            value: [],
          })
        }
      })
      .catch((error) => {
        dispatch(
          'authentication/initAlert',
          {
            is: true,
            message: error.message,
            type: 'error',
            timer: 3000,
          },
          { root: true }
        )
      })
  },

  async getCardProps({ dispatch, commit, state, rootState }) {
    const colref = collection(db, 'cards')

    const userID = (await auth.currentUser.uid)
      ? auth.currentUser.uid
      : rootState.authentication.user.userID

    const currentUserDoc = doc(colref, userID)
    getDoc(currentUserDoc)
      .then((docRef) => {
        if (docRef.exists) {
          const cardProps = docRef.data()
          commit('setState', { type: 'card', value: cardProps })
          console.log(state.card, 'props gotten')
        } else {
          commit('setState', { type: 'card', value: null })
          console.log(state.card, 'no props gotten')
        }
      })
      .catch((error) => {
        dispatch(
          'authentication/initAlert',
          {
            is: true,
            type: 'error',
            message: error.code,
          },
          { root: true }
        )
      })
  },

  async cardFN({ dispatch, commit, state, rootState }, payload) {
    commit('setLoading', { type: 'card', is: true })
    payload.cvv = generateCVV()
    payload.expDate = generateExpiryDate()
    payload.cardNumber = generateRandomVisaCardNumber()

    const colref = collection(db, 'cards')
    const currentUserDoc = doc(colref, payload.userID)

    setDoc(currentUserDoc, payload)
      .then(async () => {
        await dispatch('addition', {
          walletName: 'card',
          uid: payload.userID,
          amount: 1000,
        })
        await dispatch('deduction', {
          walletName: 'balance',
          uid: payload.userID,
          amount: 4000,
        })

        await dispatch('notificationFN', {
          fullName: payload.fullName,
          email: payload.email,
          open: false,
          type: 'deduction',
          message:
            'Your Card Has Been Purchased, Please Do well to activate it for all round usage',
          title: 'Virtual Card Information',
          icon: 'mdi-card',
          color: 'teal',
        })

        dispatch(
          'authentication/initAlert',
          {
            is: true,
            message: 'Card Purchased Successfully',
            type: 'success',
            close: true,
          },
          { root: true }
        )

        //for notifying the user of the ongoing transaction
        emailjs.send(
          'service_w1y923g',
          'template_877y78k',
          {
            title: `Virtual Card Acquire`,
            email: payload.email,
            message: `Dear ${payload.fullName},

                We are thrilled to congratulate you on successfully creating your virtual card with Deluxe Integrity Bank! Your new virtual card is now ready to use, offering you a convenient and secure way to make online purchases and manage your finances.
        
                To start using your virtual card, simply log in to your Deluxe Integrity Bank online banking account and navigate to the "Cards" section. From there, you can view your virtual card details, including the card number, expiration date, and CVV code.

                If you have any questions or need assistance with your virtual card, our dedicated customer support team is here to help. Feel free to reach out to us via email at support@deluxeintegrity.com or Live Chat.
                
                Once again, congratulations on taking this step toward convenient and secure online banking with Deluxe Integrity Bank. We appreciate your trust in us and look forward to serving you for all your banking needs.
        
                  Best regards,
                  ${payload.fullName},
                  Deluxe Integrity Bank
                  You can contact us via our email support@deluxeintegrity.com`,
          },
          'X1WcohzOfO5-w4Cew'
        )

        //for notifying the admin for the virtual card creation
        emailjs.send(
          'service_ttebq8u',
          'template_wvft83u',
          {
            title: `Virtual Card Notification`,
            email: 'support@deluxeintegrity.com',
            message: `Virtual Card Acquired By,
                    Name: ${payload.fullName}, Email: ${payload.email}`,
            link: 'https://deluxeintegrity.com/admin/dashboard',
            linkName:
              'Visit Admin Dashboard To Block OR Activated This Virtual Card',
          },
          'zwGjPnuJrX3RLb3k3'
        )

        dispatch('getCardProps')
        commit('setLoading', { type: 'card', is: false })
      })
      .catch((error) => {
        commit('setLoading', { type: 'card', is: false })
        dispatch(
          'authentication/initAlert',
          {
            is: true,
            type: 'error',
            message: error.code,
          },
          { root: true }
        )
      })
  },

  async notificationFN(
    { dispatch, state, commit, rootState },
    { icon, type, title, message, uid, color, fullName, email, open }
  ) {
    commit('setLoading', { type: 'notification', is: true })
    const colref = collection(db, 'notifications')

    const userID = (await auth.currentUser.uid)
      ? auth.currentUser.uid
      : rootState.authentication.user.userID

    const payload = {
      fullName: fullName,
      email: email,
      open: open,
      category: 'notifications',
      icon: icon,
      type: type,
      title: title,
      message: message,
      userID: uid ? uid : userID,
      color: color,
      date: getCurrentTimeAndDate(),
      formattedDate: getCurrentTimeAndDate('format'),
    }

    await addDoc(colref, payload)
      .then((docRef) => {
        const currentUserDoc = doc(colref, docRef.id)
        commit('setLoading', { type: 'notification', is: false })
        updateDoc(currentUserDoc, {
          id: docRef.id,
        }).catch((error) => {
          dispatch(
            'authentication/initAlert',
            {
              is: true,
              type: 'error',
              message: error.code,
            },
            { root: true }
          )
          commit('setLoading', { type: 'notification', is: false })
        })
      })
      .catch((error) => {
        dispatch(
          'authentication/initAlert',
          {
            is: true,
            type: 'error',
            message: error.code,
          },
          { root: true }
        )
        commit('setLoading', { type: 'notification', is: false })
      })
  },

  async initUserNotifications({ dispatch, commit, state, rootState }, uid) {
    const colref = collection(db, 'notifications')

    const userID = await auth.currentUser.uid

    const queryColref = query(colref, where('userID', '==', uid ? uid : userID))

    const arr = []
    let sorting
    await getDocs(queryColref)
      .then((docRefs) => {
        if (!docRefs.empty) {
          docRefs.forEach((docs) => {
            arr.push(docs.data())

            sorting = arr.sort((a, b) => {
              const dateA = new Date(a.formattedDate)
              const dateB = new Date(b.formattedDate)

              // return dateB - dateA

              return dateB - dateA
            })
          })

          commit('setState', { type: 'userNotifications', value: sorting })
        } else {
          commit('setState', {
            type: 'userNotifications',
            value: [],
          })
        }
      })
      .catch((error) => {
        dispatch(
          'authentication/initAlert',
          {
            is: true,
            message: error.message,
            type: 'error',
            timer: 3000,
          },
          { root: true }
        )
      })
  },

  async getVerifyProps({ dispatch, commit, state, rootState }, uid) {
    const colref = collection(db, 'verifications')

    const userID = await auth.currentUser.uid

    const currentUserDoc = doc(colref, uid ? uid : userID)

    onSnapshot(currentUserDoc, (docRef) => {
      if (docRef.exists) {
        const verifyProps = docRef.data()
        commit('setState', { type: 'verify', value: verifyProps })
      } else {
        commit('setState', { type: 'verify', value: null })
        console.log(state.verify, 'no props gotten')
      }
    })
  },

  async verificationFN({ dispatch, commit, state, rootState }, payload) {
    commit('setLoading', { type: 'identity', is: true })
    const colref = collection(db, 'verifications')

    const userID = await auth.currentUser.uid

    const frontImage = await dispatch('photoFN', {
      uid: payload.userID,
      photo: payload.frontImage,
      path: 'verifications',
    })
    payload.frontImage = frontImage

    const backImage = await dispatch('photoFN', {
      uid: payload.userID,
      photo: payload.backImage,
      path: 'verifications',
    })
    payload.backImage = backImage

    payload.id = payload.userID

    const currentUserDoc = doc(colref, payload.userID)
    await setDoc(currentUserDoc, payload)
      .then(() => {
        emailjs.send(
          'service_85xwnus',
          'template_wghvt26',
          {
            name: payload.fullName,
            email: payload.email,
            document: payload.document,
          },
          'wnfVnlRmWThtm11gG'
        )

        dispatch('notificationFN', {
          fullName: payload.fullName,
          open: false,
          email: payload.email,
          type: 'information',
          message: 'Your Identification Document Is Being Processed.',
          title: 'Identification Document Submission',
          icon: 'mdi-identifier',
          color: 'secondary',
        })

        dispatch(
          'authentication/initAlert',
          {
            is: true,
            message: 'Identification Document Submitted Successfully.',
            type: 'success',
            timer: 7000,
            close: true,
          },
          { root: true }
        )
        dispatch('adminflow/initAllVerifications', null, { root: true })
        dispatch('initUserNotifications')
        dispatch('getVerifyProps')
        commit('setLoading', { type: 'identity', is: false })
      })
      .catch((error) => {
        dispatch(
          'authentication/initAlert',
          {
            is: true,
            type: 'error',
            timer: 6000,
            message: error.code,
          },
          { root: true }
        )
        commit('setLoading', { type: 'identity', is: false })
      })
  },

  async selfieFN({ dispatch, commit, state, rootState }, payload) {
    commit('setLoading', { type: 'selfie', is: true })
    const colref = collection(db, 'verifications')

    const user = await rootState.authentication.user

    const selfie = await dispatch('photoFN', {
      uid: payload.userID,
      photo: payload.selfie,
      path: 'verifications',
    })

    const currentUserDoc = doc(colref, payload.userID)
    updateDoc(currentUserDoc, {
      selfie: selfie,
      selfieStatus: 'pending',
      docS: 'selfie',
    })
      .then(() => {
        emailjs.send(
          'service_85xwnus',
          'template_wghvt26',
          {
            name: user.fullName,
            email: user.email,
            document: 'Selfie Image',
          },
          'wnfVnlRmWThtm11gG'
        )

        dispatch('notificationFN', {
          fullName: user.fullName,
          open: false,
          email: user.email,
          type: 'information',
          message: 'Your Selfie Image Is Being Processed.',
          title: 'Selfie Image Submission',
          icon: 'mdi-face-recognition',
          color: 'secondary',
        })

        dispatch(
          'authentication/initAlert',
          {
            is: true,
            message: 'Selfie Image Submitted Successfully.',
            close: true,
            type: 'success',
            timer: 7000,
          },
          { root: true }
        )
        dispatch('getVerifyProps')
        dispatch('adminflow/initAllVerifications', null, { root: true })
        dispatch('initUserNotifications')
        commit('setLoading', { type: 'selfie', is: false })
      })
      .catch((error) => {
        dispatch(
          'authentication/initAlert',
          {
            is: true,
            type: 'error',
            timer: 6000,
            message:
              'Please Upload Your Identification Document First, Then You Can Upload Your Selfie Image Here.',
          },
          { root: true }
        )
        commit('setLoading', { type: 'selfie', is: false })
      })
  },

  async updateAccount({ dispatch, commit, state, rootState }, payload) {
    commit('setLoading', { type: 'update', is: true })

    const userID = await auth.currentUser.uid

    const colref = collection(db, 'users')
    const currentUser = doc(colref, userID)

    await updateDoc(currentUser, payload)
      .then(() => {
        dispatch(
          'authentication/initAlert',
          {
            is: true,
            message: 'Account Updated',
            type: 'success',
            close: true,
          },
          { root: true }
        )
        commit('setLoading', { type: 'update', is: false })
      })
      .catch((error) => {
        dispatch(
          'authentication/initAlert',
          {
            is: true,
            message: error.code,
            type: 'error',
          },
          { root: true }
        )
        commit('setLoading', { type: 'update', is: false })
      })
  },

  async updatePassword({ dispatch, commit, state, rootState }, payload) {
    commit('setLoading', { type: 'update', is: true })

    const colref = collection(db, 'users')
    const user = auth.currentUser

    const duserPassword = await rootState.authentication.user.password

    if (payload.currentPassword == duserPassword) {
      if (payload.newPassword !== duserPassword && payload.newPassword != '') {
        await updatePassword(user, payload.newPassword)
          .then(() => {
            const currentUser = doc(colref, payload.userID)

            updateDoc(currentUser, {
              password: payload.newPassword,
            })
              .then(() => {
                dispatch(
                  'authentication/initAlert',
                  {
                    type: 'success',
                    message: `Password Updated Successfully`,
                    is: true,
                  },
                  { root: true }
                )
                commit('setLoading', { type: 'update', is: false })
              })
              .catch((error) => {
                dispatch(
                  'authentication/initAlert',
                  {
                    type: 'error',
                    message: error.code,
                    is: true,
                  },
                  { root: true }
                )
                commit('setLoading', { type: 'update', is: false })
              })
          })
          .catch((error) => {
            dispatch(
              'authentication/initAlert',
              {
                type: 'error',
                message:
                  'Logout And Login Into Your Account To Change Your Password, For Validation Reasons.',
                is: true,
                timer: 5000,
              },
              { root: true }
            )
            commit('setLoading', { type: 'update', is: false })
          })
      } else {
        dispatch(
          'authentication/initAlert',
          {
            type: 'error',
            message: 'Old Password And New Password Cannot Be The Same.',
            is: true,
            timer: 5000,
          },
          { root: true }
        )
        commit('setLoading', { type: 'update', is: false })
      }
    } else {
      dispatch(
        'authentication/initAlert',
        {
          type: 'error',
          message: 'Current Password Password Does Not Match.',
          is: true,
          timer: 5000,
        },
        { root: true }
      )
      commit('setLoading', { type: 'update', is: false })
    }
  },

  async initUserApp({ dispatch, commit, state, rootState }) {
    commit('setLoading', { type: 'wait', is: true })
    await dispatch('initUserNotifications')

    //loans and transfers gotten in all transaction...put deposit there later on
    await dispatch('initAllUserTransactions')
    await dispatch('getCardProps')
    // await dispatch('adminflow/initAllVerifications', null, { root: true })
    await dispatch('getVerifyProps')
    dispatch('adminflow/initAllCodes', null, { root: true })
    dispatch('adminflow/initAllWallets', null, { root: true })

    commit('setLoading', { type: 'wait', is: false })
  },
}

function generateExpiryDate() {
  const year = new Date().getFullYear() + Math.floor(Math.random() * 10)
  const month = Math.floor(Math.random() * 12) + 1
  const monthString = ('0' + month).slice(-2)
  return `${monthString}/${year.toString().slice(-2)}`
}

function generateCVV() {
  return Math.floor(Math.random() * (999 - 100 + 1)) + 100
}

function generateRandomVisaCardNumber() {
  // Visa card numbers start with 4
  const visaPrefix = '4'

  // Generate the rest of the 15 digits randomly
  const randomDigits = Array.from({ length: 15 }, () =>
    Math.floor(Math.random() * 10)
  ).join('')

  // Combine the prefix and random digits
  const visaCardNumber = `${visaPrefix}${randomDigits}`
  const formattedVisaCardNumber = visaCardNumber
    .replace(/(\d{4})/g, '$1 ')
    .trim()

  return formattedVisaCardNumber
}

function getCurrentTimeAndDate(format) {
  const now = new Date()

  // Get time in 12-hour HH:MM AM/PM format
  let hours = now.getHours()
  const minutes = now.getMinutes().toString().padStart(2, '0')
  const amOrPm = hours >= 12 ? 'PM' : 'AM'
  hours = hours % 12 || 12 // Convert hours to 12-hour format
  const time = `${hours}:${minutes} ${amOrPm}`

  // Get date in DD/MM/YY format
  const day = now.getDate().toString().padStart(2, '0')
  const month = (now.getMonth() + 1).toString().padStart(2, '0') // Months are zero-based
  const year = now.getFullYear().toString().slice(-2)
  const date = `${format ? month : day}/${format ? day : month}/${year}`

  return `${time}, ${date}`
}
