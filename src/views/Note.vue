<template>
  <div>
    <AddNote :showModal="showModal" @close="showModal=false"></AddNote>
    <NoteList @showForm="showForm"></NoteList>
  </div>
</template>

<script>

import NoteList from '../components/NoteList'
import AddNote from '../components/AddNote';
import { ref } from 'vue';
// import { ref } from 'vue';

export default {
  components: {
    NoteList,
     AddNote 
    },
 setup(){
  let showModal = ref(false);
  let showForm = () => {
    showModal.value = true;
  }
  return { showForm, showModal }
 }
}
</script>

<style>
</style>
