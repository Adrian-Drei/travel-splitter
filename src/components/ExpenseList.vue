<script setup>
import { ref } from "vue";
import { useTripStore } from "../stores/tripStore";

const store = useTripStore();

const expenseToDelete = ref(null);

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

function confirmDelete(expense) {
  expenseToDelete.value = expense;
}

function deleteExpense() {
  if (!expenseToDelete.value) return;

  store.removeExpense(expenseToDelete.value.id);
  expenseToDelete.value = null;
}

function cancelDelete() {
  expenseToDelete.value = null;
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

        <div class="flex items-center gap-3">
          <span
            class="rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-700"
          >
            ₱{{ expense.amount }}
          </span>

          <button
            @click="confirmDelete(expense)"
            class="rounded-lg bg-red-100 px-3 py-1 text-sm font-semibold text-red-600 hover:bg-red-200"
          >
            Delete
          </button>
        </div>
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

  <!-- Delete Confirmation Modal -->
  <div
    v-if="expenseToDelete"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
  >
    <div class="w-96 rounded-xl bg-white p-6 shadow-xl">
      <h3 class="text-lg font-bold text-gray-800">Delete Expense?</h3>

      <p class="mt-2 text-gray-600">
        Are you sure you want to delete
        <span class="font-semibold">"{{ expenseToDelete.description }}"</span>
        ?
      </p>

      <div class="mt-6 flex justify-end gap-3">
        <button
          @click="cancelDelete"
          class="rounded-lg bg-gray-100 px-4 py-2 font-semibold text-gray-700 hover:bg-gray-200"
        >
          Cancel
        </button>

        <button
          @click="deleteExpense"
          class="rounded-lg bg-red-600 px-4 py-2 font-semibold text-white hover:bg-red-700"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
</template>
