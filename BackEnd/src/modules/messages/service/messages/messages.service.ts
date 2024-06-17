import { Injectable,InternalServerErrorException, ConflictException, Inject } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Messages } from '../../../messages/interfaces/messages';
import { SaveImagesService } from '../../../saveImages/services/save-images/save-images.service';
@Injectable()
export class MessagesService {
	constructor(
		@InjectModel('Messages') private readonly messagesModel: Model<Messages>,
		@Inject(SaveImagesService) private  SaveImagesService: SaveImagesService,
		private readonly httpAdapterHost: HttpAdapterHost,
	) {}

	async addMessage(messageData: Messages | any)  {
		let pathImage = '';
		if (messageData.type === 2) {
			const now = new Date();
			const id = now.toISOString().replace(/[-T:.Z]/g, '');
			let path = await this.SaveImagesService.saveBase64Image(messageData.message, `${messageData.chatId}${id}`);
			let url = await this.getServerDomain();
			let splitPath = path.split('/');
			pathImage = `${url}/static/${splitPath[1]}`
		}
		
		const createMessages = new this.messagesModel(
			{ 
				chatId: messageData.chatId,
				senderId: messageData.senderId,
				receiverId: messageData.receiverId,
				message: messageData.type === 1 ? messageData.message : pathImage,
				type: messageData.type,
				timestamp: new Date(),
				read: false
			});
		return await createMessages.save();
	}

	async getMessages(chatId: string)  {
		const allMessagesByChatId = await this.messagesModel.find({ chatId })
		if (!allMessagesByChatId) {
			return [];
		}
		return allMessagesByChatId;
	}

	async getServerDomain() {
    const httpAdapter = this.httpAdapterHost.httpAdapter;
    const server = httpAdapter.getHttpServer();
    const addressInfo = server.address();
    const hostname = addressInfo.address === '::' ? 'localhost' : addressInfo.address;
    const port = addressInfo.port;
    return `http://${hostname}:${port}`;
  }
}
