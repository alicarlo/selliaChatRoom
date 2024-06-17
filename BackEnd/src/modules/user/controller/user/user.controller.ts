import { Controller, Get, Post, Body,HttpStatus, BadRequestException, InternalServerErrorException,ConflictException } from '@nestjs/common';
import { UserService } from '../../service/user/user.service';
import { CreateUserDto } from '../../dto/create-user.dto';
import { User } from '../../interfaces/user.interface';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('user')
@Controller('user')
export class UserController {
	constructor(private readonly usersService: UserService) {}

  @Post()
	@ApiOperation({ summary: 'Crear un nuevo usuario' })
  @ApiResponse({ status: 201, description: 'El usuario ha sido creado exitosamente.' })
  @ApiResponse({ status: 400, description: 'Solicitud incorrecta.' })
	@ApiResponse({ status: 409, description: 'El tag ya existe.' })
	@ApiResponse({ status: 500, description: 'Error interno del servidor.' })
  async create(@Body() createUserDto: CreateUserDto) {
		try {
      if (!createUserDto.firstName) {
        throw new BadRequestException('El nombre es obligatorio');
      }

			if (!createUserDto.lastName) {
        throw new BadRequestException('El apellido es obligatorio');
      }

			if (!createUserDto.nickName) {
        throw new BadRequestException('El tag es obligatorio');
      }

			if (!createUserDto.password) {
        throw new BadRequestException('El password es obligatorio');
      }

      await this.usersService.create(createUserDto);
      return { msg: 'Registro exitoso', status: HttpStatus.OK };
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      } else 
			if (error instanceof ConflictException) {
				throw error;
			}else{
        throw new InternalServerErrorException('Ocurrió un error al crear el usuario');
      }
    }
  }

  @Get()
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }
}
