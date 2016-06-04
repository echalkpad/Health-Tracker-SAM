import {Page, NavController} from 'ionic-angular';
import {Input} from '@angular/core';
import {SettingsComponent} from './settings.component';

@Page({
    templateUrl: 'build/pages/settings/settings.html',
    directives: [SettingsComponent]
})
export class Settings {
    @Input() userid: string;
    constructor() {
        
    }
}