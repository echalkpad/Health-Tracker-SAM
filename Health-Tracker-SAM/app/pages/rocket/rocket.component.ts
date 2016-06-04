import {Component,ComponentRef,ViewChild,ViewContainerRef,Sam,RocketActions,RocketModel,RocketState,RocketViews,DynamicComponentLoader,ElementRef} from './rocket.exports';
import {DatabaseService} from '../../services/database.service';
import {AuthService} from '../../services/auth.service';
import {FirebaseAuth} from 'angularfire2';

@Component({
    selector: 'rocket',
    templateUrl: 'build/pages/rocket/rocket.template.html'
})
export class RocketComponent extends Sam<RocketActions, RocketModel, RocketState, RocketViews, DatabaseService, AuthService> {
    private component: any;
    // `ViewContainerRef` from an element in the view
    @ViewChild('rocket', { read: ViewContainerRef }) rocket;

    constructor(private loader: DynamicComponentLoader, private elementRef: ElementRef, private fbAuth: FirebaseAuth) {
        super(RocketActions, RocketModel, RocketState, RocketViews, DatabaseService, AuthService);
    }

    ngOnInit() {
        this.actions.init();
        this.auth.auth = this.fbAuth;
        this.auth.init();
        this.model.init('/rocket', '');  // load data
        this.views.updated.subscribe((representation) => {
            // Not sure how efficient this is at replacing the DOM. Gut tells me it's expensive.
            // Could create a single view/template with ngIfs and a ViewModel that it would bind to.
            // ViewModel properties would update based on state
            // angular rc breaks loadIntoLocation - need this:
            //@ViewChild(‘myVar’, {read: ViewContainerRef}) to get hold of a ViewContainerRef at an element with variable myVar. 
            // Then call DynamicComponentLoader.loadNextToLocation
            if (this.component == undefined || this.component.componentType.name !== representation.name) {
                //this.loader.loadIntoLocation(representation, this.elementRef, 'rocket').then((component) => {
                this.loader.loadNextToLocation(representation, this.rocket).then((component) => {
                    if (this.component) {
                        this.component.destroy();
                    }
                    component.instance.rocket = this;
                    this.component = component;
                });
            }
        });

        this.views.updated.subscribe((representation) => {
            if (this.state.launched(this.model)) {
                //jQuery('rocket').find('#rocket_launch').css("margin-bottom", "1000px");
                //jQuery('rocket').find('.cloud_fill').css("animation", "smoke_size .35s infinite");
                //jQuery('rocket').find('.rocket_shadow').css("animation", "shadow_flare .35s infinite");                
            }            
        });

        this.views.updated.next(this.views.representation);
    }
}