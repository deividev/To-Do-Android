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
      }"
      :toolbar="[
        ['bold', 'italic', 'strike', 'underline'],
        ['save']
      ]"
    />
    <div>
      <CardTask :tasks="tasks"
      dark flat bordered
      ></CardTask>
    </div>
    <div class="flex flex-center text-white" v-if="tasks.length == 0">
      <h6>No tasks</h6>
    </div>
  </div>
</template>

<script>
import CardTask from "components/CardTask.vue";
import { db } from "boot/firebase";
export default {
  components: { CardTask },
  name: 'PageIndex',
  data() {
    return {
      editor: '',
      tasks: []
    }
  },
  methods: {
    saveWork () {
      this.tasks.push({
        title: this.editor,
        state: false,
      })
      this.editor = '';
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
.text-white
  color: white

.q-card
  color: white

.text-amber
  color: $green-12

.q-editor
  color: $green-12

body
  background-color: #282830
.through
  text-decoration: line-through
</style>
