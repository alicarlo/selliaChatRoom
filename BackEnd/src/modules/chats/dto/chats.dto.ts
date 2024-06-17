import { ApiProperty } from '@nestjs/swagger';

export class ChatsDto {
	@ApiProperty({ example: '' })
	readonly _id: String

	@ApiProperty({ example: '' })
	readonly userIds: Array<String>
}