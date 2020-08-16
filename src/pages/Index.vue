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
        ['save']
      ]"
    />

    <q-card class="row"
      dark flat bordered v-for="(item, index) in tasks" :key="index">
      <q-card-section
        :class="item.state ? 'through' : ''"
        class="col"
        v-html="item.title" />
      <q-btn
        color="green-6"
        @click="item.state = !item.state">Complete</q-btn>
      <q-btn
        color="red">Delete</q-btn>
    </q-card>
  </div>
</template>

<script>
export default {
  name: 'PageIndex',
  data() {
    return {
      editor: '',
      tasks: [
        {title: 'Tarea1', state: false},
        {title: 'Tarea2', state: false},
        {title: 'Tarea3', state: true},
      ]
    }
  },
  methods: {
    saveWork () {
      this.tasks.push({
        title: this.editor,
        state: false,
      })
      this.$q.notify({
        message: 'Saved task',
        color: 'green-8',
        textColor: 'white',
        icon: 'cloud_done'
      })
    },
  }
}
</script>

<style lang="sass">
.q-editor, .q-card
  color: $green-12

body
  background-color: #282830

.through
  text-decoration: line-through
</style>
