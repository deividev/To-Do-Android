<template>
  <div class="q-pa-md q-gutter-sm">
    <q-card class="row q-pa-md q-gutter-sm"
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
    </q-card>
  </div>
</template>

<script>
import { db } from "boot/firebase";
export default {
  components: {},
  name: 'CardTask',
  data() {
    return {
      green: false,
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
.q-item
  color: $green-12

.bg-dark
  background: #282830
</style>
