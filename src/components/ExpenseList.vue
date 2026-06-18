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
  <div>
    <h2>Expenses</h2>

    <div
      v-for="expense in store.expenses"
      :key="expense.id"
      style="border: 1px solid #ddd; padding: 12px; margin-bottom: 12px"
    >
      <h3>{{ expense.description }}</h3>

      <p>
        <strong>Amount:</strong>
        ₱{{ expense.amount }}
      </p>

      <p>
        <strong>Paid By:</strong>
        {{ getContributors(expense) }}
      </p>

      <p>
        <strong>Shared By:</strong>
        {{ getParticipants(expense) }}
      </p>
    </div>
  </div>
</template>
