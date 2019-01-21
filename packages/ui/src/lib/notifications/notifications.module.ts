import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NotificationsComponent } from './notifications.component';
import { NotificationsService } from './notifications.service';
import { PopModule } from '../pop/pop.module';
import { ErrorComponent } from './error/error.component';
import { IconModule } from '../icon/icon.module';

@NgModule({
  declarations: [
    NotificationsComponent,
    ErrorComponent,
  ],
  imports: [
    CommonModule,
    PopModule,
    IconModule,
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
