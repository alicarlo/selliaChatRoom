<template>
	<div class="main"> 
		<div class="mobile">
			<div class="list-options-mobile"  @click="navigate('chats')">
				<i class="fa fa-commenting-o icon-size"></i>
			</div>
			
			<div class="list-options-mobile"  @click="navigate('contacts')">
				<i class="fa fa-users icon-size"></i>
			</div>	

			<div class="list-options-mobile"  @click="closeSession">
				<i class="fa fa-sign-out icon-size"></i>
			</div>
		</div>
		<div class="box">
			<div class="profile-img">
				<p>{{ generateProfileImage(user.firstName) }}</p>
			</div>
			<br>
			<div>
				<p class="title">{{ user.firstName }} {{ user.lastName }}</p>
			</div>

			<br>
			<div class="list-menu-box">
				<div class="list-options" :class="{ 'selected': selectedOption === 'chats' }" @click="navigate('chats')">
					<i class="fa fa-commenting-o icon-size"></i>
					<p>Chats</p>
				</div>

				<div class="list-options" :class="{ 'selected': selectedOption === 'contacts' }" @click="navigate('contacts')">
					<i class="fa fa-users icon-size"></i>
					<p>Contactos</p>
				</div>	
			</div>
			
			<br>
			<div class="divider"></div>
			<br>
			<div class="list-options"  @click="closeSession">
				<i class="fa fa-sign-out icon-size"></i>
				<p>Cerrar sesion</p>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { ref, onMounted  } from 'vue';
import { useRouter } from 'vue-router';
import { IUser } from '../../../interfaces/IAuth';
import store from '../../../../store';

export default  {
  name: 'Menu',
	props: {
    user: Object as () => IUser,
		currentPath: String
  },
	setup(props,{ emit }) {
		const router = useRouter();
		const selectedOption = ref('');

		onMounted(() => {
      if (props.currentPath !== undefined) {
        selectedOption.value = props.currentPath;
      }
    });

		const navigate = (path: string) => {
			emit('navigateMenu', path);
			selectedOption.value = path;
		} 

		const closeSession = () => {
			store.commit('clearUser');
			router.push('/login');
		}

		const generateProfileImage = (name: string) => {
			let firstLetter = name.substring(0, 2)
			return firstLetter.toUpperCase(); 
		}
		
		return {
			selectedOption,
			navigate,
			closeSession,
			generateProfileImage
		}
	}
}
</script>

<style scoped lang="scss">
.main {
	background: #1B335D;
	.mobile {
		display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 100%;
    gap: 20px;
		@media(min-width: 959px) {
			display: none;
		}
	}
	.box {
		width: 100%;
		padding: 60px 25px 0px 25px;
		@media(max-width: 960px) {
			display: none;
		}
		.profile-img {
			height: 100px;
			width: 100px;
			border-radius: 50%;
			background-color: #fff;
			object-fit: cover;
			display: flex;
			align-content: center;
			justify-content: center;
			flex-wrap: wrap;
			p {
				font-weight: bold;
				color: #1B335D;
				font-size: 18px;
			}
		}

		.list-menu-box {
			display: flex;
			flex-direction: column;
			gap: 15px;
		}
	}
}

.title {
	color: #fff;
	font-weight: bold;
}

.list-options-mobile {
	color: #fff;
	gap: 20px;
	font-weight: 600;
	font-size: 18px;
	height: 45px;
	cursor: pointer;
	.icon-size {
		color: #fff;
		font-size: 25px;
	}
}

.list-options {
	color: #fff;
	display: flex;
	align-items: baseline;
	gap: 20px;
	font-weight: 600;
	font-size: 18px;
	height: 45px;

	display: flex;
	align-items: center;
	padding-left: 25px;

	cursor: pointer;
	.icon-size {
		color: #fff;
		font-size: 25px;
	}
}

.list-options.selected {
  background-color: #fff;
	color: #1B335D;
	width: 80%;
	border-radius: 12px;
	.icon-size {
		color: #1B335D;
		font-size: 25px;
	}
}

p {
	margin: 0;
}

.divider {
	border: 1px solid #fff;
	width: 90%;
}
</style>
