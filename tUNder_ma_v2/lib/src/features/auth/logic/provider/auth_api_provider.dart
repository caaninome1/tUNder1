import 'package:auth/src/core/GraphQLGateway.dart';
import 'package:auth/src/features/auth/logic/interceptors/auth_token_interceptor.dart';
import 'package:auth/src/features/auth/logic/models/tokens.dart';
import 'package:auth/src/features/auth/logic/models/user.dart';
import 'package:auth/src/shared/logic/http/api.dart';
import 'package:auth/src/shared/logic/http/interceptors/error_dialog_interceptor.dart';
import 'package:graphql/client.dart';

class AuthAPIProvider {
  final loginMutation = """
        mutation login(\$user: NewUser!) {
          login(user: \$user) {
            token,
            userID
          }
        }
    """;

  final profileQuery = """
        query GetProfile(\$getProfileId: Int!) {
          getProfile(id: \$getProfileId) {
            name
            profileImageId
            age
            identification
            city
            phone
            description
            gender
          }
        }
  """;

  Future<Tokens> authenticate(String username, String password) async {
    QueryResult ans = await GraphQLGateway.getClient().mutate(MutationOptions(
      document: gql(loginMutation),
      variables: <String, dynamic>{
        'user': {
          "email": username,
          "password": password,
        },
      },
    ));
    print(ans.data);
    if (!ans.hasException) {
      Tokens token = Tokens.fromJson(ans.data?['login']);
      // Hive.box('user').put('token', token.token);
      // Hive.box('user').put('userID', token.userID);
      return token;
    } else {
      return Tokens.fromJson({'token': null, 'userID': null});
    }
  }

  Future<Tokens> register(
    String username,
    String password,
    String email,
  ) async {
    final response = await api.post(
      '/auth/register',
      data: {
        'username': username,
        'password': password,
        'email': email,
      },
    );

    final tokens = Tokens.fromJson(response.data);

    return tokens;
  }

  Future<void> recover(String email) async {
    await api.post(
      '/recover',
      data: {
        'email': email,
      },
    );
  }

  Future<User?> getProfile(String? userID) async {
    QueryResult ans = await GraphQLGateway.getClient().query(QueryOptions(
      document: gql(profileQuery),
      variables: <String, dynamic>{
        'getProfileId': userID,
        },
    )
    );
    print(ans.data);
    if (!ans.hasException) {
      User user = User.fromJson(ans.data?['getProfile']);
      // Hive.box('user').put('token', token.token);
      // Hive.box('user').put('userID', token.userID);
      return user;
    } else {
      return null;
    }

  }

  Future<Tokens> loginWithFacebook(String? accessToken) {
    return _socialLogin(
      provider: 'facebook',
      accessToken: accessToken,
    );
  }

  Future<Tokens> loginWithGoogle(String? accessToken) {
    return _socialLogin(
      provider: 'google',
      accessToken: accessToken,
    );
  }

  Future<Tokens> loginWithApple({
    required String? identityToken,
    required String authorizationCode,
    String? givenName,
    String? familyName,
    String? type,
  }) {
    return _socialLogin(
      provider: 'apple',
      accessToken: identityToken,
      authorizationCode: authorizationCode,
      type: type,
      name: '$givenName $familyName',
    );
  }

  Future<Tokens> _socialLogin({
    required String provider,
    required String? accessToken,
    String? authorizationCode,
    String? type,
    String? name,
  }) async {
    final response = await api.post(
      '/auth/$provider-login',
      data: {
        'name': name,
        'accessToken': accessToken,
        'authorizationCode': authorizationCode,
        'type': type,
      },
    );

    return Tokens.fromJson(response.data);
  }

  Future<Tokens> loginWithRefreshToken(String? refreshToken) async {
    final response = await api.post(
      '/auth/refresh-token',
      data: {'refreshToken': refreshToken},
      options: Options(headers: {AuthTokenInterceptor.skipHeader: true}),
    );

    return Tokens.fromJson(response.data);
  }

  Future<Tokens> logoutFromAllDevices() async {
    final response = await api.delete('/auth/logout-from-all-devices');

    return Tokens.fromJson(response.data);
  }
}
