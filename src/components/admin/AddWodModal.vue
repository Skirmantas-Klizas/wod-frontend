<template>
  <div class="add-book">
    <button @click="isOpen = !isOpen" class="add-book__button btn" type="button">Add wod</button>
    <transition name="my-modal">
      <div v-if="this.isOpen">
        <div class="overlay" @click.self="isOpen = !isOpen">
          <div class="my-modal">
            <h2 class="my-modal__heading">ADD WOD</h2>
            <form @submit.prevent="handleSubmit" class="add-book__form form-group">
              <label class="form-group__label" for="title">Title</label>
              <input
                v-model="wod.title"
                class="form-group__input form-control"
                type="text"
                id="title"
                :class="{ 'is-invalid': submitted && !wod.title }"
              />
              <small
                v-show="submitted && !wod.title"
                class="form-group__error form-text"
                id="wodError"
              >Incorrect Title</small>

              <label class="form-group__label" for="type">Type</label>
              <div class="form-group__select col-md-4">
                <select v-model="wod.type" id="type" class="form-control">
                  <option selected>Cardio</option>
                  <option>Weightlifting</option>
                  <option>Powerlifting</option>
                  <option>Gymnastics</option>
                </select>
              </div>
              <small
                v-show="submitted && !wod.type"
                class="form-group__error form-text"
                id="typeError"
              >Incorrect Type</small>

              <label class="form-group__label" for="difficulty">Difficulty</label>
              <div class="form-group__select col-md-4">
                <select v-model="wod.difficulty" id="difficulty" class="form-control">
                  <option selected>Beginner</option>
                  <option>Intermediate</option>
                  <option>Advanced</option>
                </select>
              </div>
              <small
                v-show="submitted && !wod.difficulty"
                class="form-group__error form-text"
                id="difficultyError"
              >Incorrect difficulty</small>

              <label class="form-group__label" for="workout">Workout</label>
              <input
                v-model="wod.workout"
                class="form-group__input form-control"
                type="text"
                id="workout"
                :class="{ 'is-invalid': submitted && !wod.workout }"
              />
              <small
                v-show="submitted && !wod.workout"
                class="form-group__error form-text"
                id="workoutError"
              >Incorrect Workout</small>

              <label class="form-group__label" for="exmaple">Has Image</label>
              <div class="form-group__radio">
                <div class="custom-control custom-radio custom-control-inline">
                  <input
                    type="radio"
                    id="true"
                    name="exmaple"
                    class="custom-control-input"
                    value="true"
                    v-model="hasImage"
                  />
                  <label class="custom-control-label" for="true">Yes</label>
                </div>
                <div class="custom-control custom-radio custom-control-inline">
                  <input
                    type="radio"
                    id="false"
                    name="exmaple"
                    class="custom-control-input"
                    value="false"
                    v-model="hasImage"
                  />
                  <label class="custom-control-label" for="false">No</label>
                </div>
              </div>
              <div v-if="hasImage === 'true'">
                <label class="form-group__label" for="exmaple">Image</label>
                <input
                  v-if="hasImage === 'true'"
                  v-model="wod.example"
                  class="form-group__input form-control"
                  type="text"
                  id="exmaple"
                  :class="{ 'is-invalid': submitted && !wod.example }"
                />
                <small
                  v-if="hasImage === 'true'"
                  v-show="submitted && !wod.exmaple"
                  class="form-group__error form-text"
                  id="fileError"
                >Incorrect File</small>
              </div>
              <div class="form-group__buttons">
                <input class="form-group__button btn" type="submit" value="Add Wod" />
                <button
                  class="form-group__button btn"
                  @click="isOpen = !isOpen"
                  type="button"
                >Cancel</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
export default {
  computed: {
    ...mapState("users", ["all"])
  },
  data() {
    return {
      wod: {
        title: "",
        type: "",
        difficulty: "",
        workout: "",
        example: ""
      },
      hasImage: false,
      submitted: false,
      isOpen: false
    };
  },
  methods: {
    ...mapActions("wods", ["postWod"]),
    handleSubmit(e) {
      this.submitted = true;
      if (
        this.wod.title &&
        this.wod.type &&
        this.wod.difficulty &&
        this.wod.workout
      ) {
        this.wod.example = this.wod.example
          ? `wodImages/${this.wod.example}.jpg`
          : "wodImages/placeholder.jpg";
        this.postWod(this.wod);
        this.isOpen = !this.isOpen;
      }
    }
  },
  props: ["func"]
};
</script>

<style lang="scss" scoped>
.add-book {
  &__button {
    background: $color-nude !important;
    border: 2px solid $color-storm;
    margin: 0 0 10px 0;
    max-width: 320px;
    text-transform: uppercase;
    width: 100%;
    &:focus,
    &:hover {
      background: darken($color-nude, 10) !important;
      color: black !important;
    }
  }
  &__form {
    display: flex;
    flex-direction: column;
  }
}
.form-group {
  &__radio {
    padding: 7px 0;
  }

  &__select {
    padding: 7px 0;
  }
}
</style>