import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CategoryService } from 'src/app/services/category.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-multi-select-cat',
  templateUrl: './multi-select-cat.component.html',
  styleUrls: ['./multi-select-cat.component.scss'],
})
export class MultiSelectCatComponent implements OnInit, OnDestroy {
  categories: any[];
  catSubscription: Subscription;

  selectedValues: string = 'All';

  constructor(private modalSv: NgbModal, private catSv: CategoryService) {}

  ngOnInit(): void {
    this.catSubscription = this.catSv
      .getCategories()
      .subscribe((cats) => (this.categories = cats));
  }

  ngOnDestroy(): void {
    if (this.catSubscription) this.catSubscription.unsubscribe();
  }

  onSelectCategories(event: MouseEvent, content: any) {
    event.preventDefault();
    this.openModal(content);
  }

  openModal(content: any) {
    this.modalSv.open(content, {size: 'sm'}).result.then(
      (val) => {
        if (val) {
          console.log('yes');

          // emit selected values
        }
      },
      () => {}
    );
  }
}
