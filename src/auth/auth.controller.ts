import { Controller, Post, Request, Get, Body, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/signIn.dto';
import { AuthGuard } from './guards/auth.guard';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import { Roles } from './decorators/roles.decorator';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @ApiConsumes('application/json')
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        username: {
          type: "string"
        },
        password: {
          type: "string"
        }

      }
    }
  })
  @Roles(['login'])
  @HttpCode(HttpStatus.OK)
  @Post("login")
  signIn(@Body() signInDto: SignInDto) {
    console.log(signInDto)
    return this.authService.signIn(signInDto.username, signInDto.password)
  }



  @UseGuards(AuthGuard)
  @Get("current-profile")
  getProfile(@Request() request) {
    return request.user
  }
}


