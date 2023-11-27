import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

export function addSwaggerToApp(app: INestApplication){
    const config = new DocumentBuilder()
    .setTitle('api doc')
    .setDescription('The API description')
    .setVersion('1.0')
    // .addBearerAuth({ 
    //   name: 'Authorization',
    //   type: 'http', // I`ve attempted type: 'apiKey' too
    //   in: 'Header'
    // },
    // 'Authorization',)
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
}