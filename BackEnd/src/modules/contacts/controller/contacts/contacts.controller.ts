import { Controller, Get, Query, Post, UseGuards,Body,HttpStatus, BadRequestException, InternalServerErrorException,ConflictException } from '@nestjs/common';
import { ContactsService } from '../../service/contacts/contacts.service';
import { ContactsDto } from '../../dto/contacts.dto';
import { SubDocumentContact } from '../../interfaces/contacts';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('contacts')
@Controller('contacts')
export class ContactsController {
	constructor(private readonly ContactsService: ContactsService) {}
	@UseGuards(AuthGuard('jwt'))
	@Get()
	@ApiOperation({ summary: 'Buscar tag de usuario' })
	@ApiResponse({ status: 201, description: 'Listado' })
  @ApiResponse({ status: 400, description: 'Solicitud incorrecta.' })
	@ApiResponse({ status: 409, description: 'No hay contactos' })
	@ApiResponse({ status: 500, description: 'Error interno del servidor.' })
  async getContacts(@Query() idUser: ContactsDto): Promise<SubDocumentContact[]> {
		const result = await this.ContactsService.searchContacts(idUser);
		return result;
  }
}
