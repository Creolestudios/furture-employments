import {
  EmployerProfileEditDto,
  EmployerRegistrationDTO,
} from './../../dto/employerRegistration/employerRegistration.dto';
import { Inject, UsePipes, UseGuards, ValidationPipe } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
  EmployerEntity,
  EmployerResponse,
} from '../../entity/employerRegistration/employerRegistration.entity';
import { EmployerService } from './employer.service';
import { RoleAuthorizationGuard } from '../../utils/guards/roleAuthorizationGuard';
import { Role } from '../../utils/enum';
import { getAuthorizedRoles } from '../../utils';
import { user } from '../../utils/decorators/user.decorator';
import { ApplicationPerVacancy } from '../../dto/vacancy/vacancy.dto';
import { UserRegistrationResponse } from '../../dto';

@Resolver(() => EmployerEntity)
export class EmployerResolver {
  constructor(
    @Inject(EmployerService) private employerService: EmployerService,
  ) {}

  @UsePipes(ValidationPipe)
  @UseGuards(new RoleAuthorizationGuard(Role.EMPLOYER_SIGN_UP))
  @Mutation(() => UserRegistrationResponse)
  async employerRegistration(
    @Args('employerRegisterDto') employerRegisterDto: EmployerRegistrationDTO,
  ) {
    return await this.employerService.employerRegisterService(
      employerRegisterDto,
    );
  }

  @UsePipes(ValidationPipe)
  @UseGuards(new RoleAuthorizationGuard(Role.EMPLOYER))
  @Query(() => EmployerResponse)
  async getEmployerDetails(
    @Args({ name: 'userId', type: () => Int }) userId: number,
  ) {
    return await this.employerService.getEmployerService(userId);
  }

  @UsePipes(ValidationPipe)
  @UseGuards(new RoleAuthorizationGuard(getAuthorizedRoles(Role.EMPLOYER)))
  @Query(() => EmployerResponse)
  async getEmployerDetailsById(
    @Args({ name: 'employerId', type: () => Int }) employerId: number,
  ) {
    return await this.employerService.getEmployerByIdService(employerId);
  }

  @UsePipes(ValidationPipe)
  @UseGuards(
    new RoleAuthorizationGuard([Role.ADMIN, Role.EMPLOYER, Role.SUPER_ADMIN]),
  )
  @Mutation(() => UserRegistrationResponse)
  async updateEmployerProfile(
    @Args('profileDataDTO') profileData: EmployerProfileEditDto,
    @Args('userId') userId: number,
  ) {
    return await this.employerService.updateEmployerProfileService(
      profileData,
      userId,
    );
  }
  @UseGuards(new RoleAuthorizationGuard(getAuthorizedRoles(Role.EMPLOYER)))
  @Query(() => ApplicationPerVacancy)
  getApplicationsByEmployer(
    @Args({ name: 'current', type: () => Int }) current: number,
    @Args({ name: 'pageSize', type: () => Int }) pageSize: number,
    // REVIEW naming convention
    //NOTE - resolved
    @user(['id']) userId: number,
  ) {
    return this.employerService.getApplicationsByEmployerService(
      current,
      pageSize,
      userId,
    );
  }
}
