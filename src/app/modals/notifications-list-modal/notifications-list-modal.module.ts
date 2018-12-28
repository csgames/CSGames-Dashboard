import { NgModule } from "@angular/core";
import { NotificationsListModalComponent } from "./notifications-list-modal.component";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { FlexLayoutModule } from "@angular/flex-layout";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        FlexLayoutModule
    ],
    exports: [],
    declarations: [NotificationsListModalComponent],
    providers: []
})
export class NotificationsListModalModule {}
