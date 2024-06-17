import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
	@ApiProperty({ example: 'Juan' })
  readonly firstName: string;

	@ApiProperty({ example: 'Pérez' })
  readonly lastName: string;

	@ApiProperty({ example: 'test@test.com' })
  readonly email: string;

	@ApiProperty({ example: 'password123', minLength: 3 })
  readonly password: string;

	@ApiProperty({ example: 'juanp' })
  readonly nickName: string;

	@ApiProperty({ example: '' })
  readonly imgProfile: string;
}