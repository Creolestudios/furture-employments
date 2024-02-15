import { Args, Int, Mutation, Resolver } from '@nestjs/graphql';
import { Inject, UsePipes, ValidationPipe } from '@nestjs/common';

import { AuthService } from './auth.service';
import {
  ForgetPasswordDTO,
  ResetPasswordDTO,
  SignInDTO,
  SignInResponse,
} from '../../dto/auth/auth.dto';
import { MessageResponse } from '../../dto';

@Resolver()
@UsePipes(ValidationPipe)
export class AuthResolver {
  constructor(@Inject(AuthService) private authService: AuthService) {}

  // REVIEW Ankit, Dinesh, Nilesh
  // UsePipes decorator you can use globally in resolver class as well as in project. so you not need to import repeatedly.
  // Review comment resolved
  @Mutation(() => SignInResponse)
  async signIn(@Args('signInDto') signInDto: SignInDTO) {
    return this.authService.signInService(signInDto);
  }

  @Mutation(() => MessageResponse)
  async forgetPassword(
    @Args('forgetPasswordDto') forgetPasswordDto: ForgetPasswordDTO,
  ) {
    return this.authService.forgetPasswordService(forgetPasswordDto);
  }

  @Mutation(() => MessageResponse)
  async resetPassword(
    @Args('resetPasswordDto') resetPasswordDto: ResetPasswordDTO,
  ) {
    return this.authService.resetPasswordService(resetPasswordDto);
  }

  @Mutation(() => String)
  async linkedinAuthURL(@Args({ name: 'role', type: () => Int }) role: number) {
    return await this.authService.generateAuthUrl(role);
  }

  @Mutation(() => SignInResponse)
  async logInLinkedIn(
    @Args({ name: 'code', nullable: true }) code: string,
    @Args({ name: 'role', type: () => Int }) role: number,
  ) {
    return await this.authService.loginLinkedin(code, role);
  }
}
