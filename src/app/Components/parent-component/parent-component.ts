import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ChildComponent} from '../child-component/child-component';
import {DataService} from '../../Services/data.service';

@Component({
  selector: 'app-parent-component',
  imports: [
    ChildComponent
  ],
  templateUrl: './parent-component.html',
  styleUrl: './parent-component.scss'
})
export class ParentComponent implements OnInit, AfterViewInit {
  message!:string;
  receivedMessage: string = "";
  @ViewChild(ChildComponent) childComponent!: ChildComponent;

  constructor(private dataService: DataService) {

  }

  ngOnInit(): void {
    this.dataService.currentMessage.subscribe(msg => {
      this.message = msg;
    })
  }

  ngAfterViewInit(): void {
    console.log('ngAfterViewInit: ', this.childComponent.message);
  }

  onMessageChanged(message: string): void {
    this.receivedMessage = message;
  }


}
