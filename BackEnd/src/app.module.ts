import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './modules/user/module/user/user.module';
import { AuthModule } from './modules/auth/module/auth/auth.module';
import { SearchUserModule } from './modules/searchUser/module/search-user.module';
import { ContactsModule } from './modules/contacts/module/contacts/contacts.module';
import { ChatsModule } from './modules/chats/module/chats/chats.module';
import { ChatsSocketModule } from './modules/socket/module/chats-socket/chats-socket.module';
import { MessagesModule } from './modules/messages/module/messages/messages.module';

@Module({
  imports: [
		MongooseModule.forRoot('mongodb://root:rootSellia!@localhost', {dbName: 'chatRoom'}), 
		UserModule,
		AuthModule,
		SearchUserModule,
		ContactsModule,
		ChatsSocketModule,
		ChatsModule,
		MessagesModule,
		ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
      serveRoot: '/static',
    }),
	],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
