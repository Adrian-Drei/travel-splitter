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
  <div class="space-y-6">
    <h2 class="text-2xl font-bold text-gray-800">Settlement</h2>

    <div
      v-if="!settlements.length"
      class="rounded-xl bg-green-50 p-5 text-center font-medium text-green-700"
    >
      🎉 No payments needed
    </div>

    <div
      v-for="item in settlements"
      :key="item.from + '-' + item.to"
      class="rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
    >
      <div class="flex items-center justify-between gap-3">
        <div class="text-gray-700">
          <span class="font-bold text-gray-900">
            {{ getName(item.from) }}
          </span>

          <span class="mx-2">pays</span>

          <span class="font-bold text-gray-900">
            {{ getName(item.to) }}
          </span>
        </div>

        <span class="rounded-full bg-red-100 px-4 py-1 font-bold text-red-700">
          ₱{{ item.amount.toFixed(2) }}
        </span>
      </div>
    </div>
  </div>
</template>
