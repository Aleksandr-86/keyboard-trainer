export default function directive(app) {
  /* https://stackoverflow.com/a/71638445 
	you can name the directive whatever you want. -> click-outside */
  app.directive('click-outside', {
    beforeMount(element, binding) {
      element.clickOutsideEvent = event => {
        event.stopPropagation()
        if (!(element === event.target || element.contains(event.target))) {
          binding.value(event, element)
        }
      }
      window.requestAnimationFrame(() => {
        document.addEventListener('click', element.clickOutsideEvent)
      })
    },
    unmounted(element) {
      document.removeEventListener('click', element.clickOutsideEvent)
    }
  })
}
