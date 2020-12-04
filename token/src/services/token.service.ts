import { Injectable } from '@nestjs/common';
import { Model,  } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { GetTokensFilterDto, CreateTokenDto } from '../dto';
import { Token } from '../interfaces';

@Injectable()
export class TokenService {
  constructor(@InjectModel('Token') private readonly tokenModel: Model<Token>) {}

  // fetch all tokens
  async getAllTokens(): Promise<Token[]> {
    const tokens = await this.tokenModel.find().exec();
    return tokens;
  }

  // get filtered tokens
  async getFilteredTokens(filterDto: GetTokensFilterDto): Promise<Token[]> {
    const { userId } = filterDto;
    let tokens = await this.getAllTokens();

    if (userId) {
      tokens = tokens.filter((token) => token.userId === userId);
    }

    return tokens;
  }

  // Get a single token
  async getToken(tokenId): Promise<Token> {
    const token = await this.tokenModel.findById(tokenId).exec();
    return token;
  }

  // post a single token
  async addToken(createTokenDto: CreateTokenDto): Promise<Token> {
    const newToken = new this.tokenModel(createTokenDto);
    return newToken.save();
  }

  // Edit token details
  async updateToken(tokenId, createTokenDto: CreateTokenDto): Promise<Token> {
    const updatedToken = await this.tokenModel.findByIdAndUpdate(tokenId, createTokenDto, { new: true });
    return updatedToken;
  }

  // Delete a token
  async deleteToken(tokenId): Promise<any> {
    const deletedToken = await this.tokenModel.findByIdAndRemove(tokenId);
    return deletedToken;
  }
}
