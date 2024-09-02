import { createStore } from 'vuex';
import db from '@/firebase/firebaseinit';
import { collection, doc ,getDocs, deleteDoc, updateDoc } from 'firebase/firestore'; // Import from firestore

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

      const billerZipCodes = state.invoiceData.map(invoice => invoice.billerZipCode);
      console.log('set_invoice_data pushed on array latest: ' + JSON.stringify(billerZipCodes, null, 2));
    },
    SET_CURRENT_INVOICE(state, invoiceId){
      //alert('running set_current mutation')
      state.currentInvoiceArray = state.invoiceData.filter(invoice => invoice.invoiceId === invoiceId)    //Create new currentInvoicearray with the dataId
      //alert('vuex Store setcurrent'+ JSON.stringify(state.currentInvoiceArray, null, 2));
    },
    DELETE_INVOICE(state, docId) {
      //alert('running delete_invoice')
      state.invoiceData = state.invoiceData.filter((invoice) => invoice.docId !== docId);
    },
    UPDATE_STATUS_TO_PAID(state, docId){
      alert('mutating invoice_data')
      alert(typeof state.invoiceData)
      state.invoiceData.forEach((invoice)=> {
        if (invoice.docId === docId) {
          invoice.invoicePaid = true
          invoice.invoicePending = false
        }
      })
    },
    UPDATE_STATUS_TO_PENDING(state, docId){
      state.invoiceData.forEach((invoice)=> {
        if (invoice.docId === docId) {
          invoice.invoicePending = true
          invoice.invoicePaid = false
          invoice.invoiceDraft = false
        }
      })
    }
  },

  actions: {
    async GET_INVOICES({commit, state}){

      const billerZipCodes = state.invoiceData.map(invoice => invoice.billerZipCode);
      console.log('Get_invoices starting invoicedata ' + JSON.stringify(billerZipCodes, null, 2));

      try {
        const querySnapshot = await getDocs(collection(db, 'invoices'));        //Get invoices from firestore
        querySnapshot.forEach((doc) => {

            // Alert the doc.id and the existing docId in the state before the if condition
            console.log('Current Firestore doc.id: ' + doc.id +  'zip: ' + doc.data().clientZipCode);

            const existingInvoice = state.invoiceData.find(invoice => invoice.docId === doc.id);
            console.log('Checking for existing docId: ' + (existingInvoice ? existingInvoice.docId : 'Not found'));

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
            console.log('Get_Invoice id do not exist setinvoicedata push')
            commit('SET_INVOICE_DATA', data)                                    //Execute setinvoicedata mutation passing the data
          }
          console.log('Get_invoice id-exist or finish continue invoices_loaded')
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
