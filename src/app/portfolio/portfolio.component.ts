import { Component, OnInit } from '@angular/core';
import { projectsData } from '../projects-data'; // Import the projects data

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent implements OnInit {
  public projects: any[] = projectsData; 

  constructor() {
    this.projects.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
   }

  ngOnInit(): void {
  }

}
