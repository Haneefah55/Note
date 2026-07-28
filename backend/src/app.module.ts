import { Module } from "@nestjs/common";
import { UserModule } from "./user/user.module";
import "dotenv/config";

import { DatabaseModule } from "./database/database.module";

@Module({
    imports: [AuthModule, DatabaseModule],
    controllers: [],
    providers: []
})
export class AppModule {}
