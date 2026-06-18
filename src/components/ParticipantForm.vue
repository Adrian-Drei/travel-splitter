<script setup>
import { ref } from 'vue'
import { useTripStore } from '../stores/tripStore'

const store = useTripStore()

const name = ref('')

function addParticipant() {
    if (!name.value.trim()) return

    store.addParticipant(name.value)

    name.value = ''
}
</script>

<template>
    <div>
        <h2>Add Participants</h2>

        <input
            v-model="name"
            placeholder="Participant name"
        />

        <button @click="addParticipant">
            Add
        </button>

        <ul>
            <li
                v-for="person in store.participants"
                :key="person.id"
            >
                {{ person.name }}

                <button
                    @click="store.removeParticipant(person.id)"
                >
                    X
                </button>
            </li>
        </ul>
    </div>
</template>