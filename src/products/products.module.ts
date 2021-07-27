import { Module } from '@nestjs/common';
import { ProdutsController } from './products.controller';
import { ProductService } from './products.service';
@Module({
  controllers: [ProdutsController],
  providers: [ProductService],
})
export class ProductsModule {}
