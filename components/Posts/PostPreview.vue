<template>
  <div class="post-preview">
    <article>
      <div 
        class="post-thumbnail" 
        :style="{backgroundImage: 'url(' + thumbnail + ')'}" />
      <div class="post-content">
        <h1>{{ recipeName }}</h1>
        <!-- <p class="description">{{ description }}</p> -->
         
          <span class="ingredient-list" v-for="(item,index) in ingredients" :key="index">
            {{item.ingredient}}
          </span>
        
      </div>
      <div style="float: right; margin: 10px;">
        <AppButton @click="$router.push('/posts/'+ id)" type="button" >View</AppButton>
        <AppButton v-if="isAdmin" @click="$router.push('/admin/'+ id)" type="button" style="background-color: #198754">Edit</AppButton>
        <AppButton v-if="isAdmin" @click="onDelete(id)" type="button" style="background-color: #dc3545">Delete</AppButton>
      </div>
    </article>
  </div>
</template>

<script>
import AppButton from '@/components/UI/AppButton'
import {db} from '@/plugins/firebase.js'
import { deleteDoc, doc } from 'firebase/firestore'

export default {
  components: {
    AppButton
  },
  name: 'PostPreview',
  props: {
    id: {
      type: String,
      required: true
    },
    isAdmin: {
      type: Boolean,
      required: true
    },
    recipeName: {
      type: String,
      required: true
    },
    ingredients: {
      type: Array,
      required: true
    },
    thumbnail: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    }
  },
  computed: {
    postLink() {
      // this.$store.dispatch('data/setEditForm', true);
      return this.isAdmin ? '/admin/' + this.id : '/posts/' + this.id
    }
  },
  methods: {
    onDelete(id) {
      // try {
      //   //await deleteDoc(doc(db, "postCollection", id))
      //   this.$router.push('/admin')
      // } catch(e) {
      //   console.error(e)
      // }

      this.$store.dispatch('data/deletePost', id).then(() => {
        this.$router.push('/admin')
      })
    }
  }
}
</script>

<style scoped>
.post-preview {
  border: 1px solid #ccc;
  box-shadow: 0 2px 2px #ccc;
  background-color: white;
  width: 90%;
}

a {
  text-decoration: none;
  color: black;
}

@media (min-width: 850px) {
  .post-preview {
    width: 400px;
    margin: 10px;
  }
}

.post-thumbnail {
  width: 100%;
  height: 200px;
  background-position: center;
  background-size: cover;
}

.post-content {
  padding: 10px;
  text-align: center;
}

.description {
   overflow: hidden;
   text-overflow: ellipsis;
   display: -webkit-box;
   -webkit-line-clamp: 2; /* number of lines to show */
           line-clamp: 2; 
   -webkit-box-orient: vertical;
}

a:hover .post-content,
a:active .post-content {
  background-color: #ccc;
}

.ingredient-list {
  color: #fff;
  border: 1px solid #dc3545;
  border-radius: 5px;
  padding: 5px;
  background: #dc3545;
  margin: 5px;
  font-weight: 400;
  line-height: 2.3;
  text-align: center;
}
</style>