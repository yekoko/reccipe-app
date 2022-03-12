<template>
  <div class="admin-post-page">
    <section class="update-form">
      <AdminPostForm :post="loadedPost" @submit="onSubmitted" />
    </section>
  </div>
</template>

<script>
import AdminPostForm from '@/components/Admin/AdminPostForm'
import {db} from '@/plugins/firebase.js'
import { doc, getDoc, updateDoc, Timestamp } from 'firebase/firestore'

export default {
  layout: 'admin',
  middleware: ['check-auth', 'auth'],
  components: {
    AdminPostForm
  },
  async asyncData(context) {
    const docRef = doc(db, "postCollection", context.route.params.postId);
    const docData = await getDoc(docRef);
    docData.data().ingredients.forEach(ing => {
      context.store.dispatch('data/addIngrediantInRecipe',ing.ingredient);
    });
    return {
      loadedPost: docData.data()
    }
  },
  methods: {
    async onSubmitted(postData) {
      try {
        await updateDoc(doc(db, "postCollection", this.$route.params.postId), { ...postData, updatedDate: Timestamp.fromDate(new Date()) });
        this.$router.push('/admin')
      } catch(e) {
        console.error(e)
      }
    }
  }
}
</script>

<style scoped>
.update-form {
  width: 90%;
  margin: 20px auto;
}

@media (min-width: 768px) {
  .update-form {
    width: 500px;
  }
}
</style>