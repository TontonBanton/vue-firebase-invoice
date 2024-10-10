export const UPDATE_STATUS_TO_PAID = (state, docId) => {
  state.invoiceData.forEach((invoice)=> {
    if (invoice.docId === docId) {
      invoice.invoicePaid = true
      invoice.invoicePending = false
    }
  })
}

export const UPDATE_STATUS_TO_PENDING = (state, docId) => {
state.invoiceData.forEach((invoice)=> {
  if (invoice.docId === docId) {
      invoice.invoicePending = true
      invoice.invoicePaid = false
      invoice.invoiceDraft = false
    }
  })
}