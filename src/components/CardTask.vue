<template>
  <div class="q-pa-md q-gutter-sm">
    <q-card
      class="row q-pa-md q-gutter-sm"
      dark
      flat
      bordered
      v-for="(item, index) in tasks"
      :key="index"
    >
      <q-toggle @click="item.state = !item.state" v-model="item.state" color="green" />
      <q-card-section :class="item.state ? 'through' : ''" class="col" v-html="item.title" />

      <q-btn class="q-pa-xs" rounded color="primary" @click="edit(index, item.id)">Edit</q-btn>
      <q-btn class="q-pa-xs" rounded color="red" @click="clean(index, item.id)">Delete</q-btn>
    </q-card>
  </div>
</template>

<script>
import Index from "pages/Index.vue";
import { db } from "boot/firebase";
export default {
  components: {},
  name: "CardTask",
  props: ["tasks"],
  data() {
    return {
      editor: '',
      state: false,
      index: null,
      modoEdicion: false,
      id: null
    };
  },
  created() {
    this.listTasks();
  },
  methods: {
    async listTasks() {
      try {
        const resDb = await db.collection("Tasks").get();
        resDb.forEach((res) => {
          const task = {
            id: res.id,
            title: res.data().title,
            state: res.data().state,
          };
          this.tasks.push(task);
        });
      } catch (error) {
        console.log(error);
      }
    },
    clean(index, id) {
      this.$q
        .dialog({
          dark: true,
          title: "Confirm",
          message: "Are you sure you want to delete?",
          color: "warning",
          cancel: true,
          persistent: true,
        })
        .onOk(async () => {
          try {

            db.collection('Tasks').doc(id).delete();
            this.$q.notify({
              message: "Delete task",
              color: "red",
              textColor: "white",
              icon: "cloud_done",
            });
          } catch (error) {
            console.log(error);
          }

          this.tasks.splice(index, 1);
        });
    },
    edit(index, id) {
      this.modoEdicion = true;
      this.index = index;
      this.id = id;
      this.editor = this.tasks[index].title;
    },
  },
};
</script>

<style lang="sass">
.q-item
  color: $green-12

.bg-dark
  background: #282830
</style>
