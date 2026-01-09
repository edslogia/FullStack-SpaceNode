import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { MqttService } from './mqtt/mqtt.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly mqttService: MqttService,
  ) {}


  @Get()
  getStatus(): string  {
    return this.appService.getStatus();;
  }

  /**
   * Endpoint de testing para publicar mensajes MQTT
   * POST /mqtt/publish
   * Body: { topic: string, message: any }
   */
  @Post('mqtt/publish')
  publishMqtt(@Body() body: { topic: string; message: any }): { success: boolean; topic: string } {
    this.mqttService.publish(body.topic, body.message);
    return {
      success: true,
      topic: body.topic,
    };
  }
}
