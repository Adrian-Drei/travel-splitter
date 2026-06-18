<script setup>
import { computed } from "vue";
import { useTripStore } from "../stores/tripStore";

const store = useTripStore();

function getName(id) {
  return store.participants.find((p) => p.id === id)?.name;
}

const balances = computed(() => {
  const result = {};

  store.participants.forEach((person) => {
    result[person.id] = 0;
  });

  store.expenses.forEach((expense) => {
    const share = expense.amount / expense.participants.length;

    expense.participants.forEach((id) => {
      result[id] -= share;
    });

    expense.contributors.forEach((c) => {
      result[c.participantId] += c.amount;
    });
  });

  return result;
});

const settlements = computed(() => {
  const debtors = [];
  const creditors = [];

  Object.entries(balances.value).forEach(([id, amount]) => {
    if (amount < -0.01) {
      debtors.push({
        id: Number(id),
        amount: -amount,
      });
    }

    if (amount > 0.01) {
      creditors.push({
        id: Number(id),
        amount,
      });
    }
  });

  const result = [];

  let d = 0;
  let c = 0;

  while (d < debtors.length && c < creditors.length) {
    const debtor = debtors[d];
    const creditor = creditors[c];

    const amount = Math.min(debtor.amount, creditor.amount);

    result.push({
      from: debtor.id,

      to: creditor.id,

      amount,
    });

    debtor.amount -= amount;
    creditor.amount -= amount;

    if (debtor.amount <= 0.01) {
      d++;
    }

    if (creditor.amount <= 0.01) {
      c++;
    }
  }

  return result;
});
</script>

<template>
  <div>
    <h2>Settlement</h2>

    <div v-if="!settlements.length">No payments needed</div>

    <div v-for="item in settlements" :key="item.from + '-' + item.to">
      <strong>
        {{ getName(item.from) }}
      </strong>

      pays

      <strong>
        {{ getName(item.to) }}
      </strong>

      ₱{{ item.amount.toFixed(2) }}
    </div>
  </div>
</template>
