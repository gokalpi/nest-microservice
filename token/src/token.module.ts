import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TokenController } from './controllers';
import { TokenSchema } from './schemas';
import { TokenService } from './services';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/ms-token', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    }),
    MongooseModule.forFeature([{ name: 'Token', schema: TokenSchema }]),
  ],
  controllers: [TokenController],
  providers: [TokenService],
})
export class TokenModule {}
