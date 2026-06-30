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
const totalPaid = computed(() => {
  const result = {};

  // Initialize everyone
  store.participants.forEach((person) => {
    result[person.id] = 0;
  });

  // Sum contributions
  store.expenses.forEach((expense) => {
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
        <!-- Left -->
        <div>
          <h3 class="font-semibold text-gray-800">
            {{ getName(person.id) }}
          </h3>

          <p class="mt-1 text-sm text-gray-500">
            Total Paid:
            <span class="font-semibold text-gray-700">
              ₱{{ totalPaid[person.id].toFixed(2) }}
            </span>
          </p>
        </div>

        <!-- Right -->
        <div class="text-right">
          <span
            class="inline-flex rounded-full px-4 py-1 font-bold"
            :class="
              balances[person.id] >= 0
                ? 'bg-green-100 text-green-700'
                : 'bg-red-100 text-red-700'
            "
          >
            {{ balances[person.id] >= 0 ? "+" : "" }}
            ₱{{ balances[person.id].toFixed(2) }}
          </span>

          <p class="mt-1 text-xs text-gray-500">
            {{ balances[person.id] >= 0 ? "Gets back" : "Owes" }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
