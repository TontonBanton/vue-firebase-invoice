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
    form.docId = invoice?.docId || '';
    form.billerStreetAddress = invoice?.billerStreetAddress || '';
    form.billerCity = invoice?.billerCity || '';
    form.billerZipCode = invoice?.billerZipCode || '';
    form.billerCountry = invoice?.billerCountry || '';
    form.clientName = invoice?.clientName || '';
    form.clientEmail = invoice?.clientEmail || '';
    form.clientStreetAddress = invoice?.clientStreetAddress || '';
    form.clientCity = invoice?.clientCity || '';
    form.clientZipCode = invoice?.clientZipCode || '';
    form.clientCountry = invoice?.clientCountry || '';
    form.invoiceDateUnix = invoice?.invoiceDateUnix || ' ';
    form.invoiceDate = invoice?.invoiceDate || '';
    form.paymentTerms = invoice?.paymentTerms || '';
    form.paymentDueDateUnix = invoice?.paymentDueDateUnix || ' ';
    form.paymentDueDate = invoice?.paymentDueDate || '';
    form.productDescription = invoice?.productDescription || '';
    form.invoicePending = invoice?.invoicePending || false;
    form.invoiceDraft = invoice?.invoiceDraft || false;
    form.invoiceItemList = invoice?.invoiceItemList || [];
    form.invoiceTotal = invoice?.invoiceTotal || 0;
  };

  const addNewInvoiceItem = () => {
    form.invoiceItemList.push({ id: uid(), itemName: '', qty: '', price: 0, total: 0 });
    calculateInvoiceTotal();
  };

  const deleteInvoiceItem = (itemId) => {
    form.invoiceItemList = form.invoiceItemList.filter((item) => item.id !== itemId);
    calculateInvoiceTotal();
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
    addNewInvoiceItem,
    deleteInvoiceItem,
    calculateInvoiceTotal,
  };
}

