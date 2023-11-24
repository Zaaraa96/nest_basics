"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addSwaggerToApp = void 0;
const swagger_1 = require("@nestjs/swagger");
function addSwaggerToApp(app) {
    const config = new swagger_1.DocumentBuilder()
        .setTitle('api doc')
        .setDescription('The API description')
        .setVersion('1.0')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api', app, document);
}
exports.addSwaggerToApp = addSwaggerToApp;
//# sourceMappingURL=swagger.js.map