import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { NotificationsComponent } from './notifications.component';
import { NotificationsService } from './notifications.service';
import { PopModule } from '../pop/pop.module';
import { ErrorComponent } from '../error/error.component';

@NgModule({
  declarations: [
    NotificationsComponent,
    ErrorComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    PopModule,
  ],
  exports: [
    NotificationsComponent,
    ErrorComponent,
  ],
  providers: [
    {
      provide: 'useDesktopNotifications',
      useValue: false
    }, NotificationsService]
})
export class NotificationsModule {
}
