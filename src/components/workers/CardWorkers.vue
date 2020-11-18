<template>
  <div class="row">
    <template v-if="overlayShow">
      <div class="popup-overlay">
        <form class="card auth-card popup">
          <div class="card-content">
            <span class="card-title">Удалить элемент? <br></span>
            <span class="popup-subtitle">Рабочий: {{worker.name}}</span>
          </div>

          <div class="card-action btn-popup">
            <button type="submit"
                    class="btn-flat white-text waves-effect waves-light auth-submit blue darken-1"
                    v-on:click="$emit('remove-worker', worker.id)"
            >
              <i class="material-icons">check</i> Да
            </button>

            <button type="submit"
                    class="btn-flat white-text waves-effect waves-light auth-submit blue darken-1"
                    v-on:click="overlayHidden"
            >
              <i class="material-icons">clear</i> Нет
            </button>
          </div>
        </form>
      </div>
    </template>

    <div class="col s12">
      <div class="card-panel blue darken-1 white-text">
        <div class="card-content dark-text card-line">
          <div class="info-container">
            <h6><i class="material-icons">face</i> Рабочий: {{worker.name}}</h6>
          </div>
          <div class="button-container">
            <button class="btn-flat waves-effect waves-light auth-submit white-text"
                    v-on:click="editedWorkerStatus"
                    v-if="!worker.edited"
            >
              <i class="material-icons">create</i> Редактировать
            </button>
            <router-link class="btn-flat waves-effect waves-light auth-submit blue-text text-lighten-3"
                         to="/workers/editor"
                         v-if="worker.edited"
            >
              <i class="material-icons">border_color</i> Редактировать принудительно
            </router-link>

            <button class="btn-flat waves-effect waves-light auth-submit white-text"
                    v-if="!worker.edited"
                    v-on:click="overlayVisibility"
            >
              <i class="material-icons">delete</i> Удалить
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CardWorkers',
  props: {
    worker: {
      type: Object,
      required: true
    },
    index: Number
  },
  data () {
    return {
      workers: [
        { id: 1, name: 'Зубило', edited: false }],

      overlayShow: false
    }
  },
  methods: {
    overlayVisibility () {
      this.overlayShow = true
    },

    overlayHidden () {
      this.overlayShow = false
    },

    editedWorkerStatus () {
      // const index = this.workers.findIndex((element) => element.id === this.worker.id)
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      // this.workers[index].edited = true
      this.saveWorkers()
      this.$router.push('/workers/editor')
    },

    saveWorkers () {
      const parsed = JSON.stringify(this.workers)
      localStorage.setItem('workers', parsed)
    }
  },
  mounted () {
    if (localStorage.getItem('workers')) {
      try {
        this.workers = JSON.parse(localStorage.getItem('workers'))
      } catch (e) {
        localStorage.removeItem('workers')
      }
    }
  }
}
</script>

<style scoped>
  .row .col {
    padding: 0;
  }

  .card-line {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  .info-container {
    width: 50%;
  }

  h6 {
    display: flex;
    align-items: center;
  }

  h6 .material-icons {
    margin-right: 10px;
  }

  .btn-flat {
    margin-left: 10px;
  }

  .button-container {
    display: flex;
    justify-content: end;
  }
</style>
