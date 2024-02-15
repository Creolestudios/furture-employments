import { Inject, UseGuards } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';

import { UserResponse } from '../../dto/user/userRegister.dto';
import { UserEntity } from '../../entity/user/user.entity';
import { UserService } from './user.service';
import { JwtAuthenticationGuard } from '../../utils/guards/jwtAuthenticationGuard';
import { user } from '../../utils/decorators/user.decorator';
import { ListResponse } from '../../dto/lists/listResponse.dto';

@Resolver(() => UserEntity)
export class UserResolver {
  constructor(@Inject(UserService) private userService: UserService) {}

  @Query(() => String)
  async hello() {
    return 'Future Employments backend';
  }

  @Query(() => UserResponse)
  @UseGuards(JwtAuthenticationGuard)
  async getUserDetails(@user(['id']) userId: number) {
    return this.userService.getUserDetailService(userId);
  }

  @Query(() => ListResponse)
  async getList() {
    const res = await this.userService.getListView();
    const country = res.country
    const language=res.language
    const JobCat = res.jobCat
    const JobType = res.JobType
    return {country, language, JobCat , JobType}
  }
}
