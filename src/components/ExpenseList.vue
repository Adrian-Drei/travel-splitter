<script setup>
import { useTripStore } from "../stores/tripStore";

const store = useTripStore();

function getPersonName(id) {
  return store.participants.find((p) => p.id === id)?.name ?? "Unknown";
}

function getContributors(expense) {
  return expense.contributors
    .map(
      (contributor) =>
        `${getPersonName(contributor.participantId)} (₱${contributor.amount})`,
    )
    .join(", ");
}

function getParticipants(expense) {
  return expense.participants.map((id) => getPersonName(id)).join(", ");
}
</script>

<template>
  <div class="space-y-6">
    <h2 class="text-2xl font-bold text-gray-800">Expenses</h2>

    <div
      v-if="!store.expenses.length"
      class="rounded-lg bg-gray-50 p-6 text-center text-gray-500"
    >
      No expenses added yet.
    </div>

    <div
      v-for="expense in store.expenses"
      :key="expense.id"
      class="rounded-xl border border-gray-200 bg-white p-5 shadow-sm space-y-3"
    >
      <div class="flex justify-between items-center">
        <h3 class="text-xl font-semibold text-gray-800">
          {{ expense.description }}
        </h3>

        <span
          class="rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-700"
        >
          ₱{{ expense.amount }}
        </span>
      </div>

      <div class="text-gray-600">
        <p>
          <span class="font-semibold">Paid By:</span>

          {{ getContributors(expense) }}
        </p>

        <p>
          <span class="font-semibold">Shared By:</span>

          {{ getParticipants(expense) }}
        </p>
      </div>
    </div>
  </div>
</template>
