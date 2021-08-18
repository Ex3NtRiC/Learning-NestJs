import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './users/user.module';

@Module({
  imports: [
    ProductsModule,
    UserModule,
    MongooseModule.forRoot(
      'Mongo-URI',
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
