<template>
  <div class="container-page">
    <div class="page-title flex-between-center">
      <div class="flex-center">
        <h3 class="right-margin-big">Список городов</h3>

        <div class="flex-center">
          <button class="btn-transparent transparent btn-page-title blue-text text-darken-1"
                  onclick="M.toast({html: 'Города обновлены'})"
                  @click="this.updateSites"
          ><i class="material-icons middle-material-icons">autorenew</i>
          </button>
        </div>
      </div>

      <AddCardSites
        @add-city="addCity"
        :sites="sites"
      />
    </div>

    <div>
      <ListSites
        v-if="sites.length"
        :sites="sites"
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
import ListSites from '@/components/sites/list/ListSites'
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'Sites',
  components: { ListSites, AddCardSites },
  data () {
    return {
      updateTimeout: 50000
    }
  },
  computed: {
    ...mapGetters([
      'sites'
    ])
  },
  methods: {
    ...mapMutations([
      'SET_SITES'
    ]),

    updateSites () {
      this.SET_SITES()
      console.log('Города обновлены 🌀')
    },

    removeCity (id) {
      const buffer = this.sites.filter(city => city.id !== id)
      console.log('Город удалён 🗑️')
      this.SET_SITES(buffer)
    },

    addCity (city) {
      const buffer = this.sites
      buffer.push(city)
      console.log('Город добавлен ➕')
      this.SET_SITES(buffer)
    }
  },
  mounted () {
    this.updateSites()
    setInterval(() => this.updateSites(), this.updateTimeout)
  }
}
</script>
