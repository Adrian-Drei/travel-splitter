<script setup>
import { ref } from "vue";
import { useTripStore } from "../stores/tripStore";

const store = useTripStore();

const name = ref("");

function addParticipant() {
  if (!name.value.trim()) return;

  store.addParticipant(name.value);

  name.value = "";
}
</script>

<template>
  <div class="space-y-5">
    <h2 class="text-2xl font-bold text-gray-800">Add Participants</h2>

    <div class="flex gap-3">
      <input
        v-model="name"
        placeholder="Participant name"
        class="flex-1 rounded-lg border border-gray-300 px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
      />

      <button
        @click="addParticipant"
        class="rounded-lg bg-blue-600 px-5 py-2 font-semibold text-white hover:bg-blue-700 transition"
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
          @click="store.removeParticipant(person.id)"
          class="rounded-md bg-red-100 px-3 py-1 text-sm font-semibold text-red-600 hover:bg-red-200"
        >
          Remove
        </button>
      </li>
    </ul>
  </div>
</template>
