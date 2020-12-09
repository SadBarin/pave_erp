<template>
  <div class="row">
    <Popup
      v-if="popupShow"
      v-on:yes="$emit('remove-worker', worker.id)"
      v-on:no="popupHidden"
      v-bind:popup-title="'Удалить рабочего?'"
      v-bind:popup-toast="'Рабочий был удалён'"
    />

    <div class="col s12">
      <div class="card-panel blue darken-1 white-text">
        <div class="card-content dark-text card-line">
          <div class="info-container">
            <h6><i class="material-icons">face</i> Рабочий: {{worker.name}} {{worker.surname}}</h6>
            <h6><i class="material-icons">phone</i> Номер: {{worker.mobilePhone}}</h6>
          </div>
          <div class="button-container">
            <button class="btn-flat blue darken-2 waves-effect waves-light auth-submit white-text"
                    v-on:click="editedWorkerStatus"
                    v-if="!worker.edited"
            >
              <i class="material-icons">create</i> Редактировать
            </button>
            <router-link class="btn-flat blue darken-2 waves-effect waves-light auth-submit blue-text text-lighten-3"
                         to="/workers/editor"
                         v-if="worker.edited"
            >
              <i class="material-icons">border_color</i> Редактировать принудительно
            </router-link>

            <button class="btn-flat blue darken-2 waves-effect waves-light auth-submit white-text"
                    v-if="!worker.edited"
                    v-on:click.prevent="popupVisibility"
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
import Popup from '@/components/Popup'
export default {
  name: 'CardWorkers',
  components: {
    Popup
  },
  props: {
    worker: {
      type: Object
    },
    index: Number
  },
  data () {
    return {
      workers: [],

      popupShow: false
    }
  },
  methods: {
    popupVisibility () {
      this.popupShow = true
    },

    popupHidden () {
      this.popupShow = false
    },

    editedWorkerStatus () {
      if (localStorage.getItem('workers')) {
        try {
          this.workers = JSON.parse(localStorage.getItem('workers'))
        } catch (e) {
          localStorage.removeItem('workers')
        }
      }

      const index = this.workers.findIndex((element) => element.id === this.worker.id)
      this.workers[index].edited = true
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
