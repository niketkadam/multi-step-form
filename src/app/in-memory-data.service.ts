import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const allData = [
        { id: 1, name: 'Niket', email: 'nik.cv@gmail.com',password:'Nik@123', socialmedia: 'google', address: 'bangalore' },
        { id: 2, name: 'Joy', email: 'joy.c@g.com',password:'Nik@123',socialmedia: 'google', address: 'bangalore' },
        { id: 3, name: 'Sumeeth', email: 'sum.d@g.com',password:'Nik@123', socialmedia: 'google', address: 'bangalore' },
        { id: 4, name: 'Chiru', email: 'chiru.g@g.com',password:'Nik@123', socialmedia: 'google', address: 'bangalore' },
      ]
    return {allData};
  }
}