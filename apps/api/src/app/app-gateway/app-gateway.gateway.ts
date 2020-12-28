import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit, 
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Socket } from 'socket.io';
import { Server } from 'http';


@WebSocketGateway()
export class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

  @WebSocketServer() wss: Server;

  users: number = 0;
 
  private logger: Logger = new Logger('AppGateway');

  afterInit(server: Server) {
    const timeStamp = new Date();
    this.logger.log('Gateway up and running');
  }
  

  handleConnection(client: Socket, ...args: any[]) {
      // A client has connected
      this.users++;

      // Notify connected clients of current users
    this.wss.emit('users', this.users);
    this.logger.log(`Client disconnected: ${client.id}`);
  }
  
  handleDisconnect(client: Socket) {
     // A client has disconnected
     this.users--;

     // Notify connected clients of current users
     this.wss.emit('users', this.users);
    this.logger.log(`Client connected: ${client.id}`);
  }

  @SubscribeMessage('chat')
  handleMessage(client: Socket, payload: any): void {
    client.broadcast.emit('chat', payload);
  }
}
