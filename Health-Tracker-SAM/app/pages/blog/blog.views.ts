import { Component, EventEmitter, Output, ElementRef, Directive, Renderer, Input, ViewChild } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {BlogModel} from './blog.model';
import {Views} from '../../sam/sam.views';

@Directive({
    selector: '[redify]'
})
export class Redify {
    constructor(private _element: ElementRef, private _renderer: Renderer) {
        _renderer.setElementStyle(_element, 'color', 'red');
    }
}

export class BlogViews extends Views {
    constructor() {
        super();
    }

    @Output() updated: EventEmitter<any> = new EventEmitter();

    display(representation): void {
        this.representation = representation;
        this.updated.emit(representation);
    }

    toComponent(template, directives) {
        @Component({ selector: 'blog', template: template, directives: directives })
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
            <ion-list class="blog-post">` +
            model.posts.map(function (e) {
                return (`
                    <ion-item> <h3 class="blog-post-title" (click)="blog.actions.edit({key: '` +
                        e.key + `', title: '` + encodeURI(e.title) + `', description: '` + encodeURI(e.description) +
                        `'})" >` + e.title + `
                  </h3>
                    <p class="blog-post-meta" >` + e.description + `</p>
                        <button danger class="blog-post-delete-button"(click) = "blog.actions.delete({key: '` + e.key + `'})" > Delete </button>
                    </ion-item>`)}) + `
                    <form #postForm="ngForm">
                       <ion-label fixed>Title</ion-label>
                       <ion-input #newTitle id="title" type="text" class="form-control" required placeholder="Title" ngControl="title"></ion-input>
                       <ion-label fixed>Description</ion-label>
                       <ion-input #newDesc id="description" type="textarea" class="form-control" required placeholder="Description" ngControl="description"></ion-input>
                       <button id="save" primary (click)="blog.actions.save(postForm.value)">Save</button>
                     </form>
                </ion-list>
`;
        return this.toComponent(readyTemplate, []);
    };
}