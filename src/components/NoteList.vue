<template>
  <!-- Note Card Wrapper -->
  <div class="note-container">
    <!-- Note Header inside the card -->
    <div class="note-header">
      <h3>Notes 📜</h3>
      <div class="header-actions">
        <button class="add-btn" @click="showForm">
          <span class="add-icon">➕</span>
        </button>

        <button class="logout-btn" @click="logoutUser">
          logout
        </button>
      </div>

    </div>

    <!-- Notes List -->
    <div v-if="notes.length" class="note-list">
      <div v-for="note in notes" :key="note.id" class="note-box">
        <div class="note-card">
          <h4>{{ note.title }}</h4>
          <p>{{ note.content }}</p>
          <div class="note-actions">
            <i class="fas fa-edit" @click="openEditModal(note)" title="Edit"></i>
            <i class="fas fa-trash" @click="deleteNotes(note.id)" title="Delete"></i>
          </div>
        </div>
      </div>
    </div>
    <div v-else> just create a note to catch your thought 🤪</div>
    <!-- <div v-if="gettingNotes" class="spinner-container">
      <div class="spinner"></div>
    </div> -->
  </div>

  <!-- Edit modal -->
  <div class="modal" v-if="showEditModal"  @click.self="closeEditModal">
    <div class="modal-content">
      <h2>Edit Note</h2>
      <input v-model="currentNote.title" type="text" placeholder="Edit title">
      <textarea v-model="currentNote.content" placeholder="Edit content"></textarea>
      <div class="modal-actions">
        <button @click="updatingNote(currentNote.id)" class="save">Save</button>
        <button @click="closeEditModal" class="cancel">Cancel</button>
      </div>
    </div>
  </div>
</template>


<script>

import { onMounted, ref } from 'vue';
import getNotes from '@/composables/getNotes';
import deleteNote from '@/composables/deleteNote'
import updateNotes from '@/composables/updateNotes';
import userLogout from '@/composables/userLogout';
import { auth } from '@/firebase';


export default {
  emits: ['showForm'],
  setup(props, { emit }) { 

    let userId = ref(null); 
    let user = auth.currentUser;
    userId.value = user.uid;

    let showEditModal = ref(false);
    let currentNote = ref({ title: '', content: '', id: '' });

    let { updateNote } = updateNotes();
    let { notes, gettingNotes } = getNotes(userId.value);
    let { error, deletingNote } = deleteNote();
    let {logout} = userLogout();


    onMounted(() => {
      gettingNotes();
    });

    let deleteNotes = async (noteId) => {
      await deletingNote(noteId);
    };

    let openEditModal = (note) => {
      currentNote.value = { ...note };
      showEditModal.value = true;
    }

    let closeEditModal = () => {
      showEditModal.value = false;
    }

    let editNote = (noteId) => {
      console.log(`Edit note with id: ${noteId}`);
    };

    let updatingNote = async (noteId) => {
      try {
        // server update
        await updateNote(noteId, currentNote.value);
        // client refresh
        gettingNotes();
        closeEditModal();
      } catch (error) {
        console.log(error);
      }
    }

    let showForm = () => {
      emit("showForm");
    }

    let logoutUser = async() => {
      await logout();
    }
    return { notes, deleteNotes, error, editNote, openEditModal, showForm, showEditModal, currentNote, updatingNote, updateNote, closeEditModal, logoutUser };
  },
};
</script>


<style>
/* Spinner styles */
.spinner-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
}

.spinner {
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-left-color: var(--accent-color);
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  100% {
    transform: rotate(360deg);
  }
}

.note-container {
  max-width: 800px;
  margin: 4rem auto;
  padding: 20px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  background-color: #f9f9f9;
  /* Light background */
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.note-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1rem;
  margin-bottom: 2rem;
}

.note-container h3 {
  text-align: left;
  font-size: 24px;
  color: #333;
}


/* .add-btn {
    background-color: var(--accent-color);
    color: white;
    border: none;
    border-radius: 50%;
    padding: 8px;
    cursor: pointer;
    font-size: 1rem;
}

.add-icon {
    font-size: 24px;
} */


