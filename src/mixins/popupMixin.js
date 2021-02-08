export default {
  data () {
    return {
      popupShow: false
    }
  },

  methods: {
    popupVisibility () {
      this.popupShow = true
    },

    popupHidden () {
      this.popupShow = false
    }
  }
}
