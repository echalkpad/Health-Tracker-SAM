import {Page} from 'ionic-angular';
import {RocketComponent} from './rocket.component';

@Page({
    templateUrl: 'build/pages/rocket/rocket.html',
    directives: [RocketComponent]
})
export class Rocket {
  constructor() {

  }
}
