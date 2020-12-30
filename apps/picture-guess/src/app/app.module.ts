import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { CanvasWhiteboardModule } from 'ng2-canvas-whiteboard';
const config: SocketIoConfig = { url: 'http://localhost:3001', options: {}};

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, HttpClientModule,  CanvasWhiteboardModule,
    SocketIoModule.forRoot(config)],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
