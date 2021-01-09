<template class="editor">
  <div>
    <div class="page-title editor-title">
      <h3>Редактор</h3>
    </div>

    <section>
      <div class="row">
        <div class="col s12">
          <div>
            <form class="editor-form" @submit.prevent="validate">
              <div class="form-content editor-form-content"></div>

              <div class="editor-btns">
                <button
                  class="btn editor-btn waves-effect waves-light auth-submit blue darken-1"
                >
                  <i class="material-icons">create</i> Редактировать
                </button>

                <button
                  class="btn editor-btn waves-effect waves-light auth-submit blue darken-1"
                >
                  <i class="material-icons">arrow_back</i> Вернуться назад
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'Editor.vue'
}
</script>

<style scoped>
.editor-title{
  display: flex;
  align-items: center;
  justify-content: center;
}

.editor-form,
.editor-form-content,
.editor-card-content {
  color: white !important;

  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
}

.editor-card {
  width: 100%;
}

.editor-input {
  width: 50%;
}

.editor-input input {
  color: rgba(255, 255, 255, 0.9);
}

.editor-input label {
  color: white;
}

input:not([type]),
input[type=text]:not(.browser-default),
input[type=password]:not(.browser-default),
input[type=email]:not(.browser-default),
input[type=url]:not(.browser-default),
input[type=time]:not(.browser-default),
input[type=date]:not(.browser-default),
input[type=datetime]:not(.browser-default),
input[type=datetime-local]:not(.browser-default),
input[type=tel]:not(.browser-default),
input[type=number]:not(.browser-default),
input[type=search]:not(.browser-default),
textarea.materialize-textarea {
  border-bottom: 1px solid rgba(255, 255, 255, 0.8);
}

input.invalid:not([type]),
input.invalid:not([type]):focus,
input.invalid[type=text]:not(.browser-default),
input.invalid[type=text]:not(.browser-default):focus,
input.invalid[type=password]:not(.browser-default),
input.invalid[type=password]:not(.browser-default):focus,
input.invalid[type=email]:not(.browser-default),
input.invalid[type=email]:not(.browser-default):focus,
input.invalid[type=url]:not(.browser-default),
input.invalid[type=url]:not(.browser-default):focus,
input.invalid[type=time]:not(.browser-default),
input.invalid[type=time]:not(.browser-default):focus,
input.invalid[type=date]:not(.browser-default),
input.invalid[type=date]:not(.browser-default):focus,
input.invalid[type=datetime]:not(.browser-default),
input.invalid[type=datetime]:not(.browser-default):focus,
input.invalid[type=datetime-local]:not(.browser-default),
input.invalid[type=datetime-local]:not(.browser-default):focus,
input.invalid[type=tel]:not(.browser-default),
input.invalid[type=tel]:not(.browser-default):focus,
input.invalid[type=number]:not(.browser-default),
input.invalid[type=number]:not(.browser-default):focus,
input.invalid[type=search]:not(.browser-default),
input.invalid[type=search]:not(.browser-default):focus,
textarea.materialize-textarea.invalid,
textarea.materialize-textarea.invalid:focus,
.select-wrapper.invalid>input.select-dropdown,
.select-wrapper.invalid>input.select-dropdown:focus {
  border: none;
}

/* label focus color */
#app .input-field input:focus + label {
  color: white;
}
/* label underline focus color */
#app .input-field input:focus {
  border-bottom: 1px solid white;
  box-shadow: 0 1px 0 0 white;
}

.input-field .helper-text {
  color: rgba(255, 255, 255, 0.7)
}

#app .editor-select {
  border: none;
  border-bottom: 1px solid white;
  padding: 0;

  text-align-last: center;
  text-align: center;

  margin-top: 10px;

  cursor: pointer;
}

#app .editor-select .invalid {
  border: none;
  border-bottom: 1px solid #F44336;
}

#app small .invalid {
  border: none !important;
}

.editor-option {
  margin-left: 15px;

  display: flex;
  justify-content: center;
  align-items: center;
}

.editor-select:focus {
  outline: none !important;
}

.editor-btns {
  width: 50%;
  margin-top: 30px;

  display: flex;
  justify-content: space-between;
  align-items: center;
}

.editor-btn {
  width: 48%;
}
</style>
