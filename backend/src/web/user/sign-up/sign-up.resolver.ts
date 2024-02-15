import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UserEntity } from '../../../entity/user/user.entity';
import { UserService } from '../user.service';
import { Inject, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserBasicSignupDTO } from '../../../dto/user/userRegister.dto';
import { UserRegistrationResponse } from '../../../dto';

@Resolver(() => UserEntity)
export class SignUpResolver {
  constructor(@Inject(UserService) private userService: UserService) {}

  @UsePipes(new ValidationPipe())
  @Mutation(() => UserRegistrationResponse)
  async createUser(
    @Args('userRegisterDto') userRegisterDto: UserBasicSignupDTO,
  ) {
    return await this.userService.createUserService(userRegisterDto);
  }
}
