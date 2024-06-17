<template>
  <div v-if="isOpen" class="modal-overlay">
    <div class="modal">
			<div class="main-modal">
				<h2>Imagen seleccionada</h2>
				<div class="close-modal" @click="closeModal" >
					<i class="fa fa-close icon-size-back"></i>
				</div>
			</div>
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ShowImageModal',
  props: {
    isOpen: {
      type: Boolean,
      default: false
    }
  },
  emits: ['close'],
  setup(_,{ emit }) {
    const closeModal = () => {
      emit('close');
    };

    return {
      closeModal,
    };
  },
});
</script>

<style scoped lang="scss">
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background: white;
  padding: 20px;
  border-radius: 5px;
	width: 80%;
  max-width: 800px;
	.main-modal {
		display: flex;
		width: 100%;
		justify-content: space-between;
		align-content: center;
		.close-modal {
			cursor: pointer;
			background-color: #aaa;
			height: 50px;
			width: 50px;
			border-radius: 50%;
			display: flex;
			align-content: center;
			justify-content: center;
			flex-wrap: wrap;
			.icon-size-back {
				font-size: 25px;
			}
		}

		h2 {
			margin: 0;
		}
	}
}
</style>