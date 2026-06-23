document.addEventListener('alpine:init', () => {
  Alpine.data('questionApp', () => ({
    questions: [],
    shownIds: [],
    generating: false,
    modalOpen: false,
    modalType: null,
    currentQuestion: null,
    loadError: null,

    async init() {
      try {
        const base =
          document.querySelector('meta[name="asset-base"]')?.content ?? '';
        const response = await fetch(`${base}data/questions.json`);
        if (!response.ok) throw new Error('Failed to load questions');
        const data = await response.json();
        this.questions = data.questions ?? [];
      } catch {
        this.loadError = 'Не вдалося завантажити питання';
      }
    },

    get remainingQuestions() {
      return this.questions.filter((q) => !this.shownIds.includes(q.id));
    },

    async generate() {
      if (this.generating || this.modalOpen || this.loadError) return;

      this.generating = true;
      await new Promise((resolve) => setTimeout(resolve, 900));

      const remaining = this.remainingQuestions;

      if (remaining.length === 0) {
        this.modalType = 'exhausted';
        this.currentQuestion = null;
      } else {
        const index = Math.floor(Math.random() * remaining.length);
        const question = remaining[index];
        this.shownIds.push(question.id);
        this.currentQuestion = question;
        this.modalType = 'question';
      }

      this.modalOpen = true;
      this.generating = false;
    },

    closeModal() {
      this.modalOpen = false;
    },
  }));
});
