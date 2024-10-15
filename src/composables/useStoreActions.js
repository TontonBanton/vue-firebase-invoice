import { useStore } from 'vuex'

export const useStoreActions= () => {
  const store = useStore()

  const updateStatusPaid = (docId) => store.dispatch('UPDATE_STATUS_TO_PAID', docId)
  const updateStatusPending = (docId)=> store.dispatch('UPDATE_STATUS_TO_PENDING', docId)

 return{ updateStatusPaid, updateStatusPending }
}