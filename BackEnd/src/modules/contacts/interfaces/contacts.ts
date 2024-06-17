import mongoose, { Schema, Document } from 'mongoose';

export interface Contacts extends Document {
	_id: string;
	subCollection: SubDocumentContact[]
}

export interface SubDocumentContact extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  nickName: string;
  imgProfile: string;
  statusString: string;
  approved: boolean;
  idContact: string;
  idUser: string;
}

const SubDocumentSchema = new Schema<SubDocumentContact>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  nickName: { type: String, required: true },
  imgProfile: { type: String, required: true },
  statusString: { type: String, required: true },
  approved: { type: Boolean, required: true },
  idContact: { type: String, required: true },
  idUser: { type: String, required: true }
});

const ContactSchema = new Schema<Contacts>({
  subCollection: [SubDocumentSchema]
});

export const Contact = mongoose.model<Contacts>('Contact', ContactSchema);
