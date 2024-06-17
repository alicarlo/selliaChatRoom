import { ApiProperty } from '@nestjs/swagger';

export class AuthDto {
	@ApiProperty({ example: 'test@test.com' })
  readonly email: string;

	@ApiProperty({ example: 'password123', minLength: 3 })
  readonly password: string;
}