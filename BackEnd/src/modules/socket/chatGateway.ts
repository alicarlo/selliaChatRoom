import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody, ConnectedSocket } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Inject, Injectable } from '@nestjs/common';
import { ChatsService } from '../chats/service/chats/chats.service';
import { MessagesService } from '../messages/service/messages/messages.service'

@WebSocketGateway({
  cors: {
    origin: 'http://localhost:5173',
  },
})

@Injectable()
export class ChatGateway {
	constructor(
    @Inject(ChatsService) private readonly chatsService: ChatsService,
		@Inject(MessagesService) private readonly messagesService: MessagesService
  ) {}
  @WebSocketServer() server: Server;

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }


	@SubscribeMessage('joinRoom')
	handleJoinRoom(@MessageBody() data: any, @ConnectedSocket() client: Socket): void {
		client.join(data.chatId);
	}

	@SubscribeMessage('message')
	async handleMessage(@MessageBody() message: { message: string, type: number, senderId: string, receiverId: string, chatId: string }, @ConnectedSocket() client: Socket): Promise<void> {
		const messageInsertData = await this.messagesService.addMessage(message);
		this.server.to(message.chatId).emit('message', 
		{ 
			message: message.type === 1 ? message.message : messageInsertData.message, 
			senderId: message.senderId, 
			receiverId: message.receiverId, 
			chatId: message.chatId,
			_id: messageInsertData._id,
			timestamp: messageInsertData.timestamp,
			type: message.type
		});
		this.server.emit('chats',[message.senderId, message.receiverId])
	}

	@SubscribeMessage('leaveRoom')
  handleLeaveRoom(@MessageBody() data: any, @ConnectedSocket() client: Socket): void {
    client.leave(data.chatId);
  }

	@SubscribeMessage('chats')
	async handleChats(@MessageBody() id: string, @ConnectedSocket() client: Socket): Promise<void> {
	
	}
}

