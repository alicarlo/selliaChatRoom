import { ApiProperty } from '@nestjs/swagger';

export class MessagesDto {
	@ApiProperty({ example: '' })
	readonly chatId: String

	@ApiProperty({ example: '' })
	readonly senderId: String

	@ApiProperty({ example: '' })
	readonly receiverId: String

	@ApiProperty({ example: '' })
	readonly message: String
	
	@ApiProperty({ example: '' })
	readonly timeStamp: Date

	@ApiProperty({ example: '' })
	readonly read: boolean

	@ApiProperty({ example: '' })
	readonly type: number
}

