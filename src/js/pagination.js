export default class Pagination {
  constructor() {
    this.request = '';
    this.time = null;
    this.area = '';
    this.ingredient = '';
    this.page = 1;
    this.limit = 6;
    this.category = '';
    this.totalRecipe = 0;
    this.local = [];
  }

  clearLoc() {
    this.local.splice(0, 9999999)
  }

  getLoc() {
    return this.local;
  }
  
  pushLoc(itm) {
    if (!this.local.includes(itm)) {
      this.local.push(itm);
    }
  }

  allPushLoc(itm) {
    this.local.push(...itm)
  }
  delItmLoc(itm) {
    if (this.local.includes(itm)) {
      const v = this.local.indexOf(itm);
      this.local.splice(v,1)
    }
  }

  incr() {
    this.page += 1;
  }
  decr() {
    this.page -= 1;
  }

  get total() {
    return this.totalRecipe;
  }

  set total(newTotal) {
    this.totalRecipe = newTotal;
  }

  get actPages() {
    return this.actPage;
  }
  set actPages(newActPage) {
    this.actPages = newActPage;
  }

  get endValue() {
    return this.end;
  }
  set endValue(newEnd) {
    this.end = newEnd;
  }

  get req() {
    return this.request;
  }
  set req(newRequest) {
    this.request = newRequest;
  }

  get times() {
    return this.time;
  }
  set times(newtime) {
    this.time = newtime;
  }

  get areas() {
    return this.area;
  }
  set areas(newArea) {
    this.area = newArea;
  }

  get ingredients() {
    return this.ingredient;
  }
  set ingredients(newIngredient) {
    this.ingredient = newIngredient;
  }

  get pages() {
    return this.page;
  }
  set pages(newPage) {
    this.page = newPage;
  }

  get limits() {
    return this.limit;
  }
  set limits(newLimit) {
    this.limit = newLimit;
  }

  get categories() {
    return this.category;
  }
  set categories(newCategory) {
    this.category = newCategory;
  }
}