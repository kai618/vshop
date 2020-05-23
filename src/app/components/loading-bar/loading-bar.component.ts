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
  private bar = 0;
  private hide = 0;

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

    this.interval = setInterval(() => {
      this.bar += 0.7;
      if (this.bar < 100)
        this.hide = this.bar - length < 0 ? 0 : this.bar - length;
      else if (this.bar >= 100 && this.hide < 100) this.hide += 1;
      else {
        this.bar = 0;
        this.hide = 0;
      }
      this.barPercentStr = `${this.bar}%`;
      this.hidePercentStr = `${this.hide}%`;
    }, 4);
  }

  stop() {
    if (this.interval) clearInterval(this.interval);
  }
}
