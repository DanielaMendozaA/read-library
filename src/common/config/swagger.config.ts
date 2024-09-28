import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

export const SwaggerConfig = (app: INestApplication<any>): void => {
    const versionApp = "1.0"
    const config = new DocumentBuilder()
        .setTitle('Read and Learn Library')
        .setDescription(`Books api software`)
        .setVersion(versionApp)   
        .addServer('/api')
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup(`api/v1/docs`, app, document);
}   