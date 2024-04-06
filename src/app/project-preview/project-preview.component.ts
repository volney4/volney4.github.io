import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-project-preview',
  templateUrl: './project-preview.component.html',
  styleUrls: ['./project-preview.component.scss']
})
export class ProjectPreviewComponent implements OnInit {
  @Input() title: string;
  @Input() description: string;
  @Input() imageUrl: string;
  @Input() date: string;
  @Input() tags: string[];

  constructor() { }

  ngOnInit(): void {
  }

}
