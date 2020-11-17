<template>
  <div>
    <div class="page-title">
      <div class="title-container">
        <h3>Список городов</h3>

        <button class="btn-flat btn-update"
                v-on:click="update"
        ><i class="material-icons">autorenew</i>
        </button>
      </div>

      <AddCardSites
        @add-city="addCity"
      />
    </div>

    <div>
      <ListSites
        v-if="sites.length"
        v-bind:sites="sites"
        @remove-city="removeCity"
      />
      <div v-else class="empty-list">
        <h5 class="empty-list-title"><i class="material-icons">mood_bad</i> Городов не осталось!</h5>
        <p>Добавьте город, чтобы начать работать над ним.</p>
      </div>
    </div>
  </div>
</template>

<script>
import AddCardSites from '@/components/sites/AddCardSites'
import ListSites from '@/components/sites/ListSites'
export default {
  name: 'Sites',
  components: { ListSites, AddCardSites },
  data () {
    return {
      sites: [],

      updateTimeout: 300000
    }
  },
  methods: {
    removeCity (id) {
      this.sites = this.sites.filter(city => city.id !== id)
      this.saveSites()
    },

    addCity (city) {
      this.sites.push(city)
      this.saveSites()
    },

    saveSites () {
      const parsed = JSON.stringify(this.sites)
      localStorage.setItem('sites', parsed)
    },

    update () {
      if (localStorage.getItem('sites')) {
        try {
          this.sites = JSON.parse(localStorage.getItem('sites'))
        } catch (e) {
          localStorage.removeItem('sites')
        }
      }
    }
  },
  mounted () {
    if (localStorage.getItem('sites')) {
      try {
        this.sites = JSON.parse(localStorage.getItem('sites'))
      } catch (e) {
        localStorage.removeItem('sites')
      }
    }

    setInterval(this.update, this.updateTimeout)
  }
}
</script>

<style scoped>
  .page-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
</style>
