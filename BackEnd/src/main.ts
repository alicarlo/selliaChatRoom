import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { 
		logger: ['log']
	});
	const config = new DocumentBuilder()
    .setTitle('API ChatRoom')
    .setDescription('API para la gestion de chatRoom')
    .setVersion('1.0')
    .addTag('chatRoom')
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

	app.enableCors({
    origin: '*',
    methods: ['GET', 'POST'], 
    allowedHeaders: ['Content-Type', 'Authorization'], 
  });

  await app.listen(3000);
}
bootstrap();
