import { DynamicModule, Global, Module } from '@nestjs/common';
import { Pool } from 'pg';
import { DrizzleService } from './drizzle.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

export const CONNECTION_POOL = 'CONNECTION_POOL';

@Global()
@Module({})
export class DatabaseModule {
    static forRootAsync(): DynamicModule {
        return {
            module: DatabaseModule,
            imports: [ConfigModule],
            providers: [
                DrizzleService,
                {
                    provide: CONNECTION_POOL,
                    inject: [ConfigService],
                    useFactory: (ConfigService: ConfigService) => {
                        const databaseOptions = {
                            host: ConfigService.get<string>('POSTGRES_HOST') || 'localhost',
                            port: ConfigService.get<number>('POSTGRES_PORT') || 5432,
                            user: ConfigService.get<string>('POSTGRES_USER')!,
                            password: ConfigService.get<string>('POSTGRES_PASSWORD')!,
                            database: ConfigService.get<string>('POSTGRES_DB')!,
                        };
                        console.log("Databse option loaded:", databaseOptions);
                        return new Pool(databaseOptions);
                    },
                },
            ],
            exports: [DrizzleService, CONNECTION_POOL],
        }
    }
}
