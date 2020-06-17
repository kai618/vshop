import { Component, OnInit, OnDestroy, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CategoryService } from 'src/app/services/category.service';
import { Subscription } from 'rxjs';
import { EventEmitter } from '@angular/core';
import { validateEventsArray } from 'angularfire2/firestore';

@Component({
  selector: 'app-multi-select-cat',
  templateUrl: './multi-select-cat.component.html',
  styleUrls: ['./multi-select-cat.component.scss'],
})
export class MultiSelectCatComponent implements OnInit, OnDestroy {
  @Output() select: EventEmitter<string[]> = new EventEmitter();

  categories: any[];
  checks: Object = {};
  preChecks: Object;
  catSubscription: Subscription;

  valid: boolean;

  selectedIds: string[];
  selectedValues: string = 'All';

  constructor(private modalSv: NgbModal, private catSv: CategoryService) {}

  ngOnInit(): void {
    this.catSubscription = this.catSv.getCategories().subscribe((cats) => {
      this.selectedIds = [];
      cats.forEach((cat) => {
        this.checks[cat['id']] = true;
        this.selectedIds.push(cat['id']);
      });
      this.preChecks = { ...this.checks };
      this.categories = cats;
      this.select.emit(this.selectedIds);
    });
  }

  ngOnDestroy(): void {
    if (this.catSubscription) this.catSubscription.unsubscribe();
  }

  onSelectCategories(event: MouseEvent, content: any) {
    event.preventDefault();
    this.openModal(content);
  }

  // checkAll(id: string) {
  //   Object.keys(this.preChecks).forEach((key) => {
  //     if (this.preChecks[id]) this.preChecks[key] = false;
  //     else this.preChecks[key] = true;
  //   });
  // }

  check(id: string) {
    this.preChecks[id] = !this.preChecks[id];
    this.validate();
  }

  getselectedValues(): string {
    const values = [];
    this.selectedIds = [];
    this.categories.forEach((cat) => {
      if (this.checks[cat['id']]) {
        this.selectedIds.push(cat['id']);
        values.push(cat['name']);
      }
    });
    if (values.length == this.categories.length) return 'All';
    return values.join(', ');
  }

  openModal(content: any) {
    this.valid = true;
    this.modalSv.open(content, { size: 'sm' }).result.then(
      (val) => {
        if (val) {
          this.checks = { ...this.preChecks };
          this.selectedValues = this.getselectedValues();
          this.select.emit(this.selectedIds);
        }
      },
      () => {}
    );
  }

  validate() {
    for (let i = 0; i < this.categories.length; i++) {
      if (this.preChecks[this.categories[i]['id']]) {
        this.valid = true;
        return;
      }
    }
    this.valid = false;
  }

  selectAll() {
    const els = document.getElementsByClassName('multi-checkbox');
    for (let i = 0; i < els.length; i++) {
      els[i]['checked'] = true;
      this.preChecks[els[i].id] = true;
    }
    this.valid = true;
  }

  selectNone() {
    const els = document.getElementsByClassName('multi-checkbox');
    for (let i = 0; i < els.length; i++) {
      els[i]['checked'] = false;
      this.preChecks[els[i].id] = false;
    }
    this.valid = false;
  }
}
