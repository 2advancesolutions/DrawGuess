import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Message } from '@angular/api-interfaces';
import { ChatService } from './services/chat.service';
import {
  CanvasWhiteboardComponent,
  CanvasWhiteboardService,
  CanvasWhiteboardUpdate,
  CanvasWhiteboardOptions,
  CanvasWhiteboardShapeService, CircleShape, SmileyShape, StarShape, LineShape, RectangleShape
} from 'ng2-canvas-whiteboard';

@Component({
  selector: 'angular-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  @ViewChild(CanvasWhiteboardComponent) canvasWhiteboardComponent: CanvasWhiteboardComponent;
  
  hello$ = this.http.get<Message>('/api/hello');

  public users: number = 0;
  public message: string = '';
  public messages: string[] = [];
  canvasOptions: any;

  constructor(private http: HttpClient,
    private chatService: ChatService,
    private canvasWhiteboardService: CanvasWhiteboardService,
    private canvasWhiteboardShapeService: CanvasWhiteboardShapeService
  ) { }

  ngOnInit() {
    this.canvasWhiteboardShapeService.unregisterShapes([CircleShape, SmileyShape, StarShape, LineShape, RectangleShape]);
    this.chatService.receivedMessage().subscribe((message: any) => {
       // Draw the updates onto the canvas
       this.canvasWhiteboardService.drawCanvas(message);
    });
    this.chatService.getUsers().subscribe((users: number) => {
      this.users = users;
      console.log(`number of users conneded ${this.users}`);
    });
  }

  saveToStorage(): void {
    // Get the current full update history
    const updates: Array<CanvasWhiteboardUpdate> = this.canvasWhiteboardComponent.getDrawingHistory();
    // Stringify the updates, which will return an Array<string>
    const stringifiedUpdatesArray: Array<string> = updates.map(update => update.stringify());
    // Stringify the Array<string> to get a "string", so we are now ready to put this item in the storage
    const stringifiedStorageUpdates: string = JSON.stringify(stringifiedUpdatesArray);
    // Save the item in storage of choice
    sessionStorage.setItem('canvasWhiteboardDrawings', stringifiedStorageUpdates);
  }

  loadFromStorage(): void {
    // Get the "string" from the storage
    const canvasDrawingsJson: string = sessionStorage.getItem('canvasWhiteboardDrawings');
    // Null check
    if (canvasDrawingsJson != null) {
      // Parse the string, and get an Array<string>
      const parsedStorageUpdates: Array<string> = JSON.parse(canvasDrawingsJson);
      // Parse each string inside the Array<string>, and get an Array<CanvasWhiteboardUpdate>
      const updates: Array<CanvasWhiteboardUpdate> = parsedStorageUpdates.map(updateJSON =>
        CanvasWhiteboardUpdate.deserializeJson(updateJSON));
      // Draw the updates onto the canvas
      this.canvasWhiteboardService.drawCanvas(updates);
    }
  }

  public changeOptions(): void {
    this.canvasOptions = {
      ...this.canvasOptions,
      fillColorPickerEnabled: false,
      colorPickerEnabled: false
    };
  }

  onCanvasDraw(e){
    this.chatService.sendMessage(e);
    this.saveToStorage();
  }
}
