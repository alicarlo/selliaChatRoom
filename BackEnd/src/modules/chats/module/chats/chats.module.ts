import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatsService } from '../../service/chats/chats.service';
import { ChatsController } from '../../controller/chats/chats.controller';
import { ChatsSchema } from '../../schemas/chats.schema';
import { ContactsSchema } from '../../../contacts/schemas/contacts.schema';

@Module({
	imports: [
    MongooseModule.forFeature([{ name: 'Chats', schema: ChatsSchema}, { name: 'Contacts', schema:  ContactsSchema}]) , ],
  	providers: [ChatsService],
  	controllers: [ChatsController],
})
export class ChatsModule {}
