<template>
  <section class="post-list">
    <PostPreview 
      v-for="post in posts"
      :key="post.id"
      :id="post.id" 
      :is-admin="isAdmin"
      :recipeName="post.recipeName" 
      :ingredients="post.ingredients" 
      :thumbnail="post.thumbnail" 
      :description="post.description"
    />
  </section>
</template>

<script>
import PostPreview from '@/components/Posts/PostPreview'

export default {
  components: {
    PostPreview
  },
  props: {
    isAdmin: {
      type: Boolean,
      default: false
    },
    posts: {
      type: Array,
      required: true
    }
  }
}
</script>


<style scoped>
.post-list {
  display: flex;
  padding: 20px;
  box-sizing: border-box;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}
</style>