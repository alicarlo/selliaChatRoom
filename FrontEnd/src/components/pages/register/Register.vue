<template>
	<div class="register-box">
		<div>
			<div class="back-box" v-if="isActive">
				<div class="back-button" @click="back">
					<i class="fa fa-arrow-right icon-size-back"></i>
				</div>
			</div>
			
			<h2>Registro 🙌</h2>
			<h3>Crea una cuenta para adquirir acceso a la plataforma</h3>

			<br><br>

			<div>
				<form @submit.prevent="handleSubmit" class="input-box">
					<div class="input-group">
						<i class="fa fa-user-plus icon-size"></i>
						<input type="text" id="name" v-model="register.firstName.value" placeholder="Nombre" :disabled="submitted">
					</div>
					<span class="error" v-if="errors.firstName">{{ errors.firstName }}</span>
						

					<div class="input-group">
						<i class="fa-solid fa-id-card-clip icon-size"></i>
						<input type="text" id="lastName" v-model="register.lastName.value" placeholder="Apellido" :disabled="submitted">
					</div>
					<span class="error" v-if="errors.lastName">{{ errors.lastName }}</span>

					<div class="input-group">
						<i class="fa fa-envelope icon-size"></i>
						<input type="text" id="email" v-model="register.email.value" placeholder="Correo" :disabled="submitted">
					</div>
					<span class="error" v-if="errors.email">{{ errors.email }}</span>

					<div class="input-group">
						<i class="fa-solid fa-id-card-clip icon-size"></i>
						<input type="text" id="nickName" v-model="register.nickName.value" placeholder="Tag" :disabled="submitted">
					</div>
					<span class="error" v-if="errors.nickName">{{ errors.nickName }}</span>

					<div class="input-group">
						<i class="fa fa-lock icon-size"></i>
						<input type="password" id="password" v-model="register.password.value" placeholder="Ingrese su contraseña" :disabled="submitted">
					</div>
					<span class="error" v-if="errors.password">{{ errors.password }}</span>

					<div class="input-group">
						<i class="fa fa-lock icon-size"></i>
						<input type="password"  id="validPassword" v-model="validPassword" placeholder="Valide su contraseña" :disabled="submitted">
					</div>
					<span class="error" v-if="errors.validPassword">{{ errors.validPassword }}</span>

					<div v-if="isActive">
						<button class="button-login"  type="submit">
							Registrarse
						</button>
					</div>
				</form>

			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { ref, reactive } from 'vue';
import 'vue3-toastify/dist/index.css';
import { toast } from 'vue3-toastify';
import { registerUserService } from '../../services/registerUser/registerUser'
import { IRegisterUser } from '../../interfaces/IRegisterUser'


export default  {
  name: 'Register',
	emits: ['backRegister'],
	setup(_, { emit }) {
		const isActive = ref(true);
		const register = {
			firstName: ref(''),
      lastName: ref(''),
      nickName: ref(''),
      email: ref(''),
      password: ref('')
		}
		const validPassword = ref('');
    const errors = reactive({
      firstName: '',
			lastName: '',
			nickName: '',
			email: '',
      password: '',
			validPassword: '',
			imgProfile: ''
    });
		const submitted = ref(false);

    const handleSubmit = () => {
      if (!register.firstName.value) {
        errors.firstName = 'Nombre es requerido';
      } else {
        errors.firstName = '';
      }

			if (!register.lastName.value) {
        errors.lastName = 'Apellido es requerido';
      } else {
        errors.lastName = '';
      }

			if (!register.email.value) {
        errors.email = 'Correo es requerido';
      } else {
        errors.email = '';
      }

			if (!register.nickName.value) {
        errors.nickName = 'El tag es requerido';
      } else {
        errors.nickName = '';
      }

      if (!register.password.value) {
        errors.password = 'Contrasena es requerido';
      } else {
        errors.password = '';
      }

			if (!validPassword.value) {
        errors.validPassword = 'Validacion de contrasena es requerido';
      } else {
        errors.validPassword = '';
      }

			const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!pattern.test(register.email.value)) {
        errors.email = 'Por favor, introduce un correo electrónico válido.';
				return
      } else {
        errors.email = '';
      }

      if (register.firstName.value && register.lastName.value && register.email.value && register.nickName.value && register.password.value && validPassword.value) {

				if (register.password.value !== validPassword.value) {
					notify('Validacion de contrasena incorrecta',"warning")
					return;
				}

				submitted.value = true;
				isActive.value =  false;
				notifyLoading('Registrando...','info')
				const formRegister: IRegisterUser = {
					firstName: register.firstName.value,
					lastName: register.lastName.value,
					nickName: register.nickName.value,
					email: register.email.value,
					password: register.password.value,
					imgProfile: ''
				};
				registerUserCall(formRegister)
      }
    };

		const notify = (message: string, typeText: string | any) => {
      toast(message, {
        autoClose: 2500,
				theme: "colored",
  			type: typeText,
      });
    }

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

		const registerUserCall = async (registerData: IRegisterUser) => {
      try {
        await registerUserService.registerUser(registerData);
        clearCall();
				back();
      } catch (error) {
				clearCall();
      }
    };

		const clearCall = () => {
			setTimeout(() => {
				isActive.value =  true;
				submitted.value = false;
				notifyLoadingClear();
			},800)
		};

		const back = () => {
      emit('backRegister');
    };

    return {
      register,
			validPassword,
			isActive,
      errors,
      handleSubmit,
			submitted,
			notify,
			registerUserCall,
			back
    };
  },
};
</script>

<style scoped lang="scss">
.register-box {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	height: 100%;
	width: 100%;
	.back-box {
		display: flex;
    justify-content: flex-end;
		.back-button {
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
	}
	
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
			width: 100%;
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

	.error {
		font-size: 12px;
		text-align: center;
		color: #eb445a;
	}
}
</style>
