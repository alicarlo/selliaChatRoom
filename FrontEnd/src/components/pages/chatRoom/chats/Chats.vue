<template>
	<div class="container">
		<div class="main">
			<div class="chat-box" >
				<div class="header">
					<h2>Chats</h2>
					<div class="plus-box" @click="openModal">
						<i class="fa fa-plus icon-size"></i>
						<p>Nuevo</p>
					</div>
				</div>

				<div v-if="loading" class="loader-box">
					<span class="loader"></span>
					<h4>Cargado chats</h4>
				</div>

				<div v-if="!loading && chatList.length === 0" class="loader-box">
					<h4>No cuentas con chats</h4>
				</div>

				<div v-if="!loading && chatList.length !== 0" class="chat-list">
					<div v-for="chat in chatList" :key="chat._id">
						<div class="msg-chat" :class="{ 'selected': selectedOption === chat._id }" @click="chatSelect(chat._id, chat)">
							<div class="msg-chat-img">
								<div class="profile-img">
									<p>{{ generateProfileImage( chat.contactData.firstName) }}</p>
								</div>
								<div class="box-name-chat">
									<p class="name-chat">{{ chat.contactData.firstName }} {{ chat.contactData.lastName }}</p>
									<p class="last-message">
										{{ chat.contactData.nickName }}
									</p>
								</div>
							</div>
							
							<div class="side-divider"></div>
						</div>
						<br>
					</div>
					
				</div>
			</div>

			<div  class="message-box">
				<div class="close-modal" v-if="mobileChangeWindow"  @click="backMobile">
					<i class="fa fa-close icon-size-back"></i>
				</div>

				<div class="message-sub-box" v-if="!chatContactList.length && !selectedContact">
					<div class="chat-box-empty" >
						<div class="chat-text">
							<img  class="" src="/src/assets/imgs/chat1.png"/>
							<div>
								<h2>Seleccione un chat o inicie una conversacion con un contacto de su lista</h2>
							</div>
						</div>
					</div>
				</div>
				
				<div class="message-sub-box" v-if="selectedContact">
					<div v-if="selectedContact">
						<div class="contact-select-chat">
							<div class="profile-img">
								<p>{{ generateProfileImage(selectedContact?.firstName) }}</p>
							</div>

							<div>
								<p class="name-contact">{{ selectedContact?.firstName }} {{ selectedContact?.lastName }}</p>
								<p class="last-message">{{ selectedContact?.nickName }}</p>
							</div>

						</div>
						<br>
						<div class="text-box-chat"  v-if="selectedContact">
							<div class="input-group">
								<input type="text"  placeholder="Buscar mensajes">
							</div>

							<div class="send"  >
								<i class="fa fa-search icon-size"></i>
							</div>
						</div>
						<br>
						<div class="divider"></div>
					</div>

					<div class="msg-list-box" v-if="selectedContact" >
						<br>
						<div v-for="msg in messagesList" :key="msg._id" >
				
							<div class="message left" v-if="user?.id !== msg.senderId">
								<div class="message-content">
									<p v-if="msg.type ===1">{{ msg.message}}</p>
									<div v-else>
										<img class="chat-image" :src="msg.message" />
									</div>
									<p class="timestamp">{{ formatDate(msg.timestamp) }}</p>
								</div>
        			</div>
							<div class="message right" v-if="user?.id === msg.senderId">
								<div class="message-content">
									<p v-if="msg.type ===1">{{ msg.message}}</p>
									<div v-else>
										<img class="chat-image" :src="msg.message" />
									</div>
									<p class="timestamp">{{ formatDate(msg.timestamp) }}</p>
								</div>
							</div>
						</div>
					</div>

					<div class="text-box-chat"  v-if="selectedContact">
						<div class="input-group">
							<div v-if="!newMessage">
								<div class="search-text-image">
									<div class="image-icon">
										<i class="fa fa-picture-o icon-size"></i>
									</div>
								
									<div class="sub-box">
										<input class="input-box"  type="file"  accept="image/*" name="image" id="file" @input="sendImageGallery($event)">
									</div>
								</div>
							</div>

							<input type="text"  placeholder="Escriba un mensaje" v-model="newMessage">
							<div  v-if="newMessage" class="send"  @click="sendMessage(1)" >
								<i class="fa fa-send icon-size"></i>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		
		<AddUserModal :isOpen="isModalOpen" @close="closeModal">
			<div class="contact-box-modal">
				<div v-if="contactList.length === 0" class="loader-box">
					<h4>No cuentas con contactos</h4>
				</div>

				<div v-for="contacts in contactList" :key="contacts._id">
					<div class="contact" :class="{ 'selected': selectedOption === contacts._id}" @click="selectContactModal(contacts)">
						<div class="contact-img">
							<div>
								<div class="profile-img">
									<p>{{ generateProfileImage(contacts.firstName) }}</p>
								</div>

							</div>
							<div>
								<p class="name-contact">{{ contacts.firstName }} {{ contacts.lastName }}</p>
								<p class="last-message">{{ contacts.nickName }}</p>
							</div>
						</div>
	
						<div class="side-divider"></div>
					</div>
					<br>
				</div>
			</div>
    </AddUserModal>

		<ShowImageModal :isOpen="isModalImageOpen" @close="closeModalImage">
			<div class="image-box">
				<div class="image-container">
					<img class="img-modal" :src="convertFile"/>
					<div class="send-image-box"  @click="sendImageMessage">
						<i class="fa fa-send icon-size-send"></i>
					</div>
				</div>
			</div>
		</ShowImageModal>
	</div>
