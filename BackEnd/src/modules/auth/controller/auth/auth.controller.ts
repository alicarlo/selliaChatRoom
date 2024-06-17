import { Controller, Get, Post, Body,HttpStatus, BadRequestException, InternalServerErrorException,ConflictException } from '@nestjs/common';
import { AuthService } from '../../service/auth/auth.service';
import { AuthDto } from '../../dto/auth';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
	constructor(private readonly AuthService: AuthService) {}
  @Post()
	@ApiOperation({ summary: 'Autenticacion de usuario' })
	@ApiResponse({ status: 500, description: 'Error interno del servidor.' })
  async login(@Body() AuthDto: AuthDto) {
		try {
      if (!AuthDto.email) {
        throw new BadRequestException('El correo es obligatorio');
      }

			if (!AuthDto.password) {
        throw new BadRequestException('El password es obligatorio');
      }

      const result = await this.AuthService.validateUser(AuthDto.email, AuthDto.password);

      if (!result) {
        throw new ConflictException('Credenciales inválidas');
      }

      const { user, token } = result;
      return {
        data: {
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          nickName: user.nickName,
          email: user.email,
					imgProfile: user.imgProfile,
          token
        },
        status: HttpStatus.OK
      };
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
}
