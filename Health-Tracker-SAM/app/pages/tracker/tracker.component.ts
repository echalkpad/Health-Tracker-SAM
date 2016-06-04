import {Component, ComponentRef, ViewChild, ViewContainerRef, Sam, TrackerActions, TrackerModel, TrackerState, TrackerViews, DynamicComponentLoader, ElementRef} from './tracker.exports';
import {IONIC_DIRECTIVES}   from 'ionic-angular';
import {FORM_DIRECTIVES} from '@angular/common';
import {DatabaseService} from '../../services/database.service';
import {AuthService} from '../../services/auth.service';
import {FirebaseAuth} from 'angularfire2';


@Component({
    selector: 'tracker',
    directives: [IONIC_DIRECTIVES, FORM_DIRECTIVES],
    templateUrl: 'build/pages/tracker/tracker.template.html'
})
export class TrackerComponent extends Sam<TrackerActions, TrackerModel, TrackerState, TrackerViews, DatabaseService, AuthService> {
    private component: any;
    // `ViewContainerRef` from an element in the view
    @ViewChild('tracker', { read: ViewContainerRef }) tracker;

    constructor(private loader: DynamicComponentLoader, private elementRef: ElementRef, private fbAuth: FirebaseAuth) {
        super(TrackerActions, TrackerModel, TrackerState, TrackerViews, DatabaseService, AuthService);
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
            this.loader.loadNextToLocation(representation, this.tracker).then((component) => {
                if (this.component) {
                    this.component.destroy();
                }
                if (component && component.instance) {
                    //console.log("instance=" + JSON.stringify(component.instance));
                    component.instance.tracker = this;
                    this.component = component;
                } else {
                    alert('missing component or instance');
                }
            });
        });

        this.views.updated.next(this.views.representation);
    }
}