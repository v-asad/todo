import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { MongooseModule } from '@nestjs/mongoose';
import { TodosModule } from './todos/todos.module';

const MONGO_URL = 'mongodb://localhost:27017/todos';

@Module({
  imports: [MongooseModule.forRoot(MONGO_URL), TodosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