</template>

<script lang="ts">
import { onMounted, Ref, ref } from 'vue';
import moment from 'moment';
import 'vue3-toastify/dist/index.css';
import { toast } from 'vue3-toastify';
import { socket } from '../../../services/socketMessage/socketMessage';
import store from '../../../../store';
import AddUserModal from '../../../modals/addIUserModal.vue';
import ShowImageModal from '../../../modals/showImageModal.vue';
import { searchUserService } from '../../../services/searchUser/searchUser';
import { contactsService } from '../../../services/contacts/contacts';
import { chatsService } from '../../../services/chats/chats';
import { getAllMessagesService } from '../../../services/messages/messages';
import { IContact } from '../../../interfaces/IContact';
import { IUser } from '../../../interfaces/IAuth'


export default  {
  name: 'Chats',
	components: {
    AddUserModal,
		ShowImageModal,
  },
	setup() {
		const user = store.state.user as IUser;
		const loading =  ref(true);
		const loadingMsg = ref(true);
		const messagesList = ref([]) as any;
		const selectedOption = ref(0);
		const tagSearch = ref('');
		const convertFile = ref('');
		const windowWidth = ref(window.innerWidth);
		const chatId = ref('');
		const isModalOpen = ref(false);
		const isModalImageOpen = ref(false);
		let chatContactList = ref([]);
		let selectedContact = ref(null) as unknown as Ref<IContact>;
		let newMessage =  ref('') as unknown as Ref<String>
		let mobileFlag = ref(0);
		let mobileChangeWindow = ref(false);
		let contactList = ref([]) as any;
		let chatList = ref([]) as any;
		
		const backMobile = () => {
			let element = document.querySelector('.chat-box') as Element | any;
			element.style.display = 'block';

			let elementBox = document.querySelector('.message-box') as Element | any;
			elementBox.style.display = 'none';
		}

		const chatSelect = (id: number, chat: any) => {
			socket.emit('leaveRoom', chatId.value);
			if (mobileChangeWindow.value) {
				let element = document.querySelector('.chat-box') as Element | any;
				element.style.display = 'none';

				let elementBox = document.querySelector('.message-box') as Element | any;
				elementBox.style.display = 'block';
			}
			selectedOption.value = id;
			selectContactModal(chat.contactData);
			getMessagesByIdChat(chat._id);
		} 

    const openModal = () => {
      isModalOpen.value = true;
    };

    const closeModal = () => {
      isModalOpen.value = false;
    };

		const openModalImage = () => {
      isModalImageOpen.value = true;
    };

    const closeModalImage = () => {
      isModalImageOpen.value = false;
    };

		const searchUser = async () => {
			if (tagSearch.value === '') {
				toastCall('Ingrese el tag del usuario a buscar', 'warning')
				return;
			}

			try {
        await searchUserService.searchUser(tagSearch.value);
  
      } catch (error) {
	
      }
		};

		const toastCall =  (message: string, typeText: string | any) => {
			toast(message, {
				autoClose: 2500,
				theme: "colored",
				type: typeText,
			});
		};

		const getContacts = async () => {
			try {
        const contacts = await contactsService.getContactsById(user?.id);
				contactList.value = contacts;
      } catch (error) {
				
      }
		};

		const getChats = async (id1: string, id2: string, flag: boolean) => {
			try {
        let chatsAux = await chatsService.getChatsById([id1, id2], user?.id);
				if (!flag) chatList.value = chatsAux;
				else{
					if (chatList.value.length === 0) chatList.value = chatsAux;
					else {
						let auxChatListOriginal  = JSON.parse(chatList.value);

						const combinedArray = [...JSON.stringify(auxChatListOriginal), ...chatsAux];
						chatList.value = combinedArray.filter((item, index, self) => 
							index === self.findIndex((t) => t.id === item.id)
						);

					}
				}
				loading.value = false;
				return chatList;
      } catch (error) {
				// error
      }
		};

		const getChatsInit = async (id1: string, id2: string) => {
			try {
        let chat = await chatsService.getChatInit([id1, id2], user?.id);
				return chat;
      } catch (error) {
				// error
      }
		};

		const getMessagesByIdChat = async (chatId: string) => {
			try {
				let msgList =  await getAllMessagesService.getMessages(chatId);
        messagesList.value = msgList.reverse();
				loadingMsg.value = false
      } catch (error) {
				
      }
		};

		const selectContactModal = async (selectData: any) => {
			selectedContact.value = selectData;
			const chatData = await getChatsInit(user.id,selectedContact.value.idContact);
			chatId.value = chatData._id;
			joinRoom(chatId.value) 
			closeModal();
		}

		const generateProfileImage = (name: string) => {
			let firstLetter = name.substring(0, 2)
			return firstLetter.toUpperCase(); 
		}
		
		const sendImageMessage = () => {
			newMessage.value  = convertFile.value;
			closeModalImage();
			sendMessage(2)
		}

		const sendMessage = async (type: number) => {
			if (chatList.value.length === 0) {
				getChats(user.id,selectedContact.value.idContact, false);
			} else {
				let search = chatList.value.some((x: any) => x.contactData.idContact === selectedContact.value.idContact);
				if (!search) getChats(user.id,selectedContact.value.idContact, false);

			}

      socket.emit('message', { message: newMessage.value, type, senderId: user.id ,receiverId: selectedContact.value.idContact, chatId: chatId.value });
      newMessage.value = '';
		}

		const joinRoom = (chatId: string) => {
			socket.emit('joinRoom', { senderId: user.id ,receiverId: selectedContact.value.idContact, chatId});
		
			socket.on('message', (message: any) => {
				messagesList.value.unshift(message);
			});
    };

		const formatDate = (dateString: string) => {
			return moment(dateString).format('YYYY-MM-DD hh:mm A');
		};

		const sendImageGallery = async (event: any) => {
			if (event.target.files[0].type === "image/png" || event.target.files[0].type === "image/jpg") {
				toastCall('Formato Invalido', 'warning')
			}else{
				const fileBase64Convert = await readFileAsBase64(event.target.files[0]);
				convertFile.value = fileBase64Convert.replace(/^"(.*)"$/, '$1');
				openModalImage();
			}
		}

		const readFileAsBase64 = (file: File) => {
			return new Promise<string>((resolve, reject) => {
				const reader = new FileReader();
				reader.onload = () => {
					const base64String = reader.result as string;
					resolve(base64String);
				};

				reader.onerror = () => {
					reject(new Error('Failed to read the file.'));
				};

				reader.readAsDataURL(file);
			});
  	}

		const refreshChatsList = (idsList: Array<string>) => {
			let searchChatId =  idsList.find((x: string) => x ===  user.id);
			if (searchChatId !== undefined) getChats(user.id, '', true);
		}

		const onWidthChange = () => {
      windowWidth.value = window.innerWidth;
			mobileChangeWindow.value =  windowWidth.value <= 800 ? true : false;
    };
		
		onMounted(() => {
			socket.on('connect', () => {
				console.log('Connected to server');
			});
			socket.on('chats', (listenChats: any) => {
				refreshChatsList(listenChats);
			});
			getContacts();
			getChats(user.id, '', false);
			window.addEventListener('resize', onWidthChange);
			mobileChangeWindow.value =  windowWidth.value <= 800 ? true : false;
			if (window.innerWidth < 800) {
				let element = document.querySelector('.message-box') as Element | any;
				element.style.display = 'none';
			}
    });

		return {
			mobileChangeWindow,
			mobileFlag,
			windowWidth,
			isModalImageOpen,
			convertFile,
			user,
			loadingMsg,
			loading,
			messagesList,
			chatList,
			chatId,
			newMessage,
			chatContactList,
			selectedContact,
			contactList,
			tagSearch,
			selectedOption,
			chatSelect,
			isModalOpen,
      openModal,
      closeModal,
			toastCall,
			searchUser,
			sendMessage,
			sendImageMessage,
			getContacts,
			generateProfileImage,
			selectContactModal,
			getMessagesByIdChat,
			joinRoom,
			getChats,
			formatDate,
			sendImageGallery,
			readFileAsBase64,
			openModalImage,
			closeModalImage,
			backMobile
		}
	}
	
}
</script>

