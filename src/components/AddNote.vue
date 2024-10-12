<template>
    <!-- <div>
        <button class="add-btn" @click="showForm = true">
            <span class="add-icon">➕</span>
        </button>
    </div> -->
    <div v-if="showModal" class="modal-overlay" @click.self="closeForm">
        <div class="modal-content">
            <form @submit.prevent="add" class="noteForm">
                <div>
                    <input type="text" placeholder="Note Title" v-model="title">
                </div>
                <div>
                    <textarea cols="30" rows="10" placeholder="Note Content" v-model="content"></textarea>
                </div>
                <div class="modal-actions">
                    <button type="submit" class="save">Add Note</button>
                    <button @click="closeForm" class="cancel">Cancel</button>
                </div>
            </form>
        </div>
    </div>

    <p style="color:crimson">{{ error }}</p>
</template>

<script>
import { ref } from 'vue';
import { auth } from '@/firebase';
import addNote from '@/composables/addNote';
export default {
    props: ['showModal'],
    emits: ['close'],

    setup(props, { emit }) {
        let title = ref("");
        let content = ref("");
        let user = ref(null);
        // let showForm = ref(false);

        auth.onAuthStateChanged(currentUser => {
            if (currentUser) {
                user.value = currentUser;
            } else {
                user.value = null;
            }
        });

        let { addingNote, error } = addNote();
        let add = async () => {
            await addingNote(title.value, content.value, user.value.uid, user.value.email);
            title.value = "";
            content.value = "";
            closeForm();
        }
        let closeForm = () => {
            emit('close');
        };
        return { title, content, add, error, closeForm }
    }
}
</script>

<style>
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal-content {
    background-color: white;
    padding: 20px;
    border-radius: 10px;
    width: 90%;
    max-width: 500px;
}

form {
    width: 100%;
    margin: 20px 0 5px 0;
}

form input,
textarea {
    box-sizing: border-box;
    flex-grow: 1;
    min-width: 0;
    height: 50px;
    padding: 1em;
    font: inherit;
    border-radius: 10px;
    border: 2px solid var(--input-color);
    background-color: var(--input-color);
    transition: 150ms ease;
}

textarea {
    height: 200px;
}

form input:hover {
    border-color: var(--accent-color);
}

form input:focus {
    outline: none;
    border-color: var(--text-color);
}


@media(max-width: 500px) {
    button {
        font-size: 12px;
        padding: 4px 10px;
    }



    .add-icon {
        font-size: 18px;
    }

    .modal-overlay {
        width: 80vw;
        height: 100vh;
        padding: 2rem;
    }

    .modal-content {
        padding: 20px;
        border-radius: 10px;
        width: 100%;
        max-width: auto;
    }
}
.save, .cancel {
    padding: 10px 15px;
    font-size: 12px;
    border-radius: 4px;
}

</style>