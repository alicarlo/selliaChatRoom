<template>
	<div style="height: 100%; overflow-y: hidden;">
		<div class="main">
			<div class="chat-box">
				<div class="header">
					<h2>Contactos</h2>
					<div class="plus-box" @click="openModal">
						<i class="fa fa-plus icon-size"></i>
						<p>Nuevo</p>
					</div>
				</div>

				<div class="chat-list">
					<div v-if="loading" class="loader-box">
						<span class="loader"></span>
						<h4>Cargado contactos</h4>
					</div>

					<div v-if="!loading" class="list">
						<div v-if=" contactList.length">
							<div v-for="contacts in contactList" :key="contacts._id">
								<div class="msg-chat" :class="{ 'selected': selectedOption === contacts._id}" @click="chatSelect(contacts._id)">
									<div class="msg-chat-img">
										<div>
											<div class="profile-img">
												<p>{{ generateProfileImage(contacts.firstName) }}</p>
											</div>
										</div>
										<div>
											<p class="name-chat">{{ contacts.firstName }} {{ contacts.lastName }}</p>
											<p class="last-message">{{ contacts.nickName }}</p>
										</div>
									</div>
									<div class="side-divider"></div>
								</div>
								<br>
							</div>
						</div>
						<div v-else class="not-list">
							<h4>Aun no cuentas con contactos</h4>
						</div>
					</div>
				</div>
			</div>
		</div>
		
		<AddUserModal :isOpen="isModalOpen" @close="closeModal">
			<div class="input-group">
				<i class="fa fa-search icon-size"></i>
				<input type="text" v-model="tagSearch" placeholder="Ingrese el tag del usuario a buscar">
			</div>
			<br>
			<button class="button" @click="searchUser">
					Buscar
			</button>
    </AddUserModal>
	</div>
</template>

<script lang="ts">
import { ref, onMounted } from 'vue';
import 'vue3-toastify/dist/index.css';
import { toast } from 'vue3-toastify';
import store from '../../../../store';
import AddUserModal from '../../../modals/addIUserModal.vue';
import { contactsService } from '../../../services/contacts/contacts';
import { searchUserService } from '../../../services/searchUser/searchUser';


export default  {
  name: 'Contacts',
	components: {
    AddUserModal
  },
	setup() {
		const user = store.state.user;
		const selectedOption = ref(0);
		const tagSearch = ref('');
		const loading = ref(true);
		const isModalOpen = ref(false);
		let contactList = ref([]);

		const chatSelect = (id: number) => {
			selectedOption.value = id;
		} 

    const openModal = () => {
      isModalOpen.value = true;
    };

    const closeModal = () => {
      isModalOpen.value = false;
    };

		const getContacts = async () => {
			try {
        const contacts = await contactsService.getContactsById(user?.id);
				contactList.value = contacts;
				loading.value = false;
      } catch (error) {
				loading.value = false;
      }
		};

		const searchUser = async () => {
			if (tagSearch.value === '') {
				toastCall('Ingrese el tag del usuario a buscar', 'warning')
				return;
			}
			try {
        await searchUserService.searchUser(tagSearch.value);
				loading.value = true;
				tagSearch.value = '';
				closeModal();
				getContacts();

      } catch (error) {
				// error
      }
		};

		const toastCall =  (message: string, typeText: string | any) => {
			toast(message, {
				autoClose: 2500,
				theme: "colored",
				type: typeText,
			});
		};

		const generateProfileImage = (name: string) => {
			let firstLettter = name.substring(0, 2)
			return firstLettter.toUpperCase(); 
		}
		
		onMounted(() => {
      getContacts();
    });
		
		return {
			tagSearch,
			user,
			contactList,
			loading,
			selectedOption,
			isModalOpen,
			chatSelect,
      openModal,
      closeModal,
			toastCall,
			searchUser,
			generateProfileImage
		}
	}
}
</script>

