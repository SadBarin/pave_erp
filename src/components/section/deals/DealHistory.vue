<template>
  <div>
    <div class="page-title flex-between-center" style="margin-top: 2rem">
      <h3 class="right-margin-big">История изменения сделки<br>"{{deal.name}}"</h3>
    </div>

    <section v-if="this.deal.history">
      <div v-for="(moment, i) of deal.history" :key="i">
        <div class="history-line">
          <p class="history-index">{{i}}:</p>
          <div class="history-moment">
            <span class="history-moment-date">{{moment.date}}</span>
            <p class="history-moment-text">{{moment.info}}</p>
            <router-link title="Перейти к сотруднику"
                         :to="{name : 'employeeEdit', params: {id: moment.employee.id}}"
            >
              {{moment.employee.name}}
            </router-link>
          </div>
        </div>
      </div>
    </section>

    <section v-else>Истории пока нет</section>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'DealHistory',
  data () {
    return {
      deal: ''
    }
  },
  computed: {
    ...mapGetters([
      'deals'
    ])
  },
  methods: {
    ...mapMutations([
      'SET_DEALS_FROM_LOCAL_STORAGE'
    ])
  },
  mounted () {
    this.SET_DEALS_FROM_LOCAL_STORAGE()
    this.deal = this.deals[this.$route.params.id]
    console.log()
  }
}
</script>
