import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from '../types';
import { AppConfigService } from 'src/config/config.service';
import { ProcessEnvEnum } from 'src/config/config.types';

@Injectable()
export class AtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(appConfigService: AppConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: appConfigService.getEnvVal(ProcessEnvEnum.AT_SECRET),
    });
  }

  validate(payload: JwtPayload) {
    return payload;
  }
}
