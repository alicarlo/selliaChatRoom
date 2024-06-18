import { Injectable,InternalServerErrorException, ConflictException, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Chats } from '../../../chats/interfaces/chats';
import { Contacts } from '../../../contacts/interfaces/contacts'
import { UserService } from '../../../user/service/user/user.service';

@Injectable()
export class ChatsService {
	constructor(
		@InjectModel('Chats') private readonly chatsModel: Model<Chats>,
		@InjectModel('Contacts') private readonly contactsModel: Model<Contacts>,
		@Inject(UserService ) private  UserService : UserService ,
	) {}

	async createChat(usersIds: Array<string>, msg: String)  {
		const existingChat = await this.chatsModel.findOne({ userIds: { $all: usersIds } })
		if (!existingChat) {
			const createdChat = new this.chatsModel({ 
				userIds: usersIds
			 });
			return await createdChat.save();
		}
	}

	async getChatInit(usersData)  {
		const existingChat = await this.chatsModel.findOne({ userIds: { $all: usersData.usersIds } })
		if (existingChat) {
			return existingChat;
		}
	
		if (!existingChat) {
			const createdChat = new this.chatsModel({ 
				userIds: usersData.usersIds
			 });
			return await createdChat.save();
		}
	}

	async getChats(usersData)  {
		const existingChat = await this.chatsModel.find({ userIds: { $in: usersData.usersIds } }).lean();
		if (existingChat) {
			let sendData = [];
			for (const item of existingChat) {
				let contactData = await this.getContactAndUser(usersData.currentId, item.userIds);
				if (contactData !== null) {
					sendData.push({ ...item, ...contactData });
				}
			}
			return sendData;
		}
		return [];
	}

	async getContactAndUser(userIdCurrent: string, existingChat: any) {
		// Buscar el id del usuario
		const filterCurrentUserIndex = existingChat.findIndex((x: string) => x === userIdCurrent);

		// Busca los contactos que tienes
		const existingContacts = await this.contactsModel.findById(existingChat[filterCurrentUserIndex]).exec(); 

		// Busca el id del contacto del chat
		const otherUserIndex = (filterCurrentUserIndex === 0) ? 1 : 0;

		if (!existingContacts) {
			const filterUser = await this.UserService.searchUser(existingChat[otherUserIndex]);
			return {
				newChat: false,
				contactData: {
					approved: false,
					email: filterUser.email,
					firstName: filterUser.firstName,
					idContact: existingChat[otherUserIndex],
					idUser: userIdCurrent,
					imgProfile: '',
					lastName: filterUser.lastName,
					nickName: filterUser.nickName,
					statusString: 'Pending',
					_id: ''
				}
			}
		}

		
		// Filtra tus contactos con el id del chat
		const filteredContacts = existingContacts.subCollection.filter((x) => x.idContact ===  existingChat[otherUserIndex]);
		return {
			newChat: false,
			contactData: filteredContacts[0]
		}
	}
}
