import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import * as mqtt from 'mqtt';

@Injectable()
export class MqttService implements OnModuleInit {
  private client: mqtt.MqttClient;
  private readonly logger = new Logger(MqttService.name);

  // Configuración del broker MQTT
  private readonly brokerUrl = process.env.MQTT_BROKER_URL || 'mqtt://localhost:1883';
  // Las credenciales son opcionales (EMQX permite anónimo por defecto).
  private getBrokerOptions(): mqtt.IClientOptions {
    const options: mqtt.IClientOptions = {
      clientId: 'spacenode-backend',
      reconnectPeriod: 5000,
    };
    if (process.env.MQTT_USERNAME && process.env.MQTT_PASSWORD) {
      options.username = process.env.MQTT_USERNAME;
      options.password = process.env.MQTT_PASSWORD;
    }
    return options;
  }

  async onModuleInit() {
    await this.connect();
  }

  /**
   * Conecta al broker MQTT
   */
  private async connect(): Promise<void> {
    this.client = mqtt.connect(this.brokerUrl, this.getBrokerOptions());

    this.client.on('connect', () => {
      this.logger.log('Conectado al broker MQTT');
      this.subscribe();
    });

    this.client.on('message', (topic: string, message: Buffer) => {
      this.handleMessage(topic, message);
    });

    this.client.on('error', (error) => {
      this.logger.error(`Error MQTT: ${error.message}`);
    });

    this.client.on('reconnect', () => {
      this.logger.log('Reconectando al broker MQTT...');
    });
  }

  /**
   * Se suscribe a los tópicos
   */
  private subscribe(): void {
    // Suscribirse al tópico que publica el ESP32
    const topics = [
      'esp32/telemetry',
    ];

    this.client.subscribe(topics, (error) => {
      if (error) {
        this.logger.error(`Error al suscribirse: ${error.message}`);
      } else {
        this.logger.log(`Suscrito a: ${topics.join(', ')}`);
      }
    });
  }

  /**
   * Maneja los mensajes MQTT recibidos
   */
  private handleMessage(topic: string, message: Buffer): void {
    try {
      const payload = JSON.parse(message.toString());
      this.logger.debug(`[${topic}] ${JSON.stringify(payload)}`);

      // Aquí iría la lógica para procesar telemetría
      // Por ejemplo: guardar en BD, emitir eventos WebSocket, etc.
      this.processTelemetry(topic, payload);
    } catch (error) {
      this.logger.error(
        `Error procesando mensaje de ${topic}: ${error.message}`,
      );
    }
  }

  /**
   * Procesa la telemetría recibida
   */
  private processTelemetry(topic: string, payload: any): void {
    // Lógica de procesamiento de telemetría
    this.logger.log(`Procesando telemetría de: ${topic}`);
    // TODO: Integrar con servicio de guardado en BD y WebSocket
  }

  /**
   * Publica un mensaje MQTT
   */
  publish(topic: string, message: any): void {
    const payload = JSON.stringify(message);
    this.client.publish(topic, payload, (error) => {
      if (error) {
        this.logger.error(`Error publicando en ${topic}: ${error.message}`);
      } else {
        this.logger.debug(`Publicado en ${topic}: ${payload}`);
      }
    });
  }

  /**
   * Desconecta del broker
   */
  disconnect(): void {
    if (this.client) {
      this.client.end();
      this.logger.log('Desconectado del broker MQTT');
    }
  }
}
