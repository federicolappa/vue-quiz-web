<template>
  <form @submit.prevent="onSubmit">
    <h4
      :class="[
        'text-center rounded mb-4 py-2',
        [this.quiz ? 'bg-success' : 'bg-primary'],
      ]"
      style="color: #f6f9fc"
    >
      {{ this.quiz ? "Sửa Bộ Câu Hỏi" : "Thêm Bộ Câu Hỏi Mới" }}
    </h4>
    <div class="pb-3 px-3">
      <div class="form-group">
        <div class="d-flex justify-content-between">
          <h4 class="text-capitalize">Tiêu Đề:</h4>
          <h5>{{ this.quiz ? this.quiz._id : "" }}</h5>
        </div>
        <input
          v-model="inputTitle"
          type="text"
          class="form-control form-control-sm"
          aria-describedby="helpId"
          placeholder="Nhập tiêu đề vào đây..."
          required
        />
      </div>
      <div class="form-group">
        <div class="d-flex justify-content-between">
          <h4 class="text-capitalize">Mô tả:</h4>
        </div>
        <textarea
          v-model="inputDesc"
          class="form-control"
          rows="5"
          placeholder="Nhập mô tả vào đây..."
        ></textarea>
      </div>
      <div class="d-flex justify-content-end">
        <button @click="onReset" type="button" class="btn btn-danger btn-sm">
          Reset
        </button>
        <button v-if="quiz" type="submit" class="btn btn-success btn-sm">
          Sửa Bộ Câu Hỏi
        </button>
        <button v-if="!quiz" type="submit" class="btn btn-primary btn-sm">
          Thêm Bộ Câu Hỏi
        </button>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  emits: ["onSetQuiz", "onActionQuiz"],
  props: ["quiz"],
  data() {
    return { inputTitle: "", inputDesc: "" };
  },
  watch: {
    quiz() {
      if (this.quiz === null) return;
      this.inputTitle = this.quiz.quiz_title;
      this.inputDesc = this.quiz.quiz_desc;
    },
  },
  methods: {
    reset() {
      this.inputTitle = "";
      this.inputDesc = "";
    },
    onReset() {
      this.reset();
      this.$emit("onSetQuiz", null);
    },
    onSubmit() {
      if (this.inputTitle.length === 0) return;
      const { inputTitle: quiz_title, inputDesc: quiz_desc } = this;
      this.$emit("onActionQuiz", { quiz_title, quiz_desc });
      this.reset();
    },
  },
};
</script>
