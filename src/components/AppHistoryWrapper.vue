<template>
  <div id="app-history-wrapper">
    <AppTopPanel :header="header">
      <template #nav-buttons>
        <slot name="nav-buttons"></slot>
      </template>
    </AppTopPanel>

    <section v-if="element.history && element.history.length !== 0">
      <div v-for="(moment, i) of element.history" :key="i">
        <div class="history-line">
          <p class="history-index">{{i}}:</p>
          <div class="history-moment">
            <span class="history-moment-date">{{moment.date}}</span>
            <p class="history-moment-text">{{moment.info}}</p>
            <p title="Перейти к сотруднику"
                         :to="{name : 'employeeEdit', params: {id: moment.employee.id}}"
            >
              {{moment.employee.name}}
            </p>
          </div>
        </div>
      </div>
    </section>

    <section v-else>Истории пока нет</section>
  </div>
</template>

<script>
import AppTopPanel from './AppTopPanel'

export default {
  name: 'AppHistoryWrapper',
  components: { AppTopPanel },
  props: {
    header: String,
    element: Object
  }
}
</script>

<style>
  #app-history-wrapper .history-line {
    border-radius: var(--border-radius);
    display: grid;
    grid-template-columns: 4rem 1fr;
  }

  #app-history-wrapper .history-line:hover {
    background: var(--hover-bg);
  }

  #app-history-wrapper .history-line p {
    margin: 0;
  }

  #app-history-wrapper .history-moment {
    display: flex;
    align-items: center;
  }

  #app-history-wrapper .history-moment-date {
    opacity: 0.5;
    margin-right: 0.5rem;
  }

  #app-history-wrapper .history-moment-text {
    margin-right: 0.5rem;
  }

  #app-history-wrapper .history-index {
    box-sizing: border-box;

    background: var(--hover-bg);
    opacity: 0.5;

    margin-right: 0.5rem;
    padding: 0 1rem;
  }
</style>