<style scoped lang="scss">
.container {
	height: 100%; 
	overflow-y: hidden;
}

.main {
	padding: 60px 25px 0px 25px;
	display: flex;
  gap: 20px;
	height: calc(100% - 80px);
	.chat-box {
		width: 400px;
		min-width: 400px;
		@media(max-width: 1300px) {
			width: 300px;
			min-width: 300px;
		}

		@media(max-width: 800px) {
			width: 100%;
			max-width: auto;
		}

		.chat-list {
			padding: 60px 25px 0px 25px;
			height: calc(100% - 120px);
    	overflow-y: scroll;
			display: flex;
			flex-direction: column;
			gap: 25px;
			@media(max-width: 1300px) {
				padding: 60px 15px 0px 15px;
			}

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
		}
		 
		.msg-chat {
			display: flex;
			align-content: center;
			justify-content: space-between;
			flex-wrap: wrap;
			padding: 10px;
			border-radius: 6px;
			cursor: pointer;
			p {
				margin: 0;
			}

			.msg-chat-img {
				display: flex;
				gap: 20px;
			}

			.box-name-chat {
				width: 200px;
				@media(max-width: 1300px) {
					width: 140px;
				}
			}

			.name-chat {
				font-weight: bold;
				font-size: 22px;
				@media(max-width: 1300px) {
					font-size: 13px;
				}
			}

			.last-message {
				font-weight: 500;
				font-size: 14px;
				color: #1B335D;
				@media(max-width: 1300px) {
					font-size: 11px;
				}
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
			align-items: center;
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
		border-radius: 20px;
		box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
		width: -webkit-fill-available;
		min-width: 560px;
		display: flex;
    flex-direction: column;
		@media(max-width: 1300px) {
			min-width: auto;
		}

		@media(max-width: 960px) {
			left: 50px;
		}

		@media(max-width: 800px) {
			width: 100%;
			max-width: auto;
		}

		.text-box-chat {
			border-radius: 20px;
			background: #dcdddd;
			height: 60px;
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 0 25px 0 25px;
		}

		.send {
			cursor: pointer;
		}

		.message-sub-box {
			padding: 0 25px 0 25px;
			height: 100%;
			.chat-box-empty {
				height: 100%;
				align-content: center;
				.chat-text {
					width: 100%;
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
					text-align: center;
				}
				
				img {
					width: 60%;
				}
			}
		}
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
	width: 100%;
	position: relative;
	display: flex;
	align-items: center;
	height: 45px;
	background: #dcdddd;
	.icon-size {
		font-size: 20px;
		color: #aaa;
	}
}

.input-group i {
	left: 15px;
	color: #aaa;
}

.input-group input {
	background: #dcdddd;
	width: 100%;
	outline: none;
  border-color: transparent;
	padding-left: 40px;
  height: 35px;
  border: none;
}

.button {
	background-color: #1B335D;
	color: #f4f5f8;
	width: 150px;
}

.contact-box-modal {
	max-height: 500px;
	overflow-y: scroll;
}

.contact {
	display: flex;
	align-content: center;
	justify-content: space-between;
	flex-wrap: wrap;
	padding: 10px;
	border-radius: 6px;
	cursor: pointer;

	.contact-img {
		display: flex;
		gap: 20px;
	}

	.clock-message {
		font-weight: 500;
		font-size: 11px;
		font-weight: bold;
		color: #1B335D
	}
}

.contact.selected {
	box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
	border-radius: 12px;
}

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

.name-contact {
	font-weight: bold;
	font-size: 22px;
}

.last-message {
	font-weight: 500;
	font-size: 14px;
	color: #1B335D
}

p {
	margin: 0;
}

.contact-select-chat {
	display: flex;
	gap: 25px;
	align-items: center;
	padding-top: 25px;
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

.profile-img {
	height: 70px;
	width: 70px;
	min-width: 70px;
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

.chat-container {
	max-width: 600px;
	margin: 20px auto;
	padding: 10px;
	background-color: #fff;
	border-radius: 10px;
	box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.message {
	display: flex;
	margin-bottom: 10px;
}

.message.left {
  justify-content: flex-start;
}

.message.right {
  justify-content: flex-end;
}

.message-content {
	padding: 10px 15px;
	border-radius: 20px;
	background-color: #e0e0e0;
	word-wrap: break-word;
	.chat-image {
		width: 100%;
	}
}

.message.left .message-content {
	width: 50%;
  background-color: #d1e7dd;
}

.message.right .message-content {
	width: 50%;
  background-color: #cfe2ff;
}

.message-content p {
  margin: 0;
}

.msg-list-box {
	height: calc(100% - 300px);;
	overflow-y: scroll;
	overflow-x: hidden;
	padding: 10px;
	display: flex;
  flex-direction: column-reverse;
	@media(max-width: 1300px) {
		height: calc(100% - 310px);
	}
}

.timestamp {
  font-size: 0.75em;
  color: gray;
  text-align: end;
}

.new-message-button {
  background-color: #007bff;
  color: white;
  text-align: center;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
}

.image-box {
	width: 100%;
	display: flex;
	justify-content: center;
	.image-container {
  	position: relative;
		.img-modal {
			height: 250px;
			object-fit: cover;
		}

		.send-image-box {
			position: absolute;
			top: 80%;
			right: -10px;
			cursor: pointer;
			background-color: #1B335D;
			height: 50px;
			width: 50px;
			border-radius: 50%;
			display: flex;
			align-content: center;
			justify-content: center;
			flex-wrap: wrap;
			.icon-size-send {
				font-size: 20px;
				color: #ffffff;
			}
		}
	}
}

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
	position: absolute;
	margin-top: -25px;
	.icon-size-back {
		font-size: 25px;
	}
}

.search-text-image {
	width: 25px;
	.imagen-icon {
		display: flex; 
		gap: 10px; 
		align-items: center; 
		cursor: pointer; 
		justify-content: center;					
		align-items: center;					
		height: 100%;
	}

	.sub-box {
		opacity: 0; 
		margin-top: -60px;
		 height: 60px;

		 .input-box {
			width: 100%; 
			height: 60px;
		 }
	}
}
</style>
