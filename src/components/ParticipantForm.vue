<script setup>
import { ref } from "vue";
import { useTripStore } from "../stores/tripStore";

const store = useTripStore();

const name = ref("");

const showDeleteModal = ref(false);
const selectedParticipant = ref(null);

function addParticipant() {
  if (!name.value.trim()) return;

  store.addParticipant(name.value);

  name.value = "";
}

function confirmDelete(person) {
  selectedParticipant.value = person;
  showDeleteModal.value = true;
}

function deleteParticipant() {
  if (!selectedParticipant.value) return;

  store.removeParticipant(selectedParticipant.value.id);

  showDeleteModal.value = false;
  selectedParticipant.value = null;
}

function cancelDelete() {
  showDeleteModal.value = false;
  selectedParticipant.value = null;
}
</script>
<template>
  <div class="space-y-5">
    <h2 class="text-2xl font-bold text-gray-800">Add Participants</h2>

    <div class="flex flex-col gap-3 sm:flex-row">
      <input
        v-model="name"
        placeholder="Participant name"
        class="w-full flex-1 rounded-lg border border-gray-300 px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
      />

      <button
        @click="addParticipant"
        class="w-full rounded-lg bg-blue-600 px-5 py-2 font-semibold text-white transition hover:bg-blue-700 sm:w-auto"
      >
        Add
      </button>
    </div>

    <div
      v-if="!store.participants.length"
      class="rounded-lg bg-gray-50 p-4 text-center text-gray-500"
    >
      No participants yet.
    </div>

    <ul class="space-y-2">
      <li
        v-for="person in store.participants"
        :key="person.id"
        class="flex items-center justify-between rounded-lg bg-gray-50 px-4 py-3"
      >
        <span class="font-medium text-gray-800">
          {{ person.name }}
        </span>

        <button
          @click="confirmDelete(person)"
          class="rounded-md bg-red-100 px-3 py-1 text-sm font-semibold text-red-600 hover:bg-red-200"
        >
          Remove
        </button>
      </li>
    </ul>
  </div>

  <!-- Delete Modal -->

  <div
    v-if="showDeleteModal"
    class="fixed inset-0 flex items-center justify-center bg-black/40 px-4"
  >
    <div class="w-full max-w-sm rounded-xl bg-white p-6 shadow-xl space-y-5">
      <h3 class="text-xl font-bold text-gray-800">Remove Participant?</h3>

      <p class="text-gray-600">
        Are you sure you want to remove
        <strong>
          {{ selectedParticipant?.name }}
        </strong>
        ?
      </p>

      <div class="flex gap-3">
        <button
          @click="cancelDelete"
          class="flex-1 rounded-lg bg-gray-200 py-2 font-semibold text-gray-700"
        >
          Cancel
        </button>

        <button
          @click="deleteParticipant"
          class="flex-1 rounded-lg bg-red-600 py-2 font-semibold text-white"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
</template>