.note-list {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  /* justify-content: center; */
  flex-grow: 1;
  gap: 30px;
}

.note-box {
  flex: 1 1 calc(30% - 20px);
  max-width: calc(30% - 20px);
  width: 100%;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  border-radius: 8px;
  /* Rounded corners */
  transition: transform 0.3s;
}

.note-box:hover {
  transform: translateY(-5px);
  /* Slight lift effect on hover */
}

.note-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 200px;
  padding: 20px;
  background-color: #fff;
  /* White background for the card */
  border-radius: 8px;
  /* Rounded corners */
  transition: box-shadow 0.3s;
}

.note-card:hover {
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  /* Shadow on hover */
}

.note-card h4 {
  margin: 0;
  font-size: 18px;
  font-weight: bold;
  color: #4A4A4A;
  /* Dark gray for titles */
}

.note-card p {
  margin: 15px 0;
  flex-grow: 1;
  overflow-y: auto;
  color: #555;
  /* Medium gray for content */
}

.note-card p::-webkit-scrollbar {
  width: 5px;
}

.note-card p::-webkit-scrollbar-thumb {
  background-color: var(--accent-color);
  border-radius: 10px;
}

.note-actions {
  display: flex;
  justify-content: flex-end;
  gap: 15px;
}

.note-actions i {
  cursor: pointer;
  font-size: 18px;
  color: var(--accent-color);
  transition: color 0.3s;
}

.note-actions i:hover {
  color: #ff0000;
  /* Red on hover for delete */
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: white;
  display: flex;
  flex-direction: column;
  padding: 20px;
  border-radius: 8px;
  gap: 10px;
  width: 400px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  /* Shadow for modal */
}

.modal-content input,
.modal-content textarea {
  padding: 10px;
  border: 1px solid #ccc;
  /* Light border for input fields */
  border-radius: 5px;
  font-size: 16px;
  transition: border-color 0.3s;
}

.modal-content input:focus,
.modal-content textarea:focus {
  border-color: var(--accent-color);
  /* Highlight on focus */
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

button {
  padding: 8px 15px;
  font-size: 16px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s;
}

.save {
  background-color: var(--accent-color);
  color: white;
}

.save:hover {
  background-color: #0056b3;
  /* Darker shade for hover */
}

.cancel {
  background-color: #f44336;
  color: white;
}

.cancel:hover {
  background-color: #d32f2f;
  /* Darker shade for hover */
}

.add-btn {
  background-color: var(--accent-color);
  color: white;
  border: none;
  border-radius: 50%;
  padding: 8px;
  cursor: pointer;
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.add-icon {
  font-size: 20px;
}


/* Responsive styles */
@media (max-width: 1200px) {
  .note-box {
    flex: 1 1 calc(45% - 20px);
    max-width: calc(45% - 20px);
  }
}

@media (max-width: 768px) {
  .note-box {
    flex: 1 1 calc(100% - 20px);
    max-width: calc(100% - 20px);
  }

  .modal-content {
    width: 90%;
  }
}

@media (max-width: 500px) {
  .note-container {
    padding: 10px;
    margin: 5px auto;
  }

  .note-list {
    flex-direction: column;
    gap: 15px;
  }

  .note-box {
    flex: 1 1 100%;
    width: 100%;
  }

  .modal-content {
    width: 85%;
    padding: 15px;
  }

  .modal-actions {
    flex-direction: column;
    gap: 10px;
  }

  button {
    width: 100%;
    padding: 10px;
  }
}
.header-actions {
  display: flex;
  align-items: center;
  gap: 15px;
}

.add-btn {
  background-color: var(--accent-color);
  color: white;
  border: none;
  border-radius: 50%;
  padding: 6px;
  cursor: pointer;
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.add-icon {
  font-size: 18px;
}

.logout-btn {
  background-color: crimson;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 8px 12px;
  cursor: pointer;
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.logout-icon {
  font-size: 20px;
  margin-right: 5px;
}

.logout-btn:hover {
  background-color: #d32f2f;
}

</style>
