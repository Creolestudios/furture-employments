import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ApplicationService } from './application.service';
import { Inject, UseGuards } from '@nestjs/common';
import { getAllAuthorized, getAuthorizedRoles } from '../../utils';
import { RoleAuthorizationGuard } from '../../utils/guards/roleAuthorizationGuard';
import {
  ApplicationsByVacancyResponse,
  ApplicationsListResponse,
} from '../../dto/admin/application.dto';

import { Role } from '../../utils/enum';
import {
  ApplicationResponse,
  GetApplicationsResponse,
} from '../../entity/candidate/application';
import { MessageResponse } from '../../dto';
import { user } from '../../utils/decorators/user.decorator';

// REVIEW remove commented code
//NOTE - resolved
@Resolver()
export class ApplicationResolver {
  constructor(
    @Inject(ApplicationService) private applicationService: ApplicationService,
  ) {}

  @UseGuards(new RoleAuthorizationGuard(getAuthorizedRoles()))
  @Mutation(() => MessageResponse)
  async applicationApprove(
    @Args({ name: 'applicationId', type: () => Int }) applicationId: number,
    @Args({ name: 'approveReason' }) approveReason: string,
    @user(['id']) adminId: number,
  ) {
    return this.applicationService.approveApplicationService(
      applicationId,
      approveReason,
      adminId,
    );
  }

  @Mutation(() => MessageResponse)
  async rejectApplication(
    @Args('rejectReason') rejectReason: string,
    @Args({ name: 'applicationId', type: () => Int }) applicationId: number,
  ) {
    return this.applicationService.rejectApplicationService(
      rejectReason,
      applicationId,
    );
  }

  @UseGuards(new RoleAuthorizationGuard(getAuthorizedRoles()))
  @Query(() => ApplicationsListResponse)
  getApplicationsForAdmin(
    @Args({ name: 'current', type: () => Int }) current: number,
    @Args({ name: 'pageSize', type: () => Int })
    pageSize: number,
  ) {
    return this.applicationService.getAdminApplicationsService({
      current,
      pageSize,
    });
  }

  @UseGuards(new RoleAuthorizationGuard(getAuthorizedRoles(Role.EMPLOYER)))
  @Query(() => ApplicationsListResponse)
  getApplicationsForEmployer(
    @Args({ name: 'current', type: () => Int }) current: number,
    @Args({ name: 'pageSize', type: () => Int })
    pageSize: number,
    // REVIEW check naming convention
    //NOTE - resolved
    @user(['id']) userId: number,
  ) {
    return this.applicationService.getEmployerApplicationsService({
      current,
      pageSize,
      userId,
    });
  }

  @UseGuards(new RoleAuthorizationGuard(getAuthorizedRoles(Role.CANDIDATE)))
  @Query(() => GetApplicationsResponse)
  getApplicationsForCandidate(
    @Args({ name: 'current', type: () => Int }) current: number,
    @Args({ name: 'pageSize', type: () => Int })
    pageSize: number,
    // REVIEW check naming convention
    //NOTE - resolved
    @user(['id']) userId: number,
    @Args({
      name: 'candidateId',
      type: () => Int,
      nullable: true,
    })
    candidateId: number,
  ) {
    return this.applicationService.getCandidateApplicationsService({
      current,
      pageSize,
      userId,
      candidateId,
    });
  }

  @UseGuards(new RoleAuthorizationGuard(getAuthorizedRoles(Role.ADMIN)))
  @Query(() => GetApplicationsResponse)
  getCandidateApplicationsForAdmin(
    @Args({ name: 'current', type: () => Int }) current: number,
    @Args({ name: 'pageSize', type: () => Int })
    pageSize: number,
    @Args({ name: 'userId', type: () => Int }) userId: number,
    // @user(['id']) userId: number,
  ) {
    return this.applicationService.getCandidateApplicationsForAdminService({
      current,
      pageSize,
      userId,
    });
  }

  @UseGuards(new RoleAuthorizationGuard(getAuthorizedRoles(Role.EMPLOYER)))
  @Query(() => ApplicationsByVacancyResponse)
  getApplicationByVacancy(
    @Args({ name: 'current', type: () => Int }) current: number,
    @Args({ name: 'pageSize', type: () => Int })
    pageSize: number,
    @Args({ name: 'vacancyId', type: () => Int, nullable: true })
    vacancyId: number,
  ) {
    return this.applicationService.getApplicationByVacancyService({
      current,
      pageSize,
      vacancyId,
    });
  }

  @UseGuards(new RoleAuthorizationGuard(getAllAuthorized()))
  @Mutation(() => MessageResponse)
  async shortListApplication(
    @Args({ name: 'applicationId', type: () => Int }) applicationId: number,
  ) {
    return await this.applicationService.applicationShortlisted(applicationId);
  }

  @UseGuards(new RoleAuthorizationGuard(getAllAuthorized()))
  @Mutation(() => MessageResponse)
  async acceptApplication(
    @Args({ name: 'applicationId', type: () => Int }) applicationId: number,
  ) {
    return await this.applicationService.applicationAccepted(applicationId);
  }

  @UseGuards(new RoleAuthorizationGuard(getAllAuthorized()))
  @Query(() => ApplicationResponse)
  getCandidateApplicationDetail(
    @Args('applicationId', { type: () => Int }) applicationId: number,
  ) {
    return this.applicationService.findCandidateApplication(applicationId);
  }

  @UseGuards(new RoleAuthorizationGuard(getAuthorizedRoles()))
  @Query(() => ApplicationsListResponse)
  async getApplicationsWaitingForApproval() {
    return this.applicationService.getApplicationsWaitingForApprovalService();
  }
}
