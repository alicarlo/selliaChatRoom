import { ApiProperty } from '@nestjs/swagger';

export class SearchUserDto {
	@ApiProperty({ example: 'juanp' })
  readonly nickName: string;

	@ApiProperty({ example: '' })
  readonly id: string;
}