export default class LocalStorage {
  constructor() {
    this.localDate = [];
  }

  clearLoc() {
    this.localDate.splice(0, 9999999);
  }

  getLoc() {
    return this.localDate;
  }

  pushLoc(itm) {
    this.localDate.push(itm);
  }

  delItmLoc(id) {
    for (let i = 0; i < this.localDate.length; i += 1) {
      if (this.localDate[i]._id === id) {
          this.localDate.splice(i, 1);
          console.log();
      }
    }
  }

  allPushLoc(itm) {
    this.localDate.push(...itm);
  }

  get localD() {
    return this.localDate;
  }
  set localD(itm) {
    return;
  }
}