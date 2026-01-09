import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MqttModule } from './mqtt/mqtt.module';
import { OperatorModule } from './operator/operator.module';
import { CustomerModule } from './customer/customer.module';

@Module({
  imports: [MqttModule, OperatorModule, CustomerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
