import {db} from '@/plugins/firebase.js'
import { collection, doc, getDocs } from 'firebase/firestore'

export const actions = {
  async nuxtServerInit(vuexContext, context) {
    try {
      const datas = await getDocs(collection(db, "postCollection"));
      const postArray = []
      datas.forEach((doc) => {
        
        postArray.push({ ...doc.data(), id: doc.id})
      })
      vuexContext.commit('data/setPosts', postArray)
    } catch (e) {
      console.error(e);
    }
  },
};