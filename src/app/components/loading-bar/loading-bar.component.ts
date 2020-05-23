import { Component, OnInit } from '@angular/core';
import { LoadingBarService } from 'src/app/services/loading-bar.service';

@Component({
  selector: 'app-loading-bar',
  templateUrl: './loading-bar.component.html',
  styleUrls: ['./loading-bar.component.scss'],
})
export class LoadingBarComponent implements OnInit {
  barPercentStr: string;
  hidePercentStr: string;
  display: string = 'none';
  private interval: any;

  constructor(private loadingSv: LoadingBarService) {}

  ngOnInit(): void {
    this.loadingSv.event.subscribe((val: boolean) =>
      val ? this.on() : this.off()
    );
  }
  on() {
    this.display = 'block';
    this.start();
  }
  off() {
    this.display = 'none';
    this.stop();
  }

  start() {
    const length = 20;
    let bar = 0;
    let hide = 0;

    this.interval = setInterval(() => {
      bar += 0.7;
      if (bar < 100) hide = bar - length < 0 ? 0 : bar - length;
      else if (bar >= 100 && hide < 100) hide += 1;
      else {
        bar = 0;
        hide = 0;
      }
      this.barPercentStr = `${bar}%`;
      this.hidePercentStr = `${hide}%`;
    }, 5);
  }

  stop() {
    if (this.interval) clearInterval(this.interval);
  }
}
