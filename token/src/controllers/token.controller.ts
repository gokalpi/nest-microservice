import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Query,
  NotFoundException,
  Delete,
  Param,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateTokenDto, GetTokensFilterDto } from '../dto';
import { TokenService } from '../services';

@Controller('tokens')
export class TokenController {
  constructor(private tokenService: TokenService) {}

  // add a token
  @Post()
  @UsePipes(ValidationPipe)
  async addToken(@Body() createTokenDto: CreateTokenDto) {
    const token = await this.tokenService.addToken(createTokenDto);
    return token;
  }

  // Retrieve tokens list
  @Get()
  async getTokens(@Query(ValidationPipe) filterDto: GetTokensFilterDto) {
    if (Object.keys(filterDto).length) {
      const filteredTokens = await this.tokenService.getFilteredTokens(filterDto);
      return filteredTokens;
    } else {
      const allTokens = await this.tokenService.getAllTokens();
      return allTokens;
    }
  }

  // Fetch a particular token using ID
  @Get('/:id')
  async getToken(@Param('id') id) {
    const token = await this.tokenService.getToken(id);
    if (!token) throw new NotFoundException('Token does not exist!');
    return token;
  }

  // Update a token's details
  @Put('/:id')
  async updateToken(@Param('id') id, @Body() createTokenDto: CreateTokenDto) {
    const token = await this.tokenService.updateToken(id, createTokenDto);
    if (!token) throw new NotFoundException('Token does not exist!');
    return token;
  }

  // Delete a token
  @Delete('/:id')
  async deleteToken(@Param('id') id) {
    const token = await this.tokenService.deleteToken(id);
    if (!token) throw new NotFoundException('Token does not exist');
    return token;
  }
}
