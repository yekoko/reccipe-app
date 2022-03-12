export default function (context) {
    context.store.dispatch('data/initAuth', context.req);
}