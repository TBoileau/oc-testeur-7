export class Work {
  /**
   * @param id {number}
   * @param title {string}
   * @param imageUrl {string}
   * @param category {Category}
   * @param userId {number}
   */
  constructor({id, title, imageUrl, category, userId}) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.category = new Category(category);
    this.userId = userId;
  }
}

export class Category {
  /**
   * @param id {number}
   * @param name {string}
   */
  constructor({id, name}) {
    this.id = id;
    this.name = name;
  }
}
