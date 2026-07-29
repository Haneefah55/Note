import { Module } from "@nestjs/common";
import "dotenv/config";

import { DatabaseModule } from "./database/database.module";
import { AccountModule } from './account/account.module';
import { AuthModule } from "./auth/auth.module";

@Module({
    imports: [AuthModule, DatabaseModule, AccountModule],
    controllers: [],
    providers: []
})
export class AppModule {}
