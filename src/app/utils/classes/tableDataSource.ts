import { DataSource, CollectionViewer } from "@angular/cdk/collections"
import { BehaviorSubject } from "rxjs"

/**
 * Data source builder for tables based on CDK/Mat tables
 */
export class TableDataSource<T> extends DataSource<T> {
  data = new BehaviorSubject<T[]>(this.ELEMENT_DATA)

  constructor(public ELEMENT_DATA: T[]) {
    super()
    this.ELEMENT_DATA = ELEMENT_DATA
  }

  connect(dataTable: CollectionViewer): BehaviorSubject<T[]> {
    return this.data
  }

  disconnect(dataTable: CollectionViewer) { }
}
