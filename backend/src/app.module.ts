import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { MqttModule } from './mqtt/mqtt.module';
import { OperatorModule } from './operator/operator.module';
import { CustomerModule } from './customer/customer.module';
import { NodoModule } from './nodo/nodo.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [MqttModule, OperatorModule, CustomerModule, NodoModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
