import { Component, OnInit } from '@angular/core';
import { AngularFirestore, QuerySnapshot } from 'angularfire2/firestore';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'b2-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {

  properties: any[] = [];
  firstInResponse: any = [];
  lastInResponse: any = [];
  prev_strt_at: any = [];
  pagination_clicked_count = 0;
  disable_next = false;
  disable_prev = false;
  page = 1;
  visitedPropertyId: number;

  constructor(
    private firestore: AngularFirestore, private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.loadItems();
    this.visitedPropertyId = +this.route.snapshot.paramMap.get('lastVisited');
  }

  loadItems(): void {
    this.firestore.collection('properties', ref => ref
      .limit(6)
      .orderBy('timestamp', 'desc')
    ).snapshotChanges()
      .subscribe(response => {
        if (!response.length) {
          console.log('No Data Available');
          return false;
        }
        this.firstInResponse = response[0].payload.doc;
        this.lastInResponse = response[response.length - 1].payload.doc;

        this.properties = [];
        for (const item of response) {
          this.properties.push(item.payload.doc.data());
        }
        this.prev_strt_at = [];
        this.pagination_clicked_count = 0;
        this.disable_next = false;
        this.disable_prev = false;
        this.push_prev_startAt(this.firstInResponse);
      }, error => {
        console.log(error);
      });
  }
  prevPage(): void {
    this.disable_prev = true;
    this.firestore.collection('properties', ref => ref
      .orderBy('timestamp', 'desc')
      .startAt(this.get_prev_startAt())
      .endBefore(this.firstInResponse)
      .limit(6)
    ).get()
      .subscribe(response => {
        this.firstInResponse = response.docs[0];
        this.lastInResponse = response.docs[response.docs.length - 1];

        this.properties = [];
        for (const item of response.docs) {
          this.properties.push(item.data());
        }
        this.pagination_clicked_count--;
        this.pop_prev_startAt(this.firstInResponse);
        this.disable_prev = false;
        this.disable_next = false;
      }, error => {
        this.disable_prev = false;
      });
  }

  nextPage(): void {
    this.disable_next = true;
    this.firestore.collection('properties', ref => ref
      .limit(6)
      .orderBy('timestamp', 'desc')
      .startAfter(this.lastInResponse)
    ).get()
      .subscribe(response => {
        if (!response.docs.length) {
          this.disable_next = true;
          return;
        }
        this.firstInResponse = response.docs[0];
        this.lastInResponse = response.docs[response.docs.length - 1];
        this.properties = [];
        for (const item of response.docs) {
          this.properties.push(item.data());
        }
        this.pagination_clicked_count++;
        this.push_prev_startAt(this.firstInResponse);
        this.disable_next = false;
      }, error => {
        this.disable_next = false;
      });
  }

  push_prev_startAt(prev_first_doc): void {
    this.prev_strt_at.push(prev_first_doc);
  }

  pop_prev_startAt(prev_first_doc): void {
    this.prev_strt_at.forEach(element => {
      if (prev_first_doc.data().id === element.data().id) {
        element = null;
      }
    });
  }

  get_prev_startAt() {
    if (this.prev_strt_at.length > (this.pagination_clicked_count + 1)) {
      this.prev_strt_at.splice(this.prev_strt_at.length - 2, this.prev_strt_at.length - 1);
    }
    return this.prev_strt_at[this.pagination_clicked_count - 1];
  }
}
