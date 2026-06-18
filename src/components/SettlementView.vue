<script setup>
import { computed } from "vue";
import { useTripStore } from "../stores/tripStore";

const store = useTripStore();

const balances = computed(() => {
  const result = {};

  // initialize everyone
  store.participants.forEach((person) => {
    result[person.id] = 0;
  });

  store.expenses.forEach((expense) => {
    // how much each person owes
    const share = expense.amount / expense.participants.length;

    // subtract everyone's share
    expense.participants.forEach((personId) => {
      result[personId] -= share;
    });

    // add money back to people who paid
    expense.contributors.forEach((contributor) => {
      result[contributor.participantId] += contributor.amount;
    });
  });

  return result;
});

function getName(id) {
  return store.participants.find((p) => p.id === id)?.name;
}
</script>

<template>
  <div class="space-y-6">
    <h2 class="text-2xl font-bold text-gray-800">Balances</h2>

    <div class="space-y-3">
      <div
        v-for="person in store.participants"
        :key="person.id"
        class="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
      >
        <span class="font-semibold text-gray-800">
          {{ getName(person.id) }}
        </span>

        <span
          class="rounded-full px-4 py-1 font-bold"
          :class="
            balances[person.id] >= 0
              ? 'bg-green-100 text-green-700'
              : 'bg-red-100 text-red-700'
          "
        >
          {{ balances[person.id] >= 0 ? "+" : "" }}
          ₱{{ balances[person.id].toFixed(2) }}
        </span>
      </div>
    </div>
  </div>
</template>
