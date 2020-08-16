<template>
  <div class="q-pa-md q-gutter-sm">
    <q-editor
      dark
      v-model="editor"
      :definitions="{
        save: {
          tip: 'Save task',
          icon: 'save',
          label: 'Save',
          handler: saveWork
        },
        upload: {
          tip: 'Upload to cloud',
          icon: 'cloud_upload',
          label: 'Upload',
          handler: uploadIt
        }
      }"
      :toolbar="[
        ['bold', 'italic', 'strike', 'underline'],
        ['upload', 'save']
      ]"
    />

    <q-card dark flat bordered>
      <q-card-section v-html="editor" />
    </q-card>
  </div>
</template>

<script>
export default {
  name: 'PageIndex',
  data() {
    return {
      editor: ''
    }
  },
  methods: {
    saveWork () {
      this.$q.notify({
        message: 'Saved your text to local storage',
        color: 'white',
        textColor: 'green-9',
        icon: 'cloud_done'
      })
    },
    uploadIt () {
      this.$q.notify({
        message: 'Server unavailable. Check connectivity.',
        color: 'red-5',
        textColor: 'white',
        icon: 'warning'
      })
    }
  }
}
</script>

<style lang="sass">
.q-editor, .q-card
  color: $green-12

body
  background-color: #282830
</style>
