import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CanvasComponent } from './canvas/canvas.component';
import { CanvasWhiteboardModule } from 'ng2-canvas-whiteboard';

@NgModule({
  imports: [CommonModule, CanvasWhiteboardModule,],
  declarations: [CanvasComponent],
  exports:[ CanvasComponent]
})
export class UiCanvasModule {}
