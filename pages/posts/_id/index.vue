<template>
  <div class="single-post-page">
    <section style="float: left;">
      <AppButton @click="$router.push('/posts')" type="button" style="background-color: #ffc107">Back</AppButton>
    </section>
    <section class="post">
      <div class="post-thumbnail">
        <img :src="loadedPosts.thumbnail" alt="" class="recipe-thumbnail">
      </div>
      <h1>{{ loadedPosts.recipeName }}</h1>
      <div class="post-details">
        <div style="text-align: left">
          <h3 >Ingredients: </h3>
          <ul>
            <li v-for="(item,index) in loadedPosts.ingredients" :key="index" style="color: red">
            {{item.ingredient}}
          </li>
          </ul>
        </div>
      </div>
      <div>
        <h3 >Description: </h3>
        <p>{{ loadedPosts.description }}</p>
      </div>
    </section>
    <section class="post-feedback">
      <p>Let me know what you think about the receipe, send a mail to <a href="mailto:feedback@mydomain.com">feedback@mydomain.com</a>.</p>
    </section>
  </div>
</template>

<script>
import {db} from '@/plugins/firebase.js'
import { collection, doc, getDoc } from 'firebase/firestore'
import AppButton from '@/components/UI/AppButton'

export default {
  components: {
    AppButton
  },
  async asyncData(context) {
    const docRef = doc(db, "postCollection", context.route.params.id);
    const docSnap = await getDoc(docRef);
     
    return {
      loadedPosts: docSnap.data()
    }
  }
}
</script>

<style scoped>
.single-post-page {
  padding: 30px;
  text-align: center;
  box-sizing: border-box;
}

.post {
  width: 100%;
}

@media (min-width: 768px) {
  .post {
    width: 600px;
    margin: auto;
  }
}

.post-title {
  margin: 0;
}

.post-details {
  padding: 10px;
  box-sizing: border-box;
  border-bottom: 3px solid #ccc;
  display: flex;
  justify-content: left;
  align-items: left;
  flex-direction: column;
}

@media (min-width: 768px) {
  .post-details {
    flex-direction: row;
  }
}

.post-detail {
  color: rgb(88, 88, 88);
  margin: 0 10px;
}

.post-feedback a {
  color: red;
  text-decoration: none;
}

.post-feedback a:hover,
.post-feedback a:active {
  color: salmon;
}

.recipe-thumbnail {
  width: 80%;
  background-color: white;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  margin-bottom: 25px;
}
</style>