<style scoped lang="scss">
.main {
	padding: 60px 25px 0px 25px;
	display: flex;
  gap: 20px;
	height: calc(100% - 80px);
	@media(max-width: 800px) {
		padding: 60px 15px 0px 15px;
	}
	.chat-box {
		width: 600px;
		min-width: 600px;
		@media(max-width: 800px) {
		 width: 100%;
		 min-width: auto;
		}

		.chat-list {
			padding: 60px 25px 0px 25px;
			height: calc(100% - 120px);
    	overflow-y: scroll;
			display: flex;
			flex-direction: column;
			gap: 25px;

			.divider {
				border: 1px solid #A3ACB8;
				width: 100%;
				border-radius: 50%;
			}

			.side-divider {
				width: 2px;
				border-radius: 50%;
				background-color: #1B335D;
			}

			.profile-img {
				height: 70px;
				width: 70px;
				border-radius: 50%;
				background-color: #1B335D;
				object-fit: cover;
				display: flex;
				align-content: center;
				justify-content: center;
				flex-wrap: wrap;
				p {
					font-weight: bold;
					color: #fff;
					font-size: 18px;
				}
			}
		}

		.msg-chat {
			display: flex;
			align-content: center;
			justify-content: space-between;
			flex-wrap: wrap;
			padding: 10px;
			border-radius: 6px;
			cursor: pointer;
			.msg-chat-img {
				display: flex;
				gap: 20px;
			}

			.name-chat {
				font-weight: bold;
				font-size: 22px;
			}

			.last-message {
				font-weight: 500;
				font-size: 14px;
				color: #1B335D
			}

			.clock-message {
				font-weight: 500;
				font-size: 11px;
				font-weight: bold;
				color: #1B335D
			}
		}

		.msg-chat.selected {
			box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
			border-radius: 12px;
		}

		.header {
			display: flex;
			justify-content: space-between;
			align-items: baseline;
			h2 {
				font-size: 40px;
				margin: 0;
				color: #1B335D;
			}

			.plus-box {
				display: flex;
				gap: 5px;
				align-items: center;
				p {
					font-size: 15px;
					color: #1B335D;
					margin: 0;
					font-weight: bold;
					cursor: pointer;
				}

				.icon-size {
					font-size: 20px;
					color: #1B335D;
				}
			}

			.plus-box:hover {
				background-color: rgba(27,51,93, 0.8);
				border-radius: 12px;
				padding: 10px;
				p {
					color:#fff;
				}

				.icon-size {
					color: #fff;
				}
			}
		}
	}

	.message-box {
		border-radius: 30px;
		box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
		width: -webkit-fill-available;
	}
}

::-webkit-scrollbar {
	height: 5px;
	width: 8px;

}

/* Track */
::-webkit-scrollbar-track {
	background: #ffffff;
}
	
/* Handle */
::-webkit-scrollbar-thumb {
	background: #A3ACB8;
	border-radius: 6px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
	background: #A3ACB8;
	border-radius: 6px;
}

.input-group {
	position: relative;
	display: flex;
	align-items: center;
	height: 45px;
	padding-top: 25px;
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

.button {
	background-color: #1B335D;
	color: #f4f5f8;
	width: 150px;
}

.list {
	height: 100%;
}

.loader-box {
	display: flex;
	align-items: center;
	justify-content: center;
	height: 100%;
	flex-direction: column;
	h4 {
		color: #1B335D;
	}
}

.not-list {
	display: flex;
	align-items: center;
	justify-content: center;
	height: 70%;
	flex-direction: column;
	h4 {
		color: #1B335D;
		font-size: 25px;
	}
}

p {
	margin: 0;
}

.loader {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: inline-block;
  border-top: 4px solid #1B335D;
  border-right: 4px solid transparent;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
}

.loader::after {
  content: '';  
  box-sizing: border-box;
  position: absolute;
  left: 0;
  top: 0;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border-bottom: 4px solid #1B335D;
  border-left: 4px solid transparent;
}
@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
} 
</style>
