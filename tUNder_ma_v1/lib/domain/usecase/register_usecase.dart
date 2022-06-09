import 'dart:math';

import 'package:dartz/dartz.dart';
import 'package:graphql/client.dart';
import 'package:stores/data/network/failure.dart';
import 'package:stores/domain/models/models.dart';
import 'package:stores/domain/repository/GraphQLGateway.dart';

class RegisterUseCase {
  RegisterUseCase();

  final Random random = Random();
  final registroMutation = """
        mutation saveUser(\$newUser: NewUser!) {
          saveUser(newUser: \$newUser) {
            id
            name
            email
            password
          }
        }
    """;
  final petfilMutation = """
        mutation postProfile(\$newProfile: ProfileInput!) {
          postProfile(newProfile: \$newProfile) {
            identification
            name
            gender
            city
            phone
          }
        }
    """;
  final imagenMutation = """
        mutation postImage(\$newImage: NewImage!) {
          postImage(newImage: \$newImage)
        }
    """;

  Future<Either<Failure, User>> execute(
    RegisterUseCaseInput input,
  ) async {
    QueryResult ans = await GraphQLGateway.getClient().mutate(MutationOptions(
      document: gql(registroMutation),
      variables: <String, dynamic>{
        'newUser': {
          "name": input.username,
          "email": input.email,
          "password": input.password,
        },
      },
    ));
    if (!ans.hasException) {
      QueryResult ans2 = await GraphQLGateway.getClient().mutate(MutationOptions(
        document: gql(imagenMutation),
        variables: <String, dynamic>{
          "newImage": {
            "user_id": ans.data?["saveUser"]["id"].toString(),
            "mime_type": "image/jpg",
            "extension": "jpg",
            "b64": input.profilePicture,
          },
        },
      ));
      if (!ans2.hasException) {
        bool g = random.nextBool();
        QueryResult ans3 = await GraphQLGateway.getClient().mutate(MutationOptions(
          document: gql(petfilMutation),
          variables: <String, dynamic>{
            'newProfile': {
              "identification": ans.data?["saveUser"]["id"],
              "name": input.username,
              "age": 19,
              "occupation": "Estudiante",
              "gender": g ? "M" : "F",
              "city": "Bogota",
              "phone": input.mobileNumber,
              "campus": "BOGOTA",
              "faculty": "NA",
              "academicProgram": "NA",
              "genderInterest": !g ? "M" : "F",
              "profileImageId": ans2.data?["postImage"].toString(),
              "description": "NA",
              "characteristic": const []
            },
          },
        ));
        print(ans3.data);
        print(ans3.exception);
      }
    }
    return Either.cond(
        () => !ans.hasException,
        () => User(ans.data?["saveUser"]["id"], ans.data?["saveUser"]["name"],
            ans.data?["saveUser"]["email"], ans.data?["saveUser"]["password"]),
        () => Failure(1, "Ocurrio un error"));
  }
}

class RegisterUseCaseInput {
  String username;
  String countryMobileCode;
  String mobileNumber;
  String email;
  String password;
  String profilePicture;

  RegisterUseCaseInput(
    this.username,
    this.countryMobileCode,
    this.mobileNumber,
    this.email,
    this.password,
    this.profilePicture,
  );
}
