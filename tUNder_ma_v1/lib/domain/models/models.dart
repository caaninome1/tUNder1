// on boarding
class SliderObject {
  String title;
  String subtitle;
  String image;

  SliderObject(
    this.title,
    this.subtitle,
    this.image,
  );
}

class SliderViewObject {
  SliderObject sliderObject;
  int numberOfSlides;
  int currentIndex;

  SliderViewObject(
    this.sliderObject,
    this.numberOfSlides,
    this.currentIndex,
  );
}

// login

class Customer {
  String id;
  String name;
  int numberOfNotifications;

  Customer(
    this.id,
    this.name,
    this.numberOfNotifications,
  );
}

class Contacts {
  String phone;
  String email;
  String link;

  Contacts(
    this.phone,
    this.email,
    this.link,
  );
}

class Authentication {
  Customer? customer;
  Contacts? contacts;

  Authentication(
    this.customer,
    this.contacts,
  );
}

class Service {
  int id;
  String title;
  String image;

  Service(
    this.id,
    this.title,
    this.image,
  );
}

class Token {
  int userID;
  String token;

  Token(this.token, this.userID);
}

class User {
  int id;
  String name;
  String email;
  String password;

  User(this.id, this.name, this.email, this.password);
}

class Profile {
  String identification;
  String name;
  int age;
  String occupation;
  String gender;
  String city;
  String phone;
  String campus;
  String faculty;
  String academicProgram;
  String genderInterest;
  String profileImageId;
  String description;
  List characteristic;

  Profile(
      this.identification,
      this.name,
      this.age,
      this.occupation,
      this.gender,
      this.city,
      this.phone,
      this.campus,
      this.faculty,
      this.academicProgram,
      this.genderInterest,
      this.profileImageId,
      this.description,
      this.characteristic);
}

class Store {
  int id;
  String title;
  String image;

  Store(
    this.id,
    this.title,
    this.image,
  );
}

class BannerAd {
  int id;
  String title;
  String image;
  String link;

  BannerAd(
    this.id,
    this.title,
    this.image,
    this.link,
  );
}

class HomeData {
  List<Service> services;
  List<BannerAd> banners;
  List<Store> stores;

  HomeData(
    this.services,
    this.banners,
    this.stores,
  );
}

class HomeObject {
  HomeData data;

  HomeObject(this.data);
}

class StoreDetails {
  int id;
  String image;
  String title;
  String details;
  String service;
  String about;

  StoreDetails(
    this.id,
    this.image,
    this.title,
    this.details,
    this.service,
    this.about,
  );
}
