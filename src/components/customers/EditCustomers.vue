<template>
  <div>
    <Popup
      v-if="popupShow"
      @yes="editorExit"
      @no="popupHidden"
    >
      <template #title-popup>
        Покинуть редактор клиента?
      </template>

      <template #text-info-popup>
        Введённые данные не будут сохранены!
      </template>
    </Popup>

    <div class="page-title flex-between-center">
      <h3>Редактор клиента "{{editedCustomer.name}}"</h3>

      <div class="editor-btns">
        <button
          class="btn editor-btn waves-effect waves-light auth-submit blue darken-1"
          v-on:click="saveEditedCustomer(editedCustomer)"
        >
          <i class="material-icons">exit_to_app</i>Сохранить и выйти
        </button>

        <button
          class="btn editor-btn waves-effect waves-light auth-submit blue darken-1"
          v-on:click.prevent="popupVisibility"
        >
          <i class="material-icons">business_center</i> К Клиентам
        </button>
      </div>
    </div>

    <section>
      <div class="row">
        <div class="col s12">
          <div>

            <form>
              <div class="form-content">
                <div class="card editor-card white darken-1 black-text">
                  <div class="card-content flex-column-center">
                    <h4 class="card-title"><i class="material-icons">account_box</i> Общее</h4>
                    <div class="input-field editor-input">
                      <input
                        id="name"
                        type="text"
                        v-model.trim="editedCustomer.name"
                      >
                      <label class="active" for="name">Имя</label>
                    </div>

                    <div class="input-field editor-input">
                      <input
                        id="contractNumber"
                        type="text"
                        v-model.trim="editedCustomer.contractNumber"
                      >
                      <label class="active" for="contractNumber">Номер договора</label>
                    </div>

                    <div class="input-field editor-input">
                      <input
                        id="contractDate"
                        type="date"
                        v-model.trim="editedCustomer.contractDate"
                      >
                      <label class="active" for="contractDate">Дата договора</label>
                    </div>

                    <div class="input-field editor-input">
                      <input
                        id="number"
                        type="number"
                        v-model.trim="editedCustomer.number"
                      >
                      <label class="active" for="number">Номер телефона</label>
                    </div>

                    <div class="input-field editor-input">
                      <input
                        id="fax"
                        type="number"
                        v-model.trim="editedCustomer.fax"
                      >
                      <label class="active" for="fax">Факс</label>
                    </div>

                    <div class="input-field editor-input">
                      <input
                        id="site"
                        type="text"
                        v-model.trim="editedCustomer.site"
                      >
                      <label class="active" for="site">Сайт</label>
                    </div>

                    <div class="input-field editor-input">
                      <input
                        id="email"
                        type="email"
                        v-model.trim="editedCustomer.email"
                      >
                      <label class="active" for="email">Почта</label>
                    </div>

                    <div class="input-field editor-input">
                      <input
                        id="address"
                        type="text"
                        v-model.trim="editedCustomer.address"
                      >
                      <label class="active" for="address">Почта</label>
                    </div>

                    <div class="input-field editor-input">
                      <input
                        id="note"
                        type="text"
                        v-model.trim="editedCustomer.note"
                      >
                      <label class="active" for="note">Примечание (кратко)</label>
                    </div>

                    <div class="input-field editor-input">
                      <input
                        id="manager"
                        type="text"
                        v-model.trim="editedCustomer.manager"
                      >
                      <label class="active" for="manager">Менеджер</label>
                    </div>

                    <div class="input-field editor-input">
                      <input
                        id="status"
                        type="text"
                        v-model.trim="editedCustomer.status"
                      >
                      <label class="active" for="note">Состояние</label>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import M from 'materialize-css'
import { mask } from 'vue-the-mask'
import popupMixin from '@/mixins/popupMixin'
import { mapGetters, mapMutations } from 'vuex'
import firebase from 'firebase/app'

export default {
  name: 'EditorWorkers',
  mixins: [popupMixin],
  directives: { mask },
  data () {
    return {
      editedCustomer: ''
    }
  },
  computed: {
    ...mapGetters([
      'customers'
    ])
  },
  methods: {
    ...mapMutations([
      'SET_CUSTOMERS_FROM_SERVER'
    ]),

    editorExit () {
      this.$router.push('/customers')
    },

    saveEditedCustomer (customer) {
      firebase.database().ref('customers/' + customer.id).set(customer)
      this.editorExit()
    }
  },

  mounted () {
    const select = document.querySelectorAll('.select')
    select.forEach((element) => {
      M.FormSelect.init(element)
    })

    this.SET_CUSTOMERS_FROM_SERVER()
    // eslint-disable-next-line no-return-assign
    setTimeout(() => this.editedCustomer = this.customers[this.$route.params.id], 1000)
  }
}
</script>

<style scoped>
  .photo-container {
    margin-top: 2rem;
    width: 100%;
  }
</style>
