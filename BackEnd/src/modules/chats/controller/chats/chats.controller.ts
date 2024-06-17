import { Controller, Get, Query, Post, UseGuards,Body,HttpStatus, BadRequestException, InternalServerErrorException,ConflictException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { ChatsService } from '../../service/chats/chats.service';
import { Chats } from '../../interfaces/chats';


@ApiTags('chats')
@Controller('chats')
export class ChatsController {
	constructor(private readonly ChatsService: ChatsService) {}
	@UseGuards(AuthGuard('jwt'))
	@Post('getChats')
	@ApiOperation({ summary: 'Buscar chat' })
	@ApiResponse({ status: 201, description: 'Listado' })
  @ApiResponse({ status: 400, description: 'Solicitud incorrecta.' })
	@ApiResponse({ status: 409, description: 'No hay chats' })
	@ApiResponse({ status: 500, description: 'Error interno del servidor.' })
	async getChats(@Body() idUsers: Array<string>, userIdCurrent: string): Promise<Chats | any> {
		const result = await this.ChatsService.getChats(idUsers);
		return result;
  }	

	@UseGuards(AuthGuard('jwt'))
	@Post('getChatsInit')
	@ApiOperation({ summary: 'Buscar chat' })
	@ApiResponse({ status: 201, description: 'Listado' })
  @ApiResponse({ status: 400, description: 'Solicitud incorrecta.' })
	@ApiResponse({ status: 409, description: 'No hay chats' })
	@ApiResponse({ status: 500, description: 'Error interno del servidor.' })
	async getChatInit(@Body() idUsers: Array<string>, userIdCurrent: string): Promise<Chats | any> {
		const result = await this.ChatsService.getChatInit(idUsers);
		return result;
	}
}

