import { reactive } from 'vue';

export function useInvoiceForm() {
  const form = reactive({
    billerStreetAddress: '',
    billerCity: '',
    billerZipCode: '',
    billerCountry: '',
    clientName: '',
    clientEmail: '',
    clientStreetAddress: '',
    clientCity: '',
    clientZipCode: '',
    clientCountry: '',
    invoiceDate: '',
    invoiceDateUnix: null,
    invoiceDraft: false,
    invoiceId: '',
    invoiceItemList: [],
    invoicePending: false,
    invoiceTotal: 0,
    paymentDueDate: '',
    paymentDueDateUnix: null,
    paymentTerms: '',
    productDescription: '',
  });

  const populateForm = (inv) => {
    console.log(inv)
    form.docId = inv?.docId || '';  // Ensure this is part of the form if needed
    form.billerStreetAddress = inv?.billerStreetAddress || '';
    form.billerCity = inv?.billerCity || '';
    form.billerZipCode = inv?.billerZipCode || '';
    form.billerCountry = inv?.billerCountry || '';
    form.clientName = inv?.clientName || '';
    form.clientEmail = inv?.clientEmail || '';
    form.clientStreetAddress = inv?.clientStreetAddress || '';
    form.clientCity = inv?.clientCity || '';
    form.clientZipCode = inv?.clientZipCode || '';
    form.clientCountry = inv?.clientCountry || '';
    form.invoiceDateUnix = inv?.invoiceDateUnix || null; // Use null for Unix timestamp
    form.invoiceDate = inv?.invoiceDate || '';
    form.paymentTerms = inv?.paymentTerms || '';
    form.paymentDueDateUnix = inv?.paymentDueDateUnix || null; // Use null for Unix timestamp
    form.paymentDueDate = inv?.paymentDueDate || '';
    form.productDescription = inv?.productDescription || '';
    form.invoicePending = inv?.invoicePending || false;
    form.invoiceDraft = inv?.invoiceDraft || false;
    form.invoiceItemList = inv?.invoiceItemList || [];
    form.invoiceTotal = inv?.invoiceTotal || 0;
  };

  return {
    form,
    populateForm,
  };
}

