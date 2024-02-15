import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { VacancyService } from 'src/web/vacancy/vacancy.service';

@Injectable()
export class TaskScheduleService {
  constructor(private vacancyService: VacancyService) {}

  @Cron('0 0 * * *')
  handleCron() {
    this.vacancyService.updateCampaignStatusOnExpire();
  }
}
