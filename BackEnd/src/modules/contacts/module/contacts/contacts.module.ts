import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ContactsService } from '../../service/contacts/contacts.service';
import { ContactsController } from '../../controller/contacts/contacts.controller';
import { ContactsSchema } from '../../schemas/contacts.schema';

@Module({
	imports: [
    MongooseModule.forFeature([{ name: 'Contacts', schema: ContactsSchema }]) 
	],
  	providers: [ContactsService],
  	controllers: [ContactsController],
})
export class ContactsModule {}
