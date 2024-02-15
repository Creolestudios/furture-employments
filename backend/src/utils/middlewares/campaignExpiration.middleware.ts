import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

import { InjectRepository } from '@nestjs/typeorm';
import { VacancyCampaignsEntity } from '../../entity/admin/campaign.entity';
import { Repository } from 'typeorm';
import { CampaignsStatus } from '../enum';
// import * as moment from 'moment';
import { GqlNotFoundException } from '../errors/errors';
import { ERROR_MSG } from '../constants';

@Injectable()
export class CampaignExpirationMiddleware implements NestMiddleware {
  constructor(
    @InjectRepository(VacancyCampaignsEntity)
    private readonly campaignRepository: Repository<VacancyCampaignsEntity>,
  ) {}
  async use(req: Request, res: Response, next: NextFunction) {
    try {
      // const { userId, vacancyId } = req.body.variables || {};
      const campaign = await this.campaignRepository.findOne({
        where: { status: CampaignsStatus.START, vacancy: { id: 6 } },
        relations: ['vacancy'],
      });
      if (!campaign) {
        GqlNotFoundException(ERROR_MSG.CAMPAIGN_NOT_FOUND);
      }

      // const currentDateTime = moment(new Date(), 'YYYY-MM-DD HH:mm:ss.SSSSSSZ');
      // const endDate = moment('2023-11-3', 'YYYY-MM-DD HH:mm:ss.SSSSSSZ');
    } catch (error) {}
    next();
  }
}
