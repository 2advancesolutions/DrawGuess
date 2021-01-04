import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ChatService } from './services/chat.service';
import {
  CanvasWhiteboardComponent,
  CanvasWhiteboardService,
  CanvasWhiteboardShapeService, CircleShape, SmileyShape, StarShape, LineShape, RectangleShape
} from 'ng2-canvas-whiteboard';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'angular-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  
  @ViewChild(CanvasWhiteboardComponent) canvasWhiteboardComponent: CanvasWhiteboardComponent;

  private _$destory: Subject<boolean> = new Subject<boolean>();

  public userCount$ = this.chatService.getUsers();
  public message: string = '';
  public messages: string[] = [];

  constructor(
    private chatService: ChatService,
    private canvasWhiteboardService: CanvasWhiteboardService,
    private canvasWhiteboardShapeService: CanvasWhiteboardShapeService
  ) { }
 
  ngOnDestroy(): void {
    this._$destory.next(true);
    this._$destory.complete();
  }

  ngOnInit() {
    this.canvasWhiteboardShapeService.unregisterShapes([CircleShape, SmileyShape, StarShape, LineShape, RectangleShape]);
    this.chatService.receivedMessage()
    .pipe(takeUntil(this._$destory))
    .subscribe((message: any) => this.canvasWhiteboardService.drawCanvas(message));
    
    this.userCount$
    .pipe(takeUntil(this._$destory))
    .subscribe((count: number) => count);
  }

  draw(e){
    this.chatService.sendMessage(e);
  }
}
