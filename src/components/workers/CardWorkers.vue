<template>
  <div class="row">
    <div class="col s12">
      <div class="card-panel blue darken-1 white-text">
        <div class="card-content dark-text card-line">
          <div class="info-container">
            <h6>Рабочий: {{worker.name}}</h6>
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
                    v-on:click="$emit('remove-worker', worker.id)"
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
        { id: 1, name: 'Зубило', edited: false }]
    }
  },
  methods: {
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

  .btn-flat {
    margin-left: 10px;
  }

  .button-container {
    display: flex;
    justify-content: end;
  }
</style>
