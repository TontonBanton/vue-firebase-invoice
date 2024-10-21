import { reactive } from 'vue';
import { uid } from 'uid';

export function useInvoiceForm() {
  const form = reactive({
    docId: ' ',
    billerStreetAddress: ' ',
    billerCity: ' ',
    billerZipCode: ' ',
    billerCountry: ' ',
    clientName: ' ',
    clientEmail: ' ',
    clientStreetAddress: ' ',
    clientCity: ' ',
    clientZipCode: ' ',
    clientCountry: ' ',
    invoiceDateUnix: ' ',
    invoiceDate: ' ',
    paymentTerms:  ' ',
    paymentDueDateUnix: ' ',
    paymentDueDate: ' ',
    productDescription: ' ',
    invoicePending: false,
    invoiceDraft: false,
    invoiceItemList: [],
    invoiceTotal: 0,
  });

  const populateForm = (invoice) => {
    invoice = invoice || {};
    form.invoiceItemList = invoice.invoiceItemList || [];
    Object.assign(form, invoice);
  };

  const calculateInvoiceTotal = () => {
    form.invoiceTotal = 0;
    form.invoiceItemList.forEach((item) => {
      form.invoiceTotal += item.total;
    });
  };

  return {
    form,
    populateForm,
    calculateInvoiceTotal,
  };
}

