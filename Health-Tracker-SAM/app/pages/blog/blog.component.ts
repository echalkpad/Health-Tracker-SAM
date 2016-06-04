import {Component, ComponentRef, ViewChild, ViewContainerRef, Sam, BlogActions, BlogModel, BlogState, BlogViews, DynamicComponentLoader, ElementRef} from './blog.exports';
import {IONIC_DIRECTIVES}   from 'ionic-angular';
import {FORM_DIRECTIVES} from '@angular/common';
import {DatabaseService} from '../../services/database.service';
import {AuthService} from '../../services/auth.service';
import {FirebaseAuth} from 'angularfire2';
// This sample was inspired from @rajaraodv
// https://medium.com/@rajaraodv/a-guide-for-building-a-react-redux-crud-app-7fe0b8943d0f#.e7501tdde


@Component({
    selector: 'blog',
    directives: [IONIC_DIRECTIVES, FORM_DIRECTIVES],
    templateUrl: 'build/pages/blog/blog.template.html'
})
export class BlogComponent extends Sam<BlogActions, BlogModel, BlogState, BlogViews, DatabaseService, AuthService> {
    private component: any;
    // `ViewContainerRef` from an element in the view
    @ViewChild('blog', { read: ViewContainerRef }) blog;

    constructor(private loader: DynamicComponentLoader, private elementRef: ElementRef, private fbAuth: FirebaseAuth) {
        super(BlogActions, BlogModel, BlogState, BlogViews, DatabaseService, AuthService);
    }

    ngOnInit() {
        this.actions.init();
        this.auth.auth = this.fbAuth;
        this.auth.init();
        this.model.init();  // load data
        
        this.views.updated.subscribe((representation) => {
            // Not sure how efficient this is at replacing the DOM. Gut tells me it's expensive.
            // Could create a single view/template with ngIfs and a ViewModel that it would bind to.
            // ViewModel properties would update based on state.
            this.loader.loadNextToLocation(representation, this.blog).then((component) => {
                if (this.component) {
                    this.component.destroy();
                }
                if (component && component.instance) {
                    //console.log("instance=" + JSON.stringify(component.instance));
                    component.instance.blog = this;
                    this.component = component;
                } else {
                    alert('missing component or instance');
                }
            });
        });

        this.views.updated.next(this.views.representation);
    }
}