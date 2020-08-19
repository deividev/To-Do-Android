<template>
  <div class="q-pa-md q-gutter-sm">

  <!-- Save -->
    <q-editor v-if="!modoEdicion"
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
  <!-- Edit -->
    <q-editor v-else
      dark
      v-model="editor"
      :definitions="{
        save: {
          tip: 'Update task',
          icon: 'update',
          label: 'Update',
          handler: updateWork
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
  props:['index, modoEdicion, id, editor'],
  data() {
    return {
      editor: '',
      tasks: [],
      index: null,
      modoEdicion: false,
      id: null
    }
  },
  methods: {
    async updateWork() {
      console.log(editar);
    },
    async saveWork () {
      try {

        const resDb = await db. collection('Tasks').add({
          title: this.editor,
          state: false
        })
        this.tasks.push({
          title: this.editor,
          state: false,
          id: resDb.id
        })
        this.editor = '';
        this.$q.notify({
          message: 'Saved task',
          color: 'green-8',
          textColor: 'white',
          icon: 'cloud_done'
        })

      } catch (error) {
        console.log(error);
      }

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
