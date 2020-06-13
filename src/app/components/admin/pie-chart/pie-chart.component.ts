import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { ChartOptions, ChartType } from 'chart.js';
import { SingleDataSet, Label } from 'ng2-charts';
import { CategoryService } from 'src/app/services/category.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss'],
})
export class PieChartComponent implements OnInit, OnDestroy {
  chartLegend = true;
  chartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'left',
      labels: {
        fontSize: 14,
      },
    },
  };
  chartLabels: Label[] = [];
  chartData: SingleDataSet = [0];
  chartType: ChartType = 'pie';
  chartColors = [
    {
      backgroundColor: [],
    },
  ];
  private width = 1100;
  private subscription: Subscription;

  constructor(private catSv: CategoryService) {}

  ngOnInit() {
    this.subscription = this.catSv.getCategories().subscribe((cats) => {
      this.chartLabels = [];
      this.chartData = [];
      this.chartColors[0].backgroundColor = [];
      let sum = 0;

      cats.forEach((cat) => {
        this.chartLabels.push(cat['name']);

        const total = cat['total'];
        this.chartData.push(total);
        sum += total;

        if (total == 0) this.chartColors[0].backgroundColor.push('white');
        else this.chartColors[0].backgroundColor.push(cat['labelColor']);
      });

      // // sum
      // this.chartData.push(0);
      // this.chartColors[0].backgroundColor.push('white');
      // this.chartLabels.push(`All (${sum})`);
    });

    this.chartLegend = window.window.innerWidth >= this.width;
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    if (event.target.innerWidth >= this.width && !this.chartLegend) {
      this.chartLegend = true;
      this.chartOptions = {
        responsive: true,
        legend: {
          position: 'left',
          labels: {
            fontSize: 14,
          },
        },
      };
    } else if (event.target.innerWidth < this.width && this.chartLegend) {
      this.chartLegend = false;
    }
  }
}
