import { EnvironmentConfig } from './config.types';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import {
  EnvironmentEnum,
  DatabaseTypeEnum,
  ProcessEnvEnum,
} from './config.types';

@Injectable()
export class AppConfigService {
  private environmentConfig: EnvironmentConfig;

  constructor(private config: ConfigService) {
    const environment =
      (this.getEnvVal(ProcessEnvEnum.NODE_ENV) as EnvironmentEnum) ||
      EnvironmentEnum.Development;

    this.environmentConfig = {
      environment,
      port: parseInt(this.getEnvVal(ProcessEnvEnum.PORT), 10) || 3001,
      database: {
        type: DatabaseTypeEnum.Postgres,
        host: this.getEnvVal(ProcessEnvEnum.DATABASE_HOST),
        port: parseInt(this.getEnvVal(ProcessEnvEnum.DATABASE_PORT), 10),
        username: this.getEnvVal(ProcessEnvEnum.DATABASE_USER),
        password: this.getEnvVal(ProcessEnvEnum.DATABASE_PASSWORD),
        database: this.getEnvVal(ProcessEnvEnum.DATABASE_NAME),
        synchronize: environment === EnvironmentEnum.Development,
        autoLoadEntities: true,
      },
      meili: {
        host: this.getEnvVal(ProcessEnvEnum.MEILI_HOST),
        apiKey: this.getEnvVal(ProcessEnvEnum.MEILI_KEY),
      },
      jwt: {
        secret: this.getEnvVal(ProcessEnvEnum.JWT_SECRET),
        expiresIn: this.getEnvVal(ProcessEnvEnum.JWT_EXPIRATION_TIME),
      },
      googleOAuthConfig: {
        clientID: this.getEnvVal(ProcessEnvEnum.GOOGLE_CLIENT_ID),
        clientSecret: this.getEnvVal(ProcessEnvEnum.GOOGLE_CLIENT_SECRET),
        callbackURL: this.getEnvVal(ProcessEnvEnum.GOOGLE_CALLBACK_URL),
      },
    };
  }

  public getEnvVal(key: ProcessEnvEnum): string {
    const value = this.config.get<string>(key);

    if (!value) {
      throw new Error(`Environment variable ${key} is not defined`);
    }
    return value;
  }

  public getPort(): number {
    return this.environmentConfig.port;
  }

  public getEnvironmentConfig(): EnvironmentConfig {
    return this.environmentConfig;
  }

  public getDatabaseConfig() {
    return this.environmentConfig?.database;
  }

  public getMeiliConfig() {
    return this.environmentConfig?.meili;
  }

  public getJwtConfig() {
    return this.environmentConfig?.jwt;
  }
}
