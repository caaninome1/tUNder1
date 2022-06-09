import 'package:equatable/equatable.dart';

class User extends Equatable implements Comparable {
  late final String? id;
  late final String? username;
  late final String? email;
  late final bool? online;
  late final bool? isSocial;
  late final String name;
  late final String profileImageId;
  late final int age;
  late final int identification;
  late final String city;
  late final String phone;
  late final String description;
  late final String gender;

  User({
    required this.id,
    required this.username,
    required this.email,
    required this.online,
    this.isSocial = false,
  });

  User.fromJson(Map<String, dynamic> json) {
    id = json['_id'];
    username = json['username'] ?? '';
    email = json['email'];
    online = json['online'] ?? false;
    isSocial = json['isSocial'] ?? false;
    name = json['name'] ?? '';
    profileImageId = json['profileImageId'] ?? '';
    age = json['age'] ?? 0;
    identification = json['identification'] ?? 0;
    city = json['city'] ?? '';
    phone = json['phone'] ?? '';
    description = json['description'] ?? '';
    gender = json['gender'] ?? '';
  }

  static List<User> fromList(List<dynamic> list) {
    return list.map((e) => User.fromJson(e)).toList();
  }

  @override
  int compareTo(dynamic other) {
    if (this.online == other.online) {
      return 0;
    }

    if (this.online ?? false) {
      return -1;
    }

    if (other.online) {
      return 1;
    }

    return 0;
  }

  @override
  List<Object?> get props => [id, username, email, online];
}
