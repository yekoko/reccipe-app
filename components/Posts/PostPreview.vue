<template>
  <nuxt-link :to="postLink" class="post-preview">
    <article>
      <div 
        class="post-thumbnail" 
        :style="{backgroundImage: 'url(' + thumbnail + ')'}" />
      <div class="post-content">
        <h1>{{ recipeName }}</h1>
        <p class="description">{{ description }}</p>
        <!-- <ul>
          <li v-for="(item,index) in ingredients" :key="index" style="color: red;">
            {{item.ingredient}}
          </li>
        </ul> -->
      </div>
      <!-- <div>
        <AppButton type="button">Edit</AppButton>
        <AppButton type="button">Delete</AppButton>
      </div> -->
    </article>
  </nuxt-link>
</template>

<script>
import AppButton from '@/components/UI/AppButton'

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
</style>