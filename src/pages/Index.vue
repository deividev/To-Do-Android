<template>
  <div class="q-pa-md q-gutter-sm">
    <q-editor dark v-model="editor" min-height="5rem" />

    <q-card dark flat bordered>
      <q-card-section>
        <pre style="white-space: pre-line">{{ editor }}</pre>
      </q-card-section>
    </q-card>

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
  }
}
</script>

