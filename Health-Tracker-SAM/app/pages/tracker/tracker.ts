import {Page} from 'ionic-angular';
import {TrackerComponent} from './tracker.component';

@Page({
    templateUrl: 'build/pages/tracker/tracker.html',
    directives: [TrackerComponent]
})
export class Tracker {
  constructor() {

  }
}
