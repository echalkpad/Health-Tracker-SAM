import {Component, ComponentRef, ViewChild, ViewContainerRef, Sam, SettingsActions, SettingsModel, SettingsState, SettingsViews, DynamicComponentLoader, ElementRef} from './settings.exports';
import {IONIC_DIRECTIVES}   from 'ionic-angular';
import {FORM_DIRECTIVES} from '@angular/common';
import {DatabaseService} from '../../services/database.service';
import {AuthService} from '../../services/auth.service';
import {FirebaseAuth} from 'angularfire2';

@Component({
    selector: 'settings',
    templateUrl: 'build/pages/settings/settings.template.html',
    directives: [IONIC_DIRECTIVES, FORM_DIRECTIVES]
})
export class SettingsComponent extends Sam<SettingsActions, SettingsModel, SettingsState, SettingsViews, DatabaseService, AuthService> {
    private component: any;  // was ComponentRef
    sheet: "in Component";
    calendar: "in Component";
    // `ViewContainerRef` from an element in the view
    @ViewChild('settings', { read: ViewContainerRef }) settings;

    constructor(private loader: DynamicComponentLoader, private elementRef: ElementRef, private fbAuth: FirebaseAuth) {
        super(SettingsActions, SettingsModel, SettingsState, SettingsViews, DatabaseService, AuthService);
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
            if (representation) {
                this.loader.loadNextToLocation(representation, this.settings).then((component) => {
                    if (this.component) {
                        this.component.destroy();
                    }
                    if (component && component.instance) {
                        component.instance.settings = this;
                        this.component = component;
                    }
                });
            }
        });

        this.views.updated.next(this.views.representation);
    }
}