import { createStore } from 'vuex';
import db from '@/firebase/firebaseinit';
import { collection, doc ,getDocs, deleteDoc, updateDoc } from 'firebase/firestore'; // Import from firestore
import { firestoreInvoiceToObject } from '@/composables/useInvoiceData'
import { UPDATE_STATUS_TO_PAID, UPDATE_STATUS_TO_PENDING } from './statusMutations';

export default createStore({
  state: {
    invoicesLoaded: null,
    invoiceModal: null,
    modalActive: null,
    editInvoice: null,

    invoiceData: [],
    currentInvoiceArray: [],
  },

  mutations: {
    INVOICES_LOADED(state){
      state.invoicesLoaded = true
    },

    //Toggles Mutations
    TOGGLE_INVOICE(state) {
      state.invoiceModal = !state.invoiceModal;
    },
    TOGGLE_MODAL(state) {
      state.modalActive = !state.modalActive;
    },
    TOGGLE_EDIT_INVOICE(state) {
      state.editInvoice = !state.editInvoice;
    },

    //Invoice Data Mutation
    SET_INVOICE_DATA(state, data){
      state.invoiceData.push(data)
    },
    SET_CURRENT_INVOICE(state, invoiceId){
      //Create new currentInvoicearray with the dataId
      state.currentInvoiceArray = state.invoiceData.filter(invoice => invoice.invoiceId === invoiceId)
    },
    DELETE_INVOICE(state, docId) {
      state.invoiceData = state.invoiceData.filter((invoice) => invoice.docId !== docId);
    },

    UPDATE_STATUS_TO_PAID,
    UPDATE_STATUS_TO_PENDING,

  },

  actions: {

    async GET_INVOICES({commit, state}){
      try {
        const invoicesCollection = collection(db, 'invoices');
        const querySnapshot = await getDocs(invoicesCollection);

        querySnapshot.forEach((invoiceDoc) => {
          // Check if the invoice with the current docId doesn't already exist in invoiceData
          if (!state.invoiceData.some(invoice => invoice.docId === invoiceDoc.id)) {
            const invoiceObj = firestoreInvoiceToObject(invoiceDoc);
            commit('SET_INVOICE_DATA', invoiceObj)
          }
          commit('INVOICES_LOADED')
        });
      } catch (error) {
        console.error('Error fetching invoices:', error);
      }
    },

    async UPDATE_INVOICE({ commit, dispatch }, { docId, routeId }) {
      commit("DELETE_INVOICE", docId);
      await dispatch("GET_INVOICES");
      commit("TOGGLE_INVOICE");
      commit("TOGGLE_EDIT_INVOICE");
      commit("SET_CURRENT_INVOICE", routeId);
    },

    async DELETE_INVOICE({ commit }, docId) {
      const invoiceRef = doc(db, "invoices", docId);        // Reference to the document
      await deleteDoc(invoiceRef);                          // Delete the document
      alert('Invoice successfully deleted on server');
      commit("DELETE_INVOICE", docId);                      // Commit the mutation to remove it from the state
    },

    async UPDATE_STATUS_TO_PAID({commit}, docId) {
      alert('entering action')
      const invoiceRef = doc(db, "invoices", docId);          //UPDATE BACKEND
      await updateDoc(invoiceRef, {
        invoicePaid: true,
        invoicePending: false,
      });
      commit("UPDATE_STATUS_TO_PAID", docId);                 //UPDATE FRONTEND
    },
    async UPDATE_STATUS_TO_PENDING({commit}, docId) {
      const invoiceRef = doc(db, "invoices", docId);
      await updateDoc(invoiceRef, {
        invoicePending: true,
        invoicePaid: false,
        invoiceDraft: false
      });
      commit("UPDATE_STATUS_TO_PENDING", docId);
    }
  },

  modules: {}
});
