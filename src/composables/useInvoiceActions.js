import db from '@/firebase/firebaseinit';
import { collection, doc, setDoc, updateDoc } from 'firebase/firestore';
import { uid } from 'uid';

export function useInvoiceActions() {

  const uploadInvoice = async (form) => {
    console.log('spread this', form)
    checkItemList(form.invoiceItemList.length)
    const invoicesCollectionRef = collection(db, 'invoices');
    const newInvoiceRef = doc(invoicesCollectionRef);
    try {
      await setDoc(newInvoiceRef, {
      invoiceId: uid(6),
      ...form,
      invoicePaid: 0,
    });
    console.log('Successfully uploaded');
    } catch (error) {
      console.error('Error uploading invoice: ', error.message || error);
    }
  };

const updateInvoice = async (form) => {
  checkItemList(form.invoiceItemList.length)
  const invoiceRef = doc(db, 'invoices', form.docId);
  try {
    await updateDoc(invoiceRef, {
      ...form,
      invoiceItemList: form.invoiceItemList,
      invoiceTotal: form.invoiceTotal
    })
    console.log('Invoice successfully updated!');
  } catch (error) {
    console.error('Error updating invoice: ', error.message || error);
  }
  //window.location.reload()                  //alert('temporary reload fetch the db from fbase')
}

const checkItemList = (listItems) => {
  if (listItems <= 0) {
    alert('Please enter required data');
    return;
  }
}

return { uploadInvoice, updateInvoice };
}
