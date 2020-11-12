import { Observable } from 'rxjs';


export interface CrudOperations<T, ID> {
	add(t: T): Observable<T>;
	newDefault(): Observable<T>;
	update(id: ID, t: T): Observable<T>;
	findOne(id: ID): Observable<T>;
	findAll(): Observable<T[]>;
	delete(id: ID): Observable<any>;
}