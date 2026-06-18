import { defineStore } from "pinia";

export const useTripStore = defineStore("trip", {
  state: () => ({
    participants: [],
    expenses: [],
  }),

  actions: {
    save() {
      localStorage.setItem(
        "travel-splitter",
        JSON.stringify({
          participants: this.participants,
          expenses: this.expenses,
        }),
      );
    },

    load() {
      const data = localStorage.getItem("travel-splitter");

      if (!data) return;

      const parsed = JSON.parse(data);

      this.participants = parsed.participants || [];
      this.expenses = parsed.expenses || [];
    },

    addParticipant(name) {
      this.participants.push({
        id: Date.now(),
        name,
      });

      this.save();
    },

    removeParticipant(id) {
      this.participants = this.participants.filter((p) => p.id !== id);

      this.save();
    },

    addExpense(expense) {
      this.expenses.push({
        id: Date.now(),
        ...expense,
      });

      this.save();
    },
  },
});
