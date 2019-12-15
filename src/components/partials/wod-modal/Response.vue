<template>
  <div class="review">
    <div class="review__content">
      <div class="review__heading">
        <p class="review__heading-text">{{ response.user.name }}</p>
        <div
          v-if="user._id === response.user._id || user.role === 'Administrator'"
          class="review__heading-controls"
        >
          <i @click="isOpen = !isOpen" class="review__heading-edit fas fa-pen"></i>
          <i class="review__heading-delete fas fa-trash-alt" @click="_delete()"></i>
        </div>
      </div>
      <p class="review__description">{{ response.comment }}</p>
    </div>
    <div class="review__edit">
      <form @submit.prevent="update" v-if="isOpen" class="review__edit-form">
        <div class>
          <div class="form-group__radio">
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
          <div class>
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
        <div class="review__edit-controls">
          <input class="review__edit-button btn" type="submit" value="Edit response" />
          <button class="review__edit-button btn" type="btn" @click="isOpen = !isOpen">Cancel</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
export default {
  computed: {
    ...mapState({
      wods: state => state.wods.wods,
      user: state => state.account.user
    })
  },
  data() {
    return {
      isOpen: false,
      submitted: false
    };
  },
  methods: {
    ...mapActions("wods", ["updateResponse", "deleteResponse"]),
    update(e) {
      this.submitted = true;
      const editResponse = {
        _id: this.response._id,
        adjustments: this.response.adjustments,
        comment: this.response.comment
      };
      if (editResponse.adjustments && editResponse.comment) {
        this.updateResponse({ wod: this.response.wod, response: editResponse });
        this.isOpen = !this.isOpen;
      }
    },
    _delete(e) {
      const { wod, _id } = this.response;
      this.deleteResponse({ wod, _id });
    }
  },
  props: ["response"]
};
</script>

<style lang="scss">
.review {
  background-color: lighten($color-moon, 10);
  display: flex;
  flex-direction: column;
  width: 100%;
  &__content {
    border-bottom: 1px solid black;
    padding: 5px 10px;
  }
  &__description {
    font-size: 14px;
    margin: 6px 0;
  }
  &__edit {
    display: flex;
    background: white;
    justify-content: center;
  }
  &__edit-button {
    background-color: $color-nude;
    margin: 10px 0;
    text-transform: uppercase;
    width: 45%;
    &:focus,
    &:hover {
      background-color: darken($color-nude, 10);
    }
  }
  &__edit-controls {
    display: flex;
    justify-content: space-between;
  }
  &__edit-form {
    width: 90%;
  }
  &__heading {
    display: flex;
    flex-direction: row;
  }
  &__heading-text {
    font-family: $Roboto;
    margin: 0 12px 8px 0;
    text-transform: uppercase;
    &:last-of-type {
      font-weight: 600;
    }
  }
  &__heading-controls {
    margin-left: auto;
  }
  &__heading-edit {
    margin-right: 10px;
    &:hover {
      color: $color-leather;
      cursor: pointer;
    }
  }
  &__heading-delete {
    &:hover {
      color: $color-leather;
      cursor: pointer;
    }
  }
}
</style>