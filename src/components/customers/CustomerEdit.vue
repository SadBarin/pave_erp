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
      <h3 class="title-clip">Редактор клиента <br> "{{editedCustomer.name}}"</h3>

      <div class="editor-btns">
        <button
          class="btn editor-btn btn-hover auth-submit blue darken-1"
          v-on:click="saveEditedCustomer(editedCustomer)"
        >
          <i class="material-icons">exit_to_app</i>Сохранить и выйти
        </button>

        <button
          class="btn editor-btn btn-hover auth-submit blue darken-1"
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
                      <label class="active" for="name"> Наименование</label>
                    </div>
                  </div>
                </div>

                <div class="card editor-card white darken-1 black-text">
                  <div class="card-content flex-column-center">
                    <h4 class="card-title"><i class="material-icons">comment</i>Примечание</h4>

                    <div class="input-field editor-input">
                      <textarea
                        id="note"
                        class="materialize-textarea"
                        maxlength="500"
                        data-length="500"
                        v-model.trim="editedCustomer.note"
                      ></textarea>
                      <label class="active" for="note">Примечание</label>
                    </div>

                    <div class="input-field editor-input flex-column-center">
                      <button id="upload_widget" @click.prevent="upload" class="cloudinary-button">Загрузить фото примечания</button>

                      <div class="photo-container flex-center" v-if="editedCustomer.uploadImage != null">
                        <img :src="editedCustomer.uploadImage" width="200rem">
                      </div>
                    </div>

                  </div>
                </div>

<!--                <div class="card editor-card white darken-1 black-text">-->
<!--                  <div class="card-content flex-column-center">-->
<!--                    <h4 class="card-title"><i class="material-icons">business_center</i> Договоры</h4>-->

<!--                    <div class="input-field editor-input">-->
<!--                      <input-->
<!--                        id="contractNumber"-->
<!--                        type="number"-->
<!--                        v-model.trim="editedCustomer.contractNumber"-->
<!--                      >-->
<!--                      <label class="active" for="contractNumber">Номер договора</label>-->
<!--                    </div>-->

<!--                    <div class="input-field editor-input">-->
<!--                      <input-->
<!--                        id="contractDate"-->
<!--                        type="date"-->
<!--                        v-model.trim="editedCustomer.contractDate"-->
<!--                      >-->
<!--                      <label class="active" for="contractDate">Дата договора</label>-->
<!--                    </div>-->
<!--                  </div>-->
<!--                </div>-->

<!--                <div class="card editor-card white darken-1 black-text">-->
<!--                  <div class="card-content flex-column-center">-->
<!--                    <h4 class="card-title"><i class="material-icons">local_phone</i> Контакты</h4>-->

<!--                    <div class="input-field editor-input">-->
<!--                      <input-->
<!--                        id="number"-->
<!--                        type="tel"-->
<!--                        maxlength="20"-->
<!--                        v-model.trim="editedCustomer.number"-->
<!--                      >-->
<!--                      <label class="active" for="number">Номер телефона</label>-->
<!--                    </div>-->

<!--                    <div class="input-field editor-input">-->
<!--                      <input-->
<!--                        id="fax"-->
<!--                        type="number"-->
<!--                        v-model.trim="editedCustomer.fax"-->
<!--                      >-->
<!--                      <label class="active" for="fax">Факс</label>-->
<!--                    </div>-->

<!--                    <div class="input-field editor-input">-->
<!--                      <input-->
<!--                        id="site"-->
<!--                        type="text"-->
<!--                        v-model.trim="editedCustomer.site"-->
<!--                      >-->
<!--                      <label class="active" for="site">Сайт</label>-->
<!--                    </div>-->

<!--                    <div class="input-field editor-input">-->
<!--                      <input-->
<!--                        id="email"-->
<!--                        type="email"-->
<!--                        v-model.trim="editedCustomer.email"-->
<!--                      >-->
<!--                      <label class="active" for="email">Почта</label>-->
<!--                    </div>-->

<!--                    <div class="input-field editor-input">-->
<!--                      <input-->
<!--                        id="address"-->
<!--                        type="text"-->
<!--                        v-model.trim="editedCustomer.address"-->
<!--                      >-->
<!--                      <label class="active" for="address">Адрес</label>-->
<!--                    </div>-->
<!--                  </div>-->
<!--                </div>-->

<!--                <div class="card editor-card white darken-1 black-text">-->
<!--                  <div class="card-content flex-column-center">-->
<!--                    <h4 class="card-title"><i class="material-icons">assessment</i> Системная информация</h4>-->

<!--                    <div class="input-field editor-input">-->
<!--                      <input-->
<!--                        id="manager"-->
<!--                        type="text"-->
<!--                        v-model.trim="editedCustomer.manager"-->
<!--                      >-->
<!--                      <label class="active" for="manager">Менеджер</label>-->
<!--                    </div>-->

<!--                    <div class="input-field radio-field editor-input flex-start-center">-->
<!--                      <p class="right-margin-big">Статус: </p>-->
<!--                      <p class="right-margin-little">-->
<!--                        <label>-->
<!--                          <input name="status" type="radio" value="Действующий" v-model.trim="editedCustomer.status"/>-->
<!--                          <span>Действующий</span>-->
<!--                        </label>-->
<!--                      </p>-->
<!--                      <p>-->
<!--                        <label>-->
<!--                          <input name="status" type="radio" value="Сотрудничество прервано" v-model.trim="editedCustomer.status"/>-->
<!--                          <span>Сотрудничество прервано</span>-->
<!--                        </label>-->
<!--                      </p>-->
<!--                    </div>-->
<!--                  </div>-->
<!--                </div>-->
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

  created () {
    const select = document.querySelectorAll('.select')
    select.forEach((element) => {
      M.FormSelect.init(element)
    })

    const textarea = document.querySelectorAll('.materialize-textarea')
    textarea.forEach((element) => {
      M.CharacterCounter.init(element)
    })

    this.SET_CUSTOMERS_FROM_LOCAL_STORAGE()
    this.editedCustomer = this.customers[this.$route.params.id]
  },

  methods: {
    ...mapMutations([
      'SET_CUSTOMERS_FROM_SERVER',
      'SET_CUSTOMERS_FROM_LOCAL_STORAGE'
    ]),

    upload () {
      // eslint-disable-next-line no-undef
      const myWidget = cloudinary.createUploadWidget({
        cloudName: 'db6qzfvbw',
        uploadPreset: 'ml_default',
        language: 'ru'
      }, (error, result) => {
        if (!error && result && result.event === 'success') {
          this.editedCustomer.uploadImage = result.info.secure_url
        }
      })

      myWidget.open()
    },

    editorExit () {
      this.$router.push('/customers')
    },

    saveEditedCustomer (customer) {
      firebase.database().ref('customers/' + customer.id).set(customer)
        .then(() => {
          this.SET_CUSTOMERS_FROM_SERVER()
          this.editorExit()
        })
    }
  }
}
</script>
