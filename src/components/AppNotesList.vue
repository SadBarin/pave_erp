<template>
  <div class="edit-notes">
    <p v-for="(note, i) in notes" :key="i" class="edit-note">
      {{ note }}
    </p>
  </div>
</template>

<script>
export default {
  name: 'AppNotesList',

  props: {
    notesList: Array,
    notesCount: String
  },

  computed: {
    notes () {
      try {
        if (Number(this.$props.notesCount) === 0) {
          return ['Отображение заметок отключено']
        }

        return this.$props.notesList.slice(-this.$props.notesCount)
      } catch (error) {
        return ['Заметки отсутствуют']
      }
    }
  }
}

</script>

<style scoped>
  .edit-notes {
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
  }

  .edit-note {
    color: gray;
    font-size: 1rem !important;

    padding: 0;
  }
</style>
