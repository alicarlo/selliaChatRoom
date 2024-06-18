import { Injectable,InternalServerErrorException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../../../user/interfaces/user.interface';
import { Contacts, SubDocumentContact } from '../../../contacts/interfaces/contacts'

@Injectable()
export class SearchUserService {
	constructor(
		@InjectModel('User') private readonly searchUserModel: Model<User>,
		@InjectModel('Contacts') private readonly contactsModel: Model<Contacts>
	) {}

	async search(nickName: string, id: string): Promise<SubDocumentContact> {
		// Current User
		const _id = id;
		const currentUserData = await this.searchUserModel.findOne({ _id })
		if (!currentUserData) {
			// throw new ConflictException('El  tag no existe777'+currentUserData);
			return null;
		}

		// User search
		const existingData = await this.searchUserModel.findOne({ nickName })
		if (!existingData) {
			// throw new ConflictException('El  tag no existe'+existingData);
			return null;
		}

		const existingContact = await this.contactsModel.findById(_id).exec();
		if (!existingContact) {
			const newContact = new this.contactsModel({
				_id: id,
				subCollection: [{ 
					firstName: existingData.firstName,
					lastName: existingData.lastName,
					email: existingData.email,
					password: existingData.password,
					nickName: existingData.nickName,
					imgProfile: existingData.imgProfile,
					statusString: 'Add',
					approved: false,
					idContact: existingData._id,
					idUser: id
				}]
			});
			await newContact.save();
			return newContact.subCollection[0]
		}

		if (existingContact) {
			const filteredContacts = existingContact.subCollection.some((x) => x.idContact ===  existingData._id.toString());
			if (filteredContacts) throw new InternalServerErrorException('Ya tienes este contacto agregado');
			
			const subContact: SubDocumentContact = {
				firstName: existingData.firstName,
				lastName: existingData.lastName,
				email: existingData.email,
				password: existingData.password,
				nickName: existingData.nickName,
				imgProfile: existingData.imgProfile,
				statusString: 'Add',
				approved: false,
				idContact: existingData._id.toString(),
				idUser: id
			} as SubDocumentContact;

			try {
				await this.contactsModel.updateOne(
					{ _id: id },
					{ $push: { subCollection: subContact } }
				);
				return subContact;
			} catch (error) {
				throw new InternalServerErrorException('Error al agregar el contacto');
			}
		}
		throw new ConflictException(JSON.stringify(existingContact.subCollection));
  }

  async findAll(): Promise<User[]> {
    return this.searchUserModel.find().exec();
  }
}
