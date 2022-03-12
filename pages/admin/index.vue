<template>
  <div class="admin-page">
    <section>
      <AppButton @click="$router.push('/admin/new-post')">Create Recipe</AppButton>
      <AppButton @click="onLogout" style="float: right;">Logout</AppButton>
    </section>
    <section class="existing-posts">
      <h1>Existing Recipes</h1>
      <PostList isAdmin :posts="loadedPosts"/>
    </section>
  </div>
</template>

<script>
import PostList from '@/components/Posts/PostList'
import AppButton from '@/components/UI/AppButton'

export default {
  layout: 'admin',
  middleware: ['check-auth', 'auth'],
  components: {
    PostList,
    AppButton
  },
  computed: {
    loadedPosts() {
      return this.$store.getters['data/loadedPosts']
    }
  },
  methods: {
    onLogout() {
      this.$store.dispatch('data/logout');
      this.$router.push('/admin/auth')
    }
  }
}
</script>

<style scoped>
.admin-page {
  padding: 20px;
}

.new-post {
  text-align: center;
  border-bottom: 2px solid #ccc;
  padding-bottom: 10px;
}

.existing-posts h1 {
  text-align: center;
}
</style>