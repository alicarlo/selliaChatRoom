import { Injectable,ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Contacts, SubDocumentContact } from '../../../contacts/interfaces/contacts';
import { ContactsDto } from '../../dto/contacts.dto';

@Injectable()
export class ContactsService {
	constructor(@InjectModel('Contacts') private readonly contactsModel: Model<Contacts>) {}

	async searchContacts(ContactsDto: ContactsDto): Promise<SubDocumentContact[]> {
		const { idUser } = ContactsDto;
		const existingContacts = await this.contactsModel.findById(idUser).exec(); 
		
		if (!existingContacts) {
			throw new ConflictException('Sin contactos');
		}

		if (!existingContacts.subCollection) {
			throw new ConflictException('Sin contactos');
		}
		
		return existingContacts.subCollection
  }

  async findAll(): Promise<Contacts[]> {
    return this.contactsModel.find().exec();
  }
}

