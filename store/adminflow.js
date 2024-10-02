import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from 'firebase/firestore'
import { db, str, auth } from '~/services/firebase'

import emailjs from '@emailjs/browser'

export const state = () => ({
  loading: {
    app: false,
    ims: false,
    wallet: false,
    delete: false,
    update: false,
    transfer: false,

    users: true,
    transfers: true,
    notifications: true,
    deposits: true,
    cards: true,
  },

  allUsers: [],
  allTransfers: [],
  allDeposits: [],
  allWithdraws: [],
  allNotifications: [],
  allWallets: [],
  allLoans: [],
  allVerifications: [],
  allCards: [],
  allCodes: [],
})

export const getters = {
  getState: (state) => (type) => {
    return state[type]
  },
  getProps: (state) => (type, id) => {
    return state[type].find((prop) => {
      return prop.userID == id
    })
  },
  filterProps: (state) => (type, id) => {
    return state[type].filter((prop) => {
      return prop.userID == id
    })
  },
  getLoading(state) {
    return state.loading
  },
}

export const mutations = {
  setState(state, { type, value }) {
    state[type] = value
  },
  setLoading(state, { type, is }) {
    state.loading[type] = is
  },
}

export const actions = {
  async initAllUsers({ commit, dispatch, rootState, state }) {
    const colref = collection(db, 'users')

    // const queryColref = query(colref, where('role', '==', 'user'))
    const arr = []
    let sorted
    await getDocs(colref)
      .then((docRefs) => {
        if (!docRefs.empty) {
          docRefs.forEach((docs) => {
            arr.push(docs.data())

            sorted = arr.sort((a, b) => {
              const dateA = new Date(a.formatDate)
              const dateB = new Date(b.formatDate)

              return dateB - dateA
            })
          })
          commit('setState', { type: 'allUsers', value: sorted })
          commit('setLoading', { type: 'users', is: false })
        } else {
          commit('setState', { type: 'allUsers', value: [] })
          commit('setLoading', { type: 'users', is: false })
        }
      })
      .catch((error) => {
        commit('setLoading', { type: 'users', is: false })
        dispatch(
          'authentication/initAlert',
          {
            type: 'error',
            is: true,
            message: error.code,
          },
          { root: true }
        )
      })
  },

  async initAllTransfers({ commit, dispatch, state }) {
    const colref = collection(db, 'transfers')

    const arr = []
    let sorted
    await getDocs(colref)
      .then((docRefs) => {
        if (!docRefs.empty) {
          docRefs.forEach((docs) => {
            arr.push(docs.data())

            sorted = arr.sort((a, b) => {
              const dateA = new Date(a.formattedDate)
              const dateB = new Date(b.formattedDate)

              return dateB - dateA
            })
          })
          commit('setState', { type: 'allTransfers', value: sorted })
          commit('setLoading', { type: 'transfers', is: false })
        } else {
          commit('setState', {
            type: 'allTransfers',
            value: [],
          })
          commit('setLoading', { type: 'transfers', is: false })
        }
      })
      .catch((error) => {
        commit('setLoading', { type: 'transfers', is: false })
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

  async initAllDeposits({ commit, dispatch, state }) {
    const colref = collection(db, 'deposits')

    const arr = []
    let sorted
    await getDocs(colref)
      .then((docRefs) => {
        if (!docRefs.empty) {
          docRefs.forEach((docs) => {
            arr.push(docs.data())

            sorted = arr.sort((a, b) => {
              const dateA = new Date(a.formattedDate)
              const dateB = new Date(b.formattedDate)

              return dateB - dateA
            })
          })
          commit('setState', { type: 'allDeposits', value: sorted })
          commit('setLoading', { type: 'deposits', is: false })
        } else {
          commit('setState', {
            type: 'allDeposits',
            value: [],
          })
          commit('setLoading', { type: 'deposits', is: false })
        }
      })
      .catch((error) => {
        commit('setLoading', { type: 'deposits', is: false })
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

  async initAllWithdraws({ commit, dispatch, state }) {
    const colref = collection(db, 'withdraws')

    const arr = []
    let sorted
    await getDocs(colref)
      .then((docRefs) => {
        if (!docRefs.empty) {
          docRefs.forEach((docs) => {
            arr.push(docs.data())

            sorted = arr.sort((a, b) => {
              const dateA = new Date(a.formattedDate)
              const dateB = new Date(b.formattedDate)

              return dateB - dateA
            })
          })
          commit('setState', { type: 'allWithdraws', value: sorted })
        } else {
          commit('setState', {
            type: 'allWithdraws',
            value: [],
          })
        }
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
      })
  },

  async initAllNotifications({ commit, dispatch, state }) {
    const colref = collection(db, 'notifications')

    const arr = []
    let sorted
    await getDocs(colref)
      .then((docRefs) => {
        if (!docRefs.empty) {
          docRefs.forEach((docs) => {
            arr.push(docs.data())

            sorted = arr.sort((a, b) => {
              const dateA = new Date(a.formattedDate)
              const dateB = new Date(b.formattedDate)

              return dateB - dateA
            })
          })
          commit('setState', { type: 'allNotifications', value: sorted })
          commit('setLoading', { type: 'notifications', is: false })
        } else {
          commit('setState', {
            type: 'allNotifications',
            value: [],
          })
          commit('setLoading', { type: 'notifications', is: false })
        }
      })
      .catch((error) => {
        commit('setLoading', { type: 'notifications', is: false })
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

  async initAllLoans({ commit, dispatch, state }) {
    const colref = collection(db, 'loans')

    const arr = []
    let sorted
    await getDocs(colref)
      .then((docRefs) => {
        if (!docRefs.empty) {
          docRefs.forEach((docs) => {
            arr.push(docs.data())

            sorted = arr.sort((a, b) => {
              const dateA = new Date(a.formattedDate)
              const dateB = new Date(b.formattedDate)

              return dateB - dateA
            })
          })
          commit('setState', { type: 'allLoans', value: sorted })
        } else {
          commit('setState', {
            type: 'allLoans',
            value: [],
          })
        }
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
      })
  },

  async initAllVerifications({ commit, dispatch, state }) {
    const colref = collection(db, 'verifications')

    const arr = []
    await getDocs(colref)
      .then((docRefs) => {
        if (!docRefs.empty) {
          docRefs.forEach((docs) => {
            arr.push(docs.data())
          })
          commit('setState', { type: 'allVerifications', value: arr })
        } else {
          commit('setState', {
            type: 'allVerifications',
            value: [],
          })
        }
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
      })
  },

  async initAllCards({ commit, dispatch, state }) {
    const colref = collection(db, 'cards')

    const arr = []
    let sorted
    await getDocs(colref)
      .then((docRefs) => {
        if (!docRefs.empty) {
          docRefs.forEach((docs) => {
            arr.push(docs.data())

            sorted = arr.sort((a, b) => {
              const dateA = new Date(a.formattedDate)
              const dateB = new Date(b.formattedDate)

              return dateB - dateA
            })
          })
          commit('setState', { type: 'allCards', value: sorted })
          commit('setLoading', { type: 'cards', is: false })
        } else {
          commit('setState', {
            type: 'allCards',
            value: [],
          })
          commit('setLoading', { type: 'cards', is: false })
        }
      })
      .catch((error) => {
        commit('setLoading', { type: 'cards', is: false })
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

  async dynamicUpdate({ dispatch, commit, state, rootState }, payload) {
    commit('setLoading', { type: 'update', is: true })
    const colref = collection(db, payload.category)

    const currentUserDoc = doc(colref, payload.id)

    await updateDoc(currentUserDoc, payload.data)
      .then(() => {
        dispatch(
          'authentication/initAlert',
          {
            is: payload.show ? false : true,
            type: 'success',
            message: payload.message,
            timer: 5000,
            close: true,
          },
          { root: true }
        )
        let firstChar =
          payload.category.charAt(0).toUpperCase() + payload.category.slice(1)
        dispatch(`initAll${firstChar}`)
        commit('setLoading', { type: 'update', is: false })
      })
      .catch((error) => {
        dispatch(
          'authentication/initAlert',
          {
            is: true,
            type: 'error',
            message: error.code,
          },
          {
            root: true,
          }
        )
        commit('setLoading', { type: 'update', is: false })
      })
  },

  async codeFN({ dispatch, commit, state, rootState }, payload) {
    commit('setLoading', { type: 'ims', is: true })

    const colref = collection(db, 'codes')

    await addDoc(colref, payload)
      .then((docRef) => {
        const currentUserDoc = doc(colref, docRef.id)
        updateDoc(currentUserDoc, {
          id: docRef.id,
        })
          .then(() => {
            dispatch(
              'authentication/initAlert',
              {
                is: true,
                type: 'success',
                message: 'Code Generated',
              },
              { root: true }
            )
            commit('setLoading', { type: 'ims', is: false })
            dispatch('initAllCodes')
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
            commit('setLoading', { type: 'ims', is: false })
          })
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
        commit('setLoading', { type: 'ims', is: false })
      })
  },

  async initAllCodes({ commit, state, rootState, dispatch }) {
    const colref = collection(db, 'codes')

    await getDocs(colref)
      .then((docRefs) => {
        const arr = []
        let sorted
        if (!docRefs.empty) {
          docRefs.forEach((docs) => {
            arr.push(docs.data())

            sorted = arr.sort((a, b) => {
              const dateA = new Date(a.formattedDate)
              const dateB = new Date(b.formattedDate)

              return dateB - dateA
            })
          })
          commit('setState', { type: 'allCodes', value: sorted })
        } else {
          commit('setState', { type: 'allCodes', value: [] })
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

  async deleteCode({ dispatch, commit, state, rootState }, id) {
    const colref = collection(db, 'codes')
    const currentUserDoc = doc(colref, id)

    deleteDoc(currentUserDoc)
      .then(() => {
        dispatch(
          'authentication/initAlert',
          {
            is: true,
            type: 'success',
            message: 'Code Deleted Successfully',
          },
          { root: true }
        )
        dispatch('initAllCodes')
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

  async walletFN({ dispatch, commit, state, rootState }, payload) {
    commit('setLoading', { type: 'wallet', is: true })

    const colref = collection(db, 'wallets')

    const walletPhoto = await dispatch(
      'userflow/photoFN',
      {
        photo: payload.walletPhoto,
        uid: payload.userID,
        path: 'wallets',
      },
      { root: true }
    )

    payload.walletPhoto = walletPhoto

    await addDoc(colref, payload)
      .then((docRef) => {
        const currentUserDoc = doc(colref, docRef.id)
        updateDoc(currentUserDoc, {
          id: docRef.id,
        })
          .then(() => {
            dispatch(
              'authentication/initAlert',
              {
                is: true,
                type: 'success',
                message: `${payload.walletName} Wallet Uploaded Successfully`,
                timer: 3000,
                close: true,
              },
              { root: true }
            )
            dispatch('initAllWallets')
            commit('setLoading', { type: 'wallet', is: false })
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

  async initAllWallets({ commit, state, rootState, dispatch }) {
    const colref = collection(db, 'wallets')

    await getDocs(colref)
      .then((docRefs) => {
        const arr = []
        let sorted
        if (!docRefs.empty) {
          docRefs.forEach((docs) => {
            arr.push(docs.data())

            sorted = arr.sort((a, b) => {
              const dateA = new Date(a.formattedDate)
              const dateB = new Date(b.formattedDate)

              return dateB - dateA
            })
          })
          commit('setState', { type: 'allWallets', value: sorted })
        } else {
          commit('setState', { type: 'allWallets', value: [] })
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

  async adminTransfer({ dispatch, commit, state, rootState }, payload) {
    commit('setLoading', { type: 'transfer', is: true })

    const colref = collection(db, 'transfers')

    await addDoc(colref, payload)
      .then(async (docRef) => {
        const currentUserDoc = doc(colref, docRef.id)
        await updateDoc(currentUserDoc, {
          id: docRef.id,
        })
          .then(async () => {
            if (payload.type == 'credit') {
              dispatch(
                'userflow/addition',
                {
                  walletName: 'balance',
                  amount: payload.amount,
                  uid: payload.userID,
                },
                { root: true }
              )

              emailjs.send(
                'service_bmawrkl',
                'template_yivsug9',
                {
                  title: `Your account has been credited with ${payload.symbolAmount}.00`,
                  email: payload.email,
                  message: `Dear ${payload.fullName},
                We delighted to inform you that your account has been credited with a fantastic sum of ${payload.symbolAmount}.00.

                Transaction Details:
                Amount: ${payload.symbolAmount}.00
                Sender's Name: ${payload.senderName}
                Sender's Bank: ${payload.senderBank}
      
                We extend our heartfelt gratitude for choosing Deluxe Integrity Bank as your trusted financial companion. Your satisfaction is the cornerstone of our dedication, and your success shall forever fuel our passion to deliver exceptional financial experiences.
                
                Should you have any inquiries or wish to explore the multitude of opportunities at your disposal, do not hesitate to contact us at support@deluxeintegrity.com. Your contentment is of paramount importance, and we stand ready to provide bespoke solutions tailored to your distinct needs.

                With heartfelt wishes for your continued prosperity,
                ${payload.fullName},
                Deluxe Integrity Bank
                Transaction ID - ${docRef.id}
                Date of Transaction - ${payload.date}`,
                },
                '_Zfp2Zs1QVu9CvdRh'
              )
            }

            if (payload.type == 'debit') {
              dispatch(
                'userflow/deduction',
                {
                  walletName: 'balance',
                  amount: payload.amount,
                  uid: payload.userID,
                },
                { root: true }
              )

              emailjs.send(
                'service_bmawrkl',
                'template_yivsug9',
                {
                  title: `You've been debited ${payload.symbolAmount}.00`,
                  email: payload.email,
                  message: `Dear ${payload.fullName},
                This is to inform you that your account has been debited of ${payload.symbolAmount}.00

                Transaction Details:
                Amount: ${payload.symbolAmount}.00
                Recipient's Name: ${payload.bankName}
                Recipient's Bank: ${payload.bank}
                Recipient's Account Number: ${payload.bankAccount}
      
                We extend our heartfelt gratitude for choosing Deluxe Integrity Bank as your trusted financial companion. Your satisfaction is the cornerstone of our dedication, and your success shall forever fuel our passion to deliver exceptional financial experiences.
                
                Should you have any inquiries or wish to explore the multitude of opportunities at your disposal, do not hesitate to contact us at support@deluxeintegrity.com. Your contentment is of paramount importance, and we stand ready to provide bespoke solutions tailored to your distinct needs.

                With heartfelt wishes for your continued prosperity,
                ${payload.fullName},
                Deluxe Integrity Bank
                Transaction ID - ${docRef.id}
                Date of Transaction - ${payload.date}`,
                },
                '_Zfp2Zs1QVu9CvdRh'
              )
            }

            dispatch(
              'authentication/initAlert',
              {
                is: true,
                message: `${payload.fullName} Has Been ${payload.type}ed ${payload.symbolAmount}.00 Successfully`,
                type: 'success',
                timer: 6000,
                close: true,
              },
              { root: true }
            )

            await dispatch(
              'userflow/notificationFN',
              {
                fullName: payload.fullName,
                email: payload.email,
                open: false,
                type: payload.type == 'credit' ? 'addition' : 'deduction',
                message: `Your Deluxe Integrity Bank Acccount Has Been ${
                  payload.type
                }ed ${payload.type == 'credit' ? 'with' : ''} ${
                  payload.symbolAmount
                }.00 ${
                  payload.type == `credit` ? `From ${payload.senderName}` : ''
                }`,
                title: `Account ${payload.type}ed Successfully`,
                icon: `${
                  payload.type == 'credit' ? 'mdi-cash-plus' : 'mdi-cash-minus'
                }`,
                color: `${payload.type == 'credit' ? 'green' : 'red'}`,
                uid: payload.userID,
              },
              {
                root: true,
              }
            )

            commit('setLoading', { type: 'transfer', is: false })
            this.$router.go(-1)
            dispatch('initAllTransfers')
            // dispatch(
            //   'authentication/getUserData',
            //   {
            //     uid: payload.userID,
            //     role: '',
            //   },
            //   { root: true }
            // )
            dispatch('initAllUsers')
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

  async deleteWallet({ dispatch, commit, state, rootState }, { name, id }) {
    commit('setLoading', { type: 'delete', is: true })
    const colref = collection(db, 'wallets')
    const currentUserDoc = doc(colref, id)

    deleteDoc(currentUserDoc)
      .then(() => {
        dispatch(
          'authentication/initAlert',
          {
            is: true,
            type: 'success',
            message: `${name} Wallet Deleted Successfully`,
          },
          { root: true }
        )
        dispatch('initAllWallets')
        commit('setLoading', { type: 'delete', is: false })
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
        commit('setLoading', { type: 'delete', is: false })
      })
  },

  async deleteUser({ dispatch, commit, state, rootState }, { name, id }) {
    commit('setLoading', { type: 'delete', is: true })
    const colref = collection(db, 'users')
    const currentUserDoc = doc(colref, id)

    await deleteDoc(currentUserDoc)
      .then(() => {
        dispatch(
          'authentication/initAlert',
          {
            is: true,
            type: 'success',
            message: `${name} Account Deleted Successfully`,
          },
          { root: true }
        )
        dispatch('initAllUsers')
        commit('setLoading', { type: 'delete', is: false })
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
        commit('setLoading', { type: 'delete', is: false })
      })
  },

  async initAdmin({ commit, dispatch, state, rootState }) {
    // commit('setLoading', { type: 'app', is: true })

    dispatch('initAllWallets')
    dispatch('initAllDeposits')
    dispatch('initAllWithdraws')
    dispatch('initAllLoans')
    dispatch('initAllVerifications')
    dispatch('initAllCodes')
    dispatch('initAllCards')
    dispatch('initAllUsers')
    dispatch('initAllTransfers')
    // dispatch('initAllNotifications')

    const userID = auth.currentUser.uid

    await dispatch('userflow/getVerifyProps', userID, { root: true })

    // commit('setLoading', { type: 'app', is: false })
  },
}
