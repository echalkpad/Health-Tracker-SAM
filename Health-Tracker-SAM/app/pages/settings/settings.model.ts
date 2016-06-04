import {Injectable} from '@angular/core';
import {Model} from '../../sam/sam.model';
import {SettingsState} from './settings.state';
import {DatabaseService} from '../../services/database.service';
import {Observable} from 'rxjs/Observable';
import * as _ from 'underscore';

export enum ItemType { Number, Miles, Kilometers, Reps, Text };
export interface ITracker {
    itemName: string;
    itemType: ItemType;
}

export interface ISettings {
    displayName: string;
    calendar: string;
    sheet: string;
    trackerTypes: ITracker[];
}

@Injectable()
export class SettingsModel extends Model {
    public settingsData: ISettings;

    defaultSettings: ISettings = <ISettings>{
        calendar: "c1",
        sheet: "s1",
        trackerTypes: [
            { itemName: "treadmill", itemType: ItemType.Miles },
            { itemName: "rowing", itemType: ItemType.Kilometers },
            { itemName: "lunges", itemType: ItemType.Reps }
        ]
    };

    constructor(public state: SettingsState, public service: DatabaseService) {
        super(state, service);
    }

    public init() {
        this.settingsData = this.defaultSettings;
        this.settingsData.displayName = "???";
        // load settings from database
        console.log("loading settings");
        this.service.getValue('settings')
            .subscribe((data: any) => {
                if (data) {
                    console.log("settings new data=" + JSON.stringify(data));
                    this.settingsData = _.extend(this.settingsData, data);
                }
                this.state.render(this);
            },
            error => { console.log("settings getAll error=" + error); },
            () => { console.log('Get all settings complete'); });
    }

    writeSettings(data) {
        console.log("writeSettings " + JSON.stringify(data));
        this.service.create('settings', this.settingsData);
    }

    public present(data) {
        console.log("present settings: " + JSON.stringify(data));
        if (data) {
            this.settingsData = data || this.settingsData;
            this.settingsData.displayName = this.service.getUsername();
            this.writeSettings(data);
        }
        this.state.render(this);

    }
}