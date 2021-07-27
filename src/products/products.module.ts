import { Module } from '@nestjs/common';
import { ProdutsController } from './products.controller';
import { ProductService } from './products.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductSchema } from './product.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Product', schema: ProductSchema }]),
  ],
  controllers: [ProdutsController],
  providers: [ProductService],
})
export class ProductsModule {}
