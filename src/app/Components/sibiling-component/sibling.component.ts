import {Component, OnInit} from '@angular/core';
import {DataService} from '../../Services/data.service';

@Component({
  selector: 'app-sibling-component',
  imports: [],
  templateUrl: './sibling.component.html',
  styleUrl: './sibling.component.scss'
})
export class SiblingComponent implements OnInit {

  message!: string;

  constructor(private dataService: DataService) {

  }

  ngOnInit(): void {
    this.dataService.currentMessage.subscribe(msg => {
      this.message = msg;
    })
  }

  newMessage(): void {
    this.dataService.changeMessage("Hello from Sibling")
  }

}
