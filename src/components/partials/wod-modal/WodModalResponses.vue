<template>
  <div class="modal-responses">
    <button
      v-if="role === 'Administrator' || role === 'User'"
      class="modal-responses__button btn"
      @click="isOpen = !isOpen"
    >{{ !isOpen ? 'Add response' : 'Cancel' }}</button>
    <form @submit.prevent="handleSubmit" v-if="isOpen" class="modal-responses__add-form">
      <div class="response_form-group__radio">
        <div class="custom-control custom-radio custom-control-inline">
          <input
            type="radio"
            id="rx"
            name="adjustments"
            class="custom-control-input"
            value="Rx"
            v-model="response.adjustments"
          />
          <label class="custom-control-label" for="rx">Rx</label>
        </div>
        <div class="custom-control custom-radio custom-control-inline">
          <input
            type="radio"
            id="sc"
            name="adjustments"
            class="custom-control-input"
            value="Sc"
            v-model="response.adjustments"
          />
          <label class="custom-control-label" for="sc">Sc</label>
        </div>
      </div>
      <div class="modal-responses__form-inputs">
        <div class="modal-responses__input-group">
          <label class="form-group__label" for="comment">Comment</label>
          <input
            :class="{ 'is-invalid': submitted && !response.comment }"
            v-model="response.comment"
            class="form-group__input form-control"
            type="text"
            id="comment"
          />
          <small
            v-show="submitted && !response.comment"
            class="form-group__error form-text"
            id="commentError"
          >Incorrect Comment</small>
        </div>
      </div>
      <input class="modal-responses__button btn" type="submit" value="Add Response" />
    </form>
    <p v-if="wod.responses.length === 0">No responses</p>
    <div v-for="response in wod.responses" :key="response._id">
      <Response :response="response"></Response>
    </div>
  </div>
</template>

<script>
import Response from "./Response";
import { mapState, mapActions } from "vuex";
export default {
  computed: {
    ...mapState({
      wods: state => state.wods.wods
    })
  },
  components: {
    Response: Response
  },
  data() {
    return {
      response: {
        adjustments: "Rx",
        comment: "",
        wod: this.wod._id
      },
      submitted: false,
      isOpen: false
    };
  },
  methods: {
    ...mapActions("wods", ["postResponse"]),
    handleSubmit(e) {
      this.submitted = true;
      if (this.response.adjustments && this.response.comment) {
        this.postResponse(this.response);
        this.isOpen = !this.isOpen;
        this.submitted = false;
      }
    }
  },
  props: ["wod", "role"]
};
</script>

<style lang="scss" scoped>
.form-group {
  &__label,
  &__input {
    width: 100%;
  }
}
.modal-responses {
  overflow-y: auto;
  width: 100%;
  &__button {
    background-color: lighten(#858585b2, 15);
    border-radius: 0;
    text-transform: uppercase;
    width: 100%;
    &:focus,
    &:hover {
      background-color: darken($color-nude, 10);
    }
  }
  &__form-inputs {
    align-items: center;
    display: flex;
    justify-content: center;
    flex-direction: column;
    padding-bottom: 20px;
    width: 100%;
  }
  &__input-group {
    display: flex;
    flex-direction: column;
    width: 90%;
  }
  .response_form-group__radio {
    padding-left: 20px;
    padding-top: 15px;
  }
}
</style>