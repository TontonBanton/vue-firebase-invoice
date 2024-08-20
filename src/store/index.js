import { createStore } from 'vuex';
import db from '@/firebase/firebaseinit';
import { collection, getDocs } from 'firebase/firestore'; // Import from firestore

export default createStore({
  state: {
    invoiceModal: null,
    modal: null,
    invoiceData: [],
    invoicesLoaded: null
  },
  mutations: {
    TOGGLE_INVOICE(state) {
      state.invoiceModal = !state.invoiceModal;
    },
    TOGGLE_MODAL(state) {
      state.modalActive = !state.modalActive;
    },
    SET_INVOICE_DATA(state, data){
      state.invoiceData.push(data)
      console.log(state.invoiceData)
    },
    INVOICES_LOADED(state){
      state.invoicesLoaded = true
    }
  },
  actions: {
    async GET_INVOICES({commit, state}){
      try {
        const querySnapshot = await getDocs(collection(db, 'invoices'));        //Get invoices from firestore
        querySnapshot.forEach((doc) => {
          if (!state.invoiceData.some(invoice => invoice.docId === doc.id)) {   //Check if docid already exist
            const data = {                                                      //Save InvoiceDatas in data object
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
            commit('SET_INVOICE_DATA', data)                                    //Execute setinvoicedata mutation
          }
          commit('INVOICES_LOADED')                                             //Excecute mutation
        });
      } catch (error) {
        console.error('Error fetching invoices:', error);
      }
    }
  },
  modules: {}
});
