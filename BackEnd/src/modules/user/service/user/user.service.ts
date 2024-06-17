import { Injectable,InternalServerErrorException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../../interfaces/user.interface';
import { CreateUserDto } from '../../dto/create-user.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
	constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
		const { nickName, password, email } = createUserDto;

		const existingEmail = await this.userModel.findOne({ email })
		if (existingEmail) {
			throw new ConflictException('El correo ya existe');
		}

		// Verificar si el usuario ya existe
		const existingUser = await this.userModel.findOne({ nickName })
		if (existingUser) {
			throw new ConflictException('El tag ya existe');
		}

		// Encriptar el password
		const hashedPassword = await bcrypt.hash(password, 10);

		try {
			const createdUser = new this.userModel({ ...createUserDto, password: hashedPassword });
			return await createdUser.save();
		} catch (error) {
			throw new InternalServerErrorException('Error al guardar el usuario en la base de datos');
		}
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }
}
