<template>
  <div class="admin-new-post-page">
    <section class="new-post-form">
      <AdminPostForm @submit="onSubmitted" />
    </section>
  </div>
</template>


<script>
import {db} from '@/plugins/firebase.js'
import { doc, setDoc, getDoc, addDoc, collection, Timestamp } from 'firebase/firestore'
import AdminPostForm from '@/components/Admin/AdminPostForm'

export default {
  layout: 'admin',
  middleware: ['check-auth', 'auth'],
  components: {
    AdminPostForm
  },
  methods: {
    async onSubmitted(postData) {
      try {
        await addDoc(collection(db, "postCollection"), { ...postData, updatedDate: Timestamp.fromDate(new Date()) });
        this.$router.push('/admin')
      } catch(e) {
        console.error(e)
      }
    }
  }
}
</script>

<style scoped>
.new-post-form {
  width: 90%;
  margin: 20px auto;
}

@media (min-width: 768px) {
  .new-post-form {
    width: 500px;
  }
}
</style>