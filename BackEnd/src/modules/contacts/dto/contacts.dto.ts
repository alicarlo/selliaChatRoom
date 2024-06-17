import { ApiProperty } from '@nestjs/swagger';

export class ContactsDto {
	@ApiProperty({ example: 'Juan' })
  readonly firstName: string;

	@ApiProperty({ example: 'Pérez' })
  readonly lastName: string;

	@ApiProperty({ example: 'test@test.com' })
  readonly email: string;

	@ApiProperty({ example: 'juanp' })
  readonly nickName: string;

	@ApiProperty({ example: 'juanp' })
  readonly imgProfile: string;

	@ApiProperty({ example: 'juanp' })
  readonly statusString: string;

	@ApiProperty({ example: true })
  readonly approved: boolean;

	@ApiProperty({ example: '' })
	readonly idContact: String

	@ApiProperty({ example: '' })
	readonly idUser: String
}