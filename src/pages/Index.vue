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
        @click="clean(index)"
        color="red">Delete</q-btn>
    </q-card>

    <div class="flex flex-center text-white" v-if="tasks.length == 0">
      <h6>No tasks</h6>
    </div>

  </div>
</template>

<script>
export default {
  name: 'PageIndex',
  data() {
    return {
      editor: '',
      tasks: [
        // {title: 'Tarea1', state: false},
        // {title: 'Tarea2', state: false},
        // {title: 'Tarea3', state: true},
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
        color: 'green-6',
        textColor: 'white',
        icon: 'cloud_done'
      })
    },
    clean(index) {
      this.$q.dialog({
        dark: true,
        title: 'Confirm',
        message: 'Are you sure you want to delete?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        this.tasks.splice(index, 1)
      })
    }
  }
}
</script>

<style lang="sass">
.text-white
  color: white

.q-card
  color: white

.q-editor
  color: $green-12

body
  background-color: #282830

.through
  text-decoration: line-through
</style>
