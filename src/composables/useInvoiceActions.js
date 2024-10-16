import db from '@/firebase/firebaseinit';
import { collection, doc, setDoc } from 'firebase/firestore';
import { uid } from 'uid';

export function useInvoiceActions() {

  const uploadInvoice = async (form) => {
    if (form.invoiceItemList.length <= 0) {
      alert('Please enter required data');
      return;
    }

  const invoicesCollectionRef = collection(db, 'invoices');
  const newInvoiceRef = doc(invoicesCollectionRef);
  try {
    await setDoc(newInvoiceRef, {
      invoiceId: uid(6),
      billerStreetAddress: form.billerStreetAddress,
      billerCity: form.billerCity,
      billerZipCode: form.billerZipCode,
      billerCountry: form.billerCountry,
      clientName: form.clientName,
      clientEmail: form.clientEmail,
      clientStreetAddress: form.clientStreetAddress,
      clientCity: form.clientCity,
      clientZipCode: form.clientZipCode,
      clientCountry: form.clientCountry,
      invoiceDate: form.invoiceDate,
      invoiceDateUnix: form.invoiceDateUnix,
      paymentTerms: form.paymentTerms,
      paymentDueDate: form.paymentDueDate,
      paymentDueDateUnix: form.paymentDueDateUnix,
      productDescription: form.productDescription,
      invoiceItemList: form.invoiceItemList,
      invoiceTotal: form.invoiceTotal,
      invoicePending: form.invoicePending,
      invoiceDraft: form.invoiceDraft,
      invoicePaid: 0,
    });
    console.log('Successfully uploaded');
  } catch (error) {
    console.error('Error uploading invoice: ', error.message || error);
  }
};

return {
  uploadInvoice,
};
}
