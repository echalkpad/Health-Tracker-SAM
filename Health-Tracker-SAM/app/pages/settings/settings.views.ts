import { Component, EventEmitter, Output, ElementRef, Directive, Renderer } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {SettingsModel, ISettings, ITracker, ItemType} from './settings.model';
import {Views} from '../../sam/sam.views';

@Directive({
    selector: '[redify]'
})
export class Redify {
    constructor(private _element: ElementRef, private _renderer: Renderer) {
        _renderer.setElementStyle(_element, 'color', 'red');
    }
}

export class SettingsViews extends Views {
    sheet: "in Views";
    calendar: "in Views";
    constructor() {
        super();
    }

    @Output() updated: EventEmitter<any> = new EventEmitter();

    display(representation): void {
        this.representation = representation;
        this.updated.emit(representation);
    }
    toComponent(template, directives) {
        @Component({ selector: 'settings', template: template, directives: directives })
        class FakeComponent { }

        return FakeComponent;
    }

    // State representation of the ready state
    ready(model) {
        @Component({
            selector: 'ready',
            directives: [Redify],
            template: '<div #readyContent></div>'
        })
        class Ready {
        }
        let readyTemplate = `
    <ion-list>Current Settings:
        <ion-item>User name: ` + model.settingsData.displayName + `</ion-item>
        <ion-item>Calendar: ` + model.settingsData.calendar + `</ion-item>
        <ion-item>Sheet: ` + model.settingsData.sheet + `</ion-item>`;
        console.log("view1=" + readyTemplate);
        // loop thru tracker types
        if (model.settingsData.hasOwnProperty("trackerTypes")) {
            for (var item of model.settingsData.trackerTypes) {
                readyTemplate += `<ion-item>Tracker: ` + item.itemName + ` type=` + item.itemType + `</ion-item>`;
            }
        }
        console.log("view2=" + readyTemplate);
        readyTemplate += `</ion-list>
    <ion-list class="settings-form">
        <form #settingsForm="ngForm">
            <ion-label fixed>Calendar</ion-label>
            <ion-input #newCalendar id="calendar" type="text" class="form-control" required placeholder="Calendar name" ngControl="calendar">` +
                    model.settingsData.calendar + `</ion-input>
            <ion-label fixed>Sheet name</ion-label>
            <ion-input #newSheet id="sheet" type="text" class="form-control" required placeholder="Sheet name" ngControl="sheet">` +
                model.settingsData.sheet + `</ion-input>
            <button id="save" primary (click)="settings.actions.save(settingsForm.value)">Save</button>
            </form>
     </ion-list>
`;
        console.log("view3=" + readyTemplate);
        return this.toComponent(readyTemplate, []);
    };
}