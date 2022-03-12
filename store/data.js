import Cookie from 'js-cookie'

export const state = () => ({
  loadedPosts: [],
  recipes: [],
  recipe: {
    metadata:{
        feature_image: {
        },
        ingredients:[]
    }
  },
  editting: false,
  token: null
});

export const mutations = {
  setPosts(state, posts) {
    state.loadedPosts = posts;
  },
  ADD_INGREDIANT_RECIPE(state, payload) {
    state.recipe.metadata.ingredients.push({
        ingredient: payload
    });
  },
  REMOVE_INGREDIANT_RECIPE(state, payload) {
    state.recipe.metadata.ingredients.splice(payload, 1);
  },
  TOGGLE_EDITFORM(state, payload) {
    state.editting = payload;
  },
  setToken(state, token) {
    state.token = token;
  }
};

export const actions = {
  setPosts(vuexContext, posts) {
    vuexContext.commit('setPosts', posts);
  },
  addIngrediantInRecipe(context,payload){
    context.commit('ADD_INGREDIANT_RECIPE',payload);
  },
  removeIngrediantInRecipe(context,payload) {
    context.commit('REMOVE_INGREDIANT_RECIPE',payload);
  },
  setEditForm(context,payload){
    context.commit('TOGGLE_EDITFORM',payload);
  },
  authenticateUser(context, payload) {
    let authUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + process.env.fbAPIKey
    if (!payload.isLogin) {
      authUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + process.env.fbAPIKey
    }

    return this.$axios.$post(authUrl, {
          email: payload.email,
          password: payload.password,
          returnSecureToken: true
        }
    ).then(result => {
      context.commit('setToken', result.idToken)
      localStorage.setItem('token', new Date().getTime() + result.idToken)
      localStorage.setItem('tokenExpiration', result.expiresIn * 1000)

      Cookie.set('jwt', result.idToken)
      Cookie.set('expirationDate', result.expiresIn * 1000)
    }).catch(e => console.error(e))
  },
  initAuth(context, req) {
    let token;
    if(req) {
      if (!req.headers.cookie) {
        return;
      }
      const jwtCookie = req.headers.cookie.split(';').find(c => c.trim().startsWith('jwt='))
      
      if(!jwtCookie) {
        return;
      }
      token = jwtCookie.split('=')[1];
    }else {
      token = localStorage.getItem('token')
      const expiration = localStorage.getItem('tokenExpiration')

      if(new Date() > expiration || !token) {
        return;
      }
    }
    context.commit('setToken', token)
  },
  logout(context) {
    Cookie.remove('jwt')
    Cookie.remove('expirationDate')
    if(process.client) {
      localStorage.removeItem('token')
      localStorage.removeItem('tokenExpiration')
    }
  }
};

export const getters = {
  loadedPosts(state) {
    return state.loadedPosts;
  },
  recipeModel(state){
      return state.recipe;
  },
  editting(state){
    return state.editting;
  },
  isAuthenticated(state) {
    return state.token != null
  }
};