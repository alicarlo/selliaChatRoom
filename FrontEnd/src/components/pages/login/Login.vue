<template>
	<div class="main">
		<div class="left" :class="{ 'show1': showRegisterForm }">
			<img class="img-login" src="/src/assets/imgs/login.png"/>
		</div>
		<div class="right" :class="{ 'show2': showRegisterForm }">
			<register 
				v-if="showRegisterForm"
				@backRegister="backRegister"
			/>
			<div class="login-box" v-if="!showRegisterForm">
				<div>
					<h2>Bienvenido!👋</h2>
					<h3>Inicia con tu cuenta</h3>

					<br><br>

					<h3 class="center-title">CHAT - ROOM</h3>
					<br>
					<form @submit.prevent="handleSubmit" class="input-box">
						<div class="input-group">
							<i class="fa fa-user icon-size"></i>
							<input type="text" v-model="auth.email.value" placeholder="Ingrese su email" :disabled="submitted">
						</div>
						<span class="error" v-if="errors.email">{{ errors.email }}</span>

		
						<div class="input-group">
							<i class="fa fa-lock icon-size"></i>
							<input type="password" v-model="auth.password.value" placeholder="Ingrese su contraseña" :disabled="submitted">
						</div>
						<span class="error" v-if="errors.password">{{ errors.password }}</span>

						<div>
							<button class="button-login" type="submit" :disabled="submitted">
									Iniciar
							</button>
						</div>

						<div>
							<button class="button-login" @click="toggleRegisterForm" :disabled="submitted">
								Registrarse
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>
</template>



<script lang="ts">
import { ref, reactive } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import Register from '../register/Register.vue';
import { authService } from '../../services/auth/auth';
import { IAuth } from '../../interfaces/IAuth';


export default  {
  name: 'Login',
	components: {
    Register,
  },
	setup() {
		const store = useStore();
		const router = useRouter();
		const showRegisterForm = ref(false);
		const auth = {
      email: ref(''),
      password: ref('')
		}

		const errors = reactive({
			email: '',
      password: '',
    });
		const submitted = ref(false);

		const handleSubmit = () => {
			if (!auth.email.value) {
        errors.email = 'Correo es requerido';
      } else {
        errors.email = '';
      }

      if (!auth.password.value) {
        errors.password = 'Contrasena es requerido';
      } else {
        errors.password = '';
      }

			const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!pattern.test(auth.email.value)) {
        errors.email = 'Por favor, introduce un correo electrónico válido.';
				return
      } else {
        errors.email = '';
      }

			if (auth.email.value && auth.password.value) {

				submitted.value = true;
				notifyLoading('Validando Credenciales','info')
				const authData: IAuth = {
					email: auth.email.value,
					password: auth.password.value
				};
				authCall(authData)
			}
    };

		const authCall = async (authData:  IAuth) => {
      try {
        const authResponse = await authService.authentication(authData);
				store.commit('setUser', authResponse.data);
				router.push('/chat-room/chats');
        clearCall();
      } catch (error) {
				clearCall();
      }
    };

		const clearCall = () => {
			setTimeout(() => {
				submitted.value = false;
				notifyLoadingClear();
			},800)
		};

		const toggleRegisterForm = () => {
      showRegisterForm.value = !showRegisterForm.value;
    };

		const backRegister = () => {
			toggleRegisterForm();
		};

		const notifyLoading = (message: string, info: string | any) => {
      toast.loading(message, {
        autoClose: 2500,
				theme: "colored",
  			type: info,
				toastId: 'loading-toast'
      });
    }

		const notifyLoadingClear = () => {
      toast.remove('loading-toast')
    }

		return {
			auth,
			showRegisterForm,
			submitted,
			errors,
			handleSubmit,
			toggleRegisterForm,
			backRegister,
			notifyLoading
		}
	}
};

</script>

<style scoped lang="scss">
.main {
	height: 100vh;
	display: flex;
	.show1.left{
		transform: translateX(100%);
	}

	.show2.right {
		flex: 55%;
		transform: translateX(-100%);
		@media (max-width: 1020px) {
			transform: translateX(0%);
		}
	}

  .left {
		@media (max-width: 1020px) {
			display: none;
		}
    flex: 55%;
		height: 100%;
		display: flex;
		align-content: center;
		justify-content: center;
		flex-wrap: wrap;
		
		.img-login {
			max-width: 100%;
			height: auto;
			max-height: 100%;
		}
  }

  .right {
		@media (max-width: 1020px) {
			flex: 100%;
		}
		background-color: #f4f5f8;
		transition: transform 0.9s;
    flex: 45%;
		height: 100%;
		.login-box {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			height: 100%;

			.input-box {
				display: flex;
				flex-direction: column;
				gap: 20px;

				.input-group {
					position: relative;
					display: flex;
					align-items: center;
					height: 45px;
					.icon-size {
						font-size: 20px;
						color: #aaa;
					}
				}

				.input-group i {
					position: absolute;
					left: 15px;
					color: #aaa;
				}

				.input-group input {
					padding-left: 40px;
					height: 45px;
					border-radius: 9px;
					width: 270px;
					border: 1px solid #aaa;
				}

				.button-login {
					background-color: #1B335D;
					color: #f4f5f8;
					width: 100%;
					transition: background-color 0.3s;
				}

				.button-login:active {
					background-color: #0f1f3b;
					outline: none;
				}
			}
		}
  }
}

h2, h3{
	margin: 0;
}

.error {
	font-size: 12px;
	text-align: center;
	color: #eb445a;
}

input:disabled, button:disabled {
	background-color: #f2f2f2;
	color: #999;
	cursor: not-allowed;
	border: 1px solid #ccc;
}
</style>
