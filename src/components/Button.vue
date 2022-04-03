<script>
import { h } from 'vue'

export default {
  props: {
    code: String,
    id: String,
    text: String
  },

  setup(props) {
    return () =>
      h(
        'div',
        {
          class: ['button-up', { 'button-dn1': props.code === props.id }],
          id: props.id
        },
        props.text
      )
  }
}
</script>
