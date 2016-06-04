import { Component, EventEmitter, Output, ElementRef, Directive, Renderer, Input, ViewChild } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {TrackerModel} from './tracker.model';
import {Views} from '../../sam/sam.views';

@Directive({
    selector: '[redify]'
})
export class Redify {
    constructor(private _element: ElementRef, private _renderer: Renderer) {
        _renderer.setElementStyle(_element, 'color', 'red');
    }
}

export class TrackerViews extends Views {
    constructor() {
        super();
    }

    @Output() updated: EventEmitter<any> = new EventEmitter();

    display(representation): void {
        this.representation = representation;
        this.updated.emit(representation);
    }

    toComponent(template, directives) {
        @Component({ selector: 'tracker', template: template, directives: directives })
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
        var readyTemplate = `
            <ion-list class="tracker-item">` +
            model.trackerItems.map(function (e) {
            //console.log("tracker item=" + JSON.stringify(e));
                return (`
                    <ion-item> <h3 class="tracker-item-title" (click)="tracker.actions.edit({date: '` +
                        e.date + `', weight: '` + encodeURI(e.weight) + `', exercise: '` + encodeURI(e.exercise) +
                        `'})" >` + e.date + `
                  </h3>
                    <p class="tracker-item-meta" >` + e.exercise + `</p>
                        <button danger class="tracker-item-delete-button"(click) = "tracker.actions.delete({date: '` + e.date + `'})" > Delete </button>
                    </ion-item>`)}) + `
                    <form #postForm="ngForm">
                        <ion-label>Date</ion-label>
                        <ion-datetime #newDate id="tdate" class="form-control" required displayFormat="D-M-YYYY" ngControl="date"></ion-datetime>
                       <ion-label fixed>Notes</ion-label>
                       <ion-input #newNotes id="notes" type="text" class="form-control" required placeholder="Notes" ngControl="notes"></ion-input>
                       <ion-label fixed>Exercise</ion-label>
                       <ion-input #newDesc id="exercise" type="textarea" class="form-control" required placeholder="Exercise" ngControl="exercise"></ion-input>
                       <button id="save" primary (click)="tracker.actions.save(postForm.value)">Save</button>
                     </form>
                </ion-list>
`;
        return this.toComponent(readyTemplate, []);
    };
}