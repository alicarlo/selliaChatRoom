import { Controller, Get, Query, Post, UseGuards } from '@nestjs/common';
import { SearchUserService } from '../../service/search-user/search-user.service';
import { SubDocumentContact } from '../../../contacts/interfaces/contacts'
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('search-user')
@Controller('search-user')
export class SearchUserController {
	constructor(private readonly SearchUserService: SearchUserService) {}

	@UseGuards(AuthGuard('jwt'))
	@Get()
	@ApiOperation({ summary: 'Buscar tag de usuario' })
	@ApiResponse({ status: 201, description: 'El tag se encontro' })
  @ApiResponse({ status: 400, description: 'Solicitud incorrecta.' })
	@ApiResponse({ status: 409, description: 'El tag no existe' })
	@ApiResponse({ status: 500, description: 'Error interno del servidor.' })
  async searchUser(@Query('nickName') nickName: string, @Query('id') id: string): Promise<SubDocumentContact> {
		const result = await this.SearchUserService.search(nickName, id);
		return result;
  }
	
}
