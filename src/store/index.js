import { createStore } from 'vuex';
import db from '@/firebase/firebaseinit';
import { collection, getDocs } from 'firebase/firestore'; // Import from firestore

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
    TOGGLE_INVOICE(state) {
      state.invoiceModal = !state.invoiceModal;
    },
    TOGGLE_MODAL(state) {
      state.modalActive = !state.modalActive;
    },
    TOGGLE_EDIT_INVOICE(state) {
      state.editInvoice = !state.editInvoice;
    },
    SET_INVOICE_DATA(state, data){
      state.invoiceData.push(data)
    },
    SET_CURRENT_INVOICE(state, invoiceId){
      state.currentInvoiceArray = state.invoiceData.filter(invoice => invoice.invoiceId === invoiceId)    //Create new currentInvoicearray with the dataId
      //alert('vuex Store setcurrent'+ JSON.stringify(state.currentInvoiceArray, null, 2));
    },
    DELETE_INVOICE(state, invoiceId){
      state.currentInvoiceArray = state.invoiceData.filter(invoice => invoice.invoiceId !== invoiceId);   //Create new currentInvoicearray excluding dataId
    },
  },

  actions: {
    async GET_INVOICES({commit, state}){
      try {
        const querySnapshot = await getDocs(collection(db, 'invoices'));        //Get invoices from firestore
        querySnapshot.forEach((doc) => {

          if (!state.invoiceData.some(invoice => invoice.docId === doc.id)) {   //Check if docid does not exist in invoice data
            const data = {                                                      //Save InvoiceDatas in data object if no match on id
              docId: doc.id,
              invoiceId: doc.data().invoiceId,
              billerStreetAddress: doc.data().billerStreetAddress,
              billerCity: doc.data().billerCity,
              billerZipCode: doc.data().billerZipCode,
              billerCountry: doc.data().billerCountry,
              clientName: doc.data().clientName,
              clientEmail: doc.data().clientEmail,
              clientStreetAddress: doc.data().clientStreetAddress,
              clientCity: doc.data().clientCity,
              clientZipCode: doc.data().clientZipCode,
              clientCountry: doc.data().clientCountry,
              invoiceDateUnix: doc.data().invoiceDateUnix,
              invoiceDate: doc.data().invoiceDate,
              paymentTerms: doc.data().paymentTerms,
              paymentDueDateUnix: doc.data().paymentDueDateUnix,
              paymentDueDate: doc.data().paymentDueDate,
              productDescription: doc.data().productDescription,
              invoiceItemList: doc.data().invoiceItemList,
              invoiceTotal: doc.data().invoiceTotal,
              invoicePending: doc.data().invoicePending,
              invoiceDraft: doc.data().invoiceDraft,
              invoicePaid: doc.data().invoicePaid,
            };
            commit('SET_INVOICE_DATA', data)                                    //Execute setinvoicedata mutation passing the data
          }
          commit('INVOICES_LOADED')                                             //Excecute mutation set loaded to true
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
  },

  modules: {}
});
