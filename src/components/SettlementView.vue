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
  <div>
    <h2>Balances</h2>

    <div v-for="person in store.participants" :key="person.id">
      {{ getName(person.id) }}

      :

      <strong>₱{{ balances[person.id].toFixed(2) }}</strong>
    </div>
  </div>
</template>
