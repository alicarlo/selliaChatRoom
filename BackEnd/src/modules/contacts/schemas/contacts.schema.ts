import { Schema } from 'mongoose';

export const SubDocumentSchema = new Schema({
  firstName: String,
  lastName: String,
	email: String,
  nickName: String,
	imgProfile: String,
	statusString: String,
	approved: Boolean,
	idContact: String,
	idUser: String,
});

export const ContactsSchema = new Schema({
  _id: String,
	subCollection: [SubDocumentSchema],
}, { collection: 'contacts' });

