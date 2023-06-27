import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})

export class FirestoreServiceService {

  constructor(private afs:AngularFirestore) { }
  listHeroFromFirestore(){
    return this.afs.collection("/heroes").valueChanges()
  }
  update(id:string,data:any){
    return this.afs.doc("/heroes/"+id).update(data)

  }
  create(data:any){
    let id=this.afs.createId
    data.id=id
    return this.afs.doc("/heroes/"+id).set(data)
  }
  delete(id:string,data:any){
    return this.afs.doc("/heroes/"+id).delete()
  }
  getHeroFromId(id:string){
    return this.afs.doc("/heroes/"+id).valueChanges()
  }
}
