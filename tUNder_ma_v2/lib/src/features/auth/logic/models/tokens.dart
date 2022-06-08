class Tokens {
  late final String token;
  late final String userID;

  Tokens({required this.token});

  Tokens.fromJson(Map<String, dynamic> json) {
    token = json['token'];
    userID = json['userID'];
  }
}
