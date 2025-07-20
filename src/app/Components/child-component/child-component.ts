import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DataService} from '../../Services/data.service';

@Component({
  selector: 'app-child-component',
  imports: [],
  templateUrl: './child-component.html',
  styleUrl: './child-component.scss'
})
export class ChildComponent implements OnInit {
  @Input() name: string;
  message: string = 'My name is Hady';
  @Output() messageChange = new EventEmitter();

  constructor(private dataService: DataService) {
    this.name = 'Child Component';
  }

  ngOnInit(): void {
    this.dataService.currentMessage.subscribe(msg => {
      this.message = msg;
    })
  }

  sendMessage(): void
  {
    this.messageChange.emit(this.message);
  }


}
