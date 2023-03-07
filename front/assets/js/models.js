export class Work {
  constructor({id, title, imageUrl, category, userId}) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.category = new Category(category);
    this.userId = userId;
  }
}

export class Category {
  constructor({id, name}) {
    this.id = id;
    this.name = name;
  }
}
