export default function (context) {
  if(!context.store.getters['data/isAuthenticated']) {
    context.redirect('/admin/auth')
  }
}