import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MessagesService} from '../../service/messages/messages.service';
import { MessagesController } from '../../controller/messages/messages.controller';
import { MessagesSchema } from '../../schemas/messages.schema';
import { SaveImagesService } from '../../../saveImages/services/save-images/save-images.service';

@Module({
	imports: [
    MongooseModule.forFeature([{ name: 'Messages', schema: MessagesSchema}]) ],
  	providers: [MessagesService, SaveImagesService],
  	controllers: [MessagesController],
})
export class MessagesModule {}

