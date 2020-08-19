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
    <!-- <q-card class="row q-pa-md q-gutter-sm"
      dark flat bordered v-for="(item, index) in tasks" :key="index">
      <q-toggle
        @click="green = !green"
        v-model="green"
        color="green"
      />
      <q-card-section
        :class="item.state ? 'through' : ''"
        class="col"
        v-html="item.title" />


      <q-btn class="q-pa-xs"
        rounded color="primary"
        @click="item.state = !item.state">Edit</q-btn>
      <q-btn class="q-pa-xs"
        rounded color="red"
        @click="clean(index)">Delete</q-btn>
    </q-card> -->

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
  created(){
    this.listTasks();
  },
  methods: {
    async listTasks(){
      try {
        const resDb = await db.collection('Tasks').get();
        resDb.forEach(res => {
          debugger
          const task = {
            id: res.id,
            title: res.data().title,
            state: res.data().state
          }
          this.tasks.push(task);
        });
      } catch (error) {
        console.log(error);
      }
    },
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
    clean(index) {
      this.$q.dialog({
        dark: true,
        title: 'Confirm',
        message: 'Are you sure you want to delete?',
        color: 'warning',
        cancel: true,
        persistent: true
      }).onOk(() => {
        this.$q.notify({
        message: 'Delete task',
        color: 'red',
        textColor: 'white',
        icon: 'cloud_done'
      })
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

.text-amber
  color: $green-12

.q-editor
  color: $green-12

body
  background-color: #282830
.through
  text-decoration: line-through
</style>
