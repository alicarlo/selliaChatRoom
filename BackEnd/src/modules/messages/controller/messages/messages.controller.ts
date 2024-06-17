import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { MessagesService } from '../../service/messages/messages.service';
import { Messages } from '../../interfaces/messages';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('messages')
@Controller('messages')
export class MessagesController {
	constructor(private readonly MessagesService: MessagesService) {}

	@UseGuards(AuthGuard('jwt'))
	@Get()
	@ApiOperation({ summary: 'Buscar chat' })
	@ApiResponse({ status: 201, description: 'Listado' })
  @ApiResponse({ status: 400, description: 'Solicitud incorrecta.' })
	@ApiResponse({ status: 409, description: 'No hay chats' })
	@ApiResponse({ status: 500, description: 'Error interno del servidor.' })
	async getMessages(@Query('chatId') chatId: string): Promise<Messages | any> {
		const result = await this.MessagesService.getMessages(chatId);
		return result;
  }	

}
