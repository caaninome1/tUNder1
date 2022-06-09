import 'package:graphql/client.dart';
import 'package:hive/hive.dart';

class GraphQLGateway {
  static GraphQLClient getClient() {
    final _httpLink = HttpLink(
      'https://api-gateway-y6bebo7xta-uc.a.run.app',
    );
    final _authLink = AuthLink(
      getToken: () async {
        var box = await Hive.openBox('user');
        return box.get("token");
      },
    );
    Link _link = _authLink.concat(_httpLink);
    return GraphQLClient(
      link: _link,
      // The default store is the InMemoryStore, which does NOT persist to disk
      cache: GraphQLCache(),
    );
  }
}
