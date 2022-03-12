<template>
  <form @submit.prevent="onSave(recipeModel)">
    <AppControlInput v-model="editedPost.recipeName">Recipe Name</AppControlInput>

    <AppControlInput v-model="editedPost.thumbnail">Thumbnail Link</AppControlInput>

    <AppControlInput
      control-type="textarea"
      v-model="editedPost.description"
    >Description</AppControlInput>

    <div>
      <div>
        <label>Ingredients</label>
        <ul>
          <li v-for="(item,index) in recipeModel.metadata.ingredients" :key="index">
            {{item.ingredient}}
            <AppButton class="remove-button" type="button" @click="removeIngrediant(index)">X</AppButton>
          </li>
        </ul>
      </div>
    </div>
    <div style="display: flex;">
      <AppControlInput v-model="editedPost.ingredient" class="ingredent-input" ref="addIngredientRef"></AppControlInput>
      <AppButton class="add-button" type="button" @click="addIngrediant">Add</AppButton>
    </div>

    <AppButton type="submit">Save</AppButton>

    <AppButton
      type="button"
      style="margin-left: 10px"
      btn-style="cancel"
      @click="onCancel"
    >Cancel</AppButton>
  </form>
</template>

<script>
import AppControlInput from '@/components/UI/AppControlInput'
import AppButton from '@/components/UI/AppButton'
import { mapActions, mapGetters } from 'vuex';

export default {
  components: {
    AppControlInput,
    AppButton
  },
  props: {
    post: {
      type: Object,
      required: false
    }
  },
  data() {
    return {
      editedPost: this.post ? { ...this.post } : {
        recipeName: '',
        thumbnail: '',
        ingredient: '',
        description: '',
      }
    }
  },
  computed: {
    recipeModel() {
      return this.$store.getters['data/recipeModel']
    },
    editting() {
      return this.$store.getters['data/editting']
    }
  },
  methods: {
    onSave(data) {
      const saveData = { ...this.editedPost, ingredients: data.metadata.ingredients }
      this.$emit('submit', saveData);
    },
    onCancel() {
      this.$router.push('/admin')
    },
    addIngrediant() {
      this.editedPost.ingredient = ""
      this.$store.dispatch('data/addIngrediantInRecipe', this.$refs.addIngredientRef.value);
    },
    removeIngrediant(id) {
      this.$store.dispatch('data/removeIngrediantInRecipe', id);
    }
  }
}
</script>


<style scoped>
.ingredent-input {
  width: 100%;
  margin-right: 10px;
}
.add-button, .add-button:hover {
    border: 6px solid #ffc107;
    border-radius: 50px;
    text-align: center;
    justify-content: center;
    background-color: #ffc107;
}

.remove-button, .remove-button:hover {
    border: 1px solid #dc3545;
    border-radius: 50px;
    background-color: #dc3545;
}
</style>