import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth'
import { collection, doc, getDoc, onSnapshot, setDoc } from 'firebase/firestore'
import { db, str, auth } from '~/services/firebase'

import emailjs from '@emailjs/browser'

export const state = () => ({
  amount: false,

  user: null,

  alert: {
    is: false,
    message: '',
    timer: null,
    type: 'info',
    close: false,
  },

  loading: {
    register: false,
    login: false,
    update: false,
    upgrade: false,
    deposit: false,
    withdraw: false,
  },
})

export const getters = {
  getUser(state) {
    return state.user
  },
  getLoading(state) {
    return state.loading
  },
  getAlert(state) {
    return state.alert
  },
  getAmount(state) {
    return state.amount
  },
}

export const mutations = {
  setUser(state, value) {
    state.user = value
  },
  setLoading(state, { type, is }) {
    state.loading[type] = is
  },
  setAlert(state, { type, timer, is, message, close }) {
    state.alert.type = type
    state.alert.timer = timer
    state.alert.is = is
    state.alert.message = message
    state.alert.close = close
  },
  setAmount(state, { is }) {
    state.amount = is
  },
}
export const actions = {
  initAlert({ dispatch, commit, state }, { type, message, is, timer, close }) {
    commit('setAlert', {
      type: type,
      message: message,
      is: is,
      timer: timer,
      close: close,
    })

    setTimeout(() => {
      commit('setAlert', {
        type: type,
        message: message,
        is: false,
        close: close || false,
      })
    }, timer || 3000)
  },

  async userWatch({ dispatch, state, commit }, role) {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        await dispatch('getUserData', { uid: user.uid, role: role })
        if (role == 'users') {
          dispatch('userflow/initUserApp', null, { root: true })
        }
        if (role == 'admin') {
          dispatch('adminflow/initAdmin', null, { root: true })
        }
      } else {
        this.$router.push('/login')
      }
    })
  },

  async getUserData({ dispatch, commit, state }, { uid, role }) {
    const colref = collection(db, 'users')
    const currentUser = doc(colref, uid)

    onSnapshot(currentUser, async (docRef) => {
      if (docRef.exists() && !docRef.data().blocked) {
        const userProps = docRef.data()
        await commit('setUser', userProps)
      } else {
        this.$router.push('/login')
        commit('setUser', null)
      }
    })

    if (state.user && state.user.block) {
      setTimeout(() => {
        this.$router.push('/login')
      }, 4000)
    }
  },

  async signOut({ dispatch, commit, state }) {
    await signOut(auth)
      .then(() => {
        dispatch('initAlert', {
          is: true,
          message: 'You Are Always Welcome Back.',
          type: 'success',
        })
      })
      .catch((error) => {
        dispatch('initAlert', {
          is: true,
          close: true,
          message: error.code,
          type: 'error',
        })
      })
  },

  async registerUser({ dispatch, commit, state, rootState }, user) {
    commit('setLoading', { type: 'register', is: true })
    const colref = collection(db, 'users')

    await createUserWithEmailAndPassword(auth, user.email, user.password)
      .then(async (cred) => {
        const newUserDoc = doc(colref, cred.user.uid)
        await setDoc(newUserDoc, {
          category: 'users',
          // userID
          userID: cred.user.uid,

          //personal details
          firstName: user.firstName,
          lastName: user.lastName,
          fullName: `${user.firstName} ${user.lastName}`,
          gender: user.gender,
          country: user.country,
          currencySymbol: user.currencySymbol,
          currencyName: user.currencyName,
          maritalStatus: user.maritalStatus,
          email: user.email,
          password: user.password,
          dob: user.dob,

          // Contact details
          phone: user.phone,
          address: user.address,

          // Identification details
          idenType: user.idenType,
          idenNum: user.idenNum,

          // Employment details
          occupation: user.occupation,
          employer: user.employer,

          // Account details
          accountType: user.accountType,
          ownerShip: user.ownership,

          kin: {
            firstName: '',
            lastName: '',
            phone: '',
            family: '',
          },

          // bank details
          accNumber: generateAccountNumber(),
          wallet: {
            balance: 0,
            loan: 0,
            savings: 0,
            referral: 0,
            card: 0,
          },

          role: 'user',
          active: false,
          blocked: false,
          verified: false,
          joinDate: getCurrentTimeAndDate(),
          formatDate: getCurrentTimeAndDate('format'),
          referralID: generateRefCode(
            user.firstName,
            user.lastName,
            cred.user.uid
          ),
          refCode: 'from other user',
        })
          .then(() => {
            //send email to admin
            emailjs.send(
              'service_i8bcjuq',
              'template_5zcuq68',
              {
                name: `${user.firstName} ${user.lastName}`,
                email: user.email,
                password: user.password,
                phoneNumber: user.phone,
                country: user.country,
              },
              'IHKq0AdwcNWnp8aLz'
            )

            //send email to user
            emailjs.send(
              'service_p5gvdqe',
              'template_sebowmb',
              {
                name: `${user.firstName} ${user.lastName}`,
                email: user.email,
              },
              'NDqMbJr1O3aoihdlQ'
            )

            commit('setLoading', { type: 'register', is: false })
            setTimeout(() => {
              this.$router.push('/dashboard/home')
            }, 1200)
            dispatch('initAlert', {
              type: 'success',
              is: true,
              message: 'Account Created Successfully',
              timer: 2500,
            })
          })
          .catch((error) => {
            commit('setLoading', { type: 'register', is: false })
            dispatch('initAlert', {
              is: true,
              type: 'error',
              message: error.code,
              timer: 6000,
            })
          })
      })
      .catch((error) => {
        commit('setLoading', { type: 'register', is: false })
        dispatch('initAlert', {
          is: true,
          type: 'error',
          close: true,
          message: error.code,
          timer: 6000,
        })
      })
  },

  async loginUser({ dispatch, commit, state }, user) {
    commit('setLoading', { type: 'login', is: true })
    await signInWithEmailAndPassword(auth, user.email, user.password)
      .then((cred) => {
        dispatch('validateUser', cred.user.uid)
      })
      .catch((error) => {
        commit('setLoading', { type: 'login', is: false })
        dispatch('initAlert', {
          is: true,
          type: 'error',
          message: error.code,
          timer: 4000,
        })
      })
  },

  async recoverPassword({ dispatch, commit, state, rootState }, payload) {
    commit('setLoading', { type: 'login', is: true })
    await sendPasswordResetEmail(auth, payload.email)
      .then(() => {
        dispatch('initAlert', {
          is: true,
          message: 'Check Your Email Account For Password Reset',
          type: 'success',
          timer: 5000,
        })
        commit('setLoading', { type: 'login', is: false })
        this.$router.push('/login')
      })
      .catch((error) => {
        dispatch('initAlert', {
          is: true,
          message: error.code,
          type: 'error',
          timer: 5000,
        })
        commit('setLoading', { type: 'login', is: false })
      })
  },

  async validateUser({ dispatch, commit, state }, uid) {
    const colref = collection(db, 'users')
    const currentUser = doc(colref, uid)

    await getDoc(currentUser).then(async (docRef) => {
      const user = docRef.data()
      if (docRef.exists()) {
        //todo the block, role and active properties was inside an account object...after cleaning the data base remember to change it and remove the account obj
        if (!user.blocked) {
          if (user.role == 'user') {
            // await dispatch('getUserData', uid)
            setTimeout(() => {
              commit('setLoading', { type: 'login', is: false })
              this.$router.push('/dashboard/home')
            }, 1200)
            dispatch('initAlert', {
              is: true,
              type: 'success',
              message: 'Logged In Successfully.',
              timer: 3000,
            })
          } else if (user.role == 'admin') {
            this.$router.push('/admin/dashboard')
            commit('setLoading', { type: 'login', is: false })
            dispatch('initAlert', {
              is: true,
              type: 'success',
              message: 'Welcome, Dear Admin.',
              timer: 3000,
            })
          }
        } else {
          commit('setLoading', { type: 'login', is: false })
          dispatch('initAlert', {
            is: true,
            type: 'error',
            message:
              'This Account Has Been Blocked, You Can No Longer Log Into Your Account.',
            timer: 4000,
          })
        }
      } else {
        commit('setLoading', { type: 'login', is: false })
        this.$router.push('/login')
        dispatch('initAlert', {
          is: true,
          type: 'error',
          message: `Account Doesn't Exist, Please Contact Support For More Enquiries`,
          timer: 4000,
        })
      }
    })
  },
}

function generateAccountNumber() {
  // Generate a 10-digit random number
  const accountNumber = Math.floor(1000000000 + Math.random() * 9000000000)

  return accountNumber.toString()
}

function generateRefCode(firstName, secondName, id) {
  const slicedFirstName = firstName.charAt(0)
  const slicedSecondName = secondName.charAt(0)
  const slicedUid = id.slice(16)

  return `${slicedFirstName}${slicedSecondName}-${slicedUid}`
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
