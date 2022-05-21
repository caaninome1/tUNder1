import 'package:flutter/material.dart';
import 'draggable_card.dart';
import 'swipe_cards.dart';
import 'content.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Swipe Cards Demo',
      theme: ThemeData(
        primarySwatch: Colors.blue,
        visualDensity: VisualDensity.adaptivePlatformDensity,
      ),
      home: const MyHomePage(title: 'Swipe Cards Demo'),
      debugShowCheckedModeBanner: false,
    );
  }
}

class MyHomePage extends StatefulWidget {
  const MyHomePage({Key? key, required this.title}) : super(key: key);

  final String title;

  @override
  State<MyHomePage> createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  final List<SwipeItem> _swipeItems = <SwipeItem>[];
  MatchEngine? _matchEngine;
  GlobalKey<ScaffoldState> _scaffoldKey = GlobalKey();
  final List<String> _names = [
    "Red",
    "Blue",
    "Green",
    "Yellow",
    "Orange",
    "Grey",
    "Purple",
    "Pink"
  ];
  final List<Color> _colors = [
    Colors.red,
    Colors.blue,
    Colors.green,
    Colors.yellow,
    Colors.orange,
    Colors.grey,
    Colors.purple,
    Colors.pink
  ];

  @override
  void initState() {
    for (int i = 0; i < _names.length; i++) {
      _swipeItems.add(SwipeItem(
        content: Content(text: _names[i], color: _colors[i]),
        likeAction: () {
          _scaffoldKey.currentState?.showSnackBar(SnackBar(
            content: Text("Liked ${_names[i]}"),
            duration: const Duration(milliseconds: 500),
          ));
        },
        nopeAction: () {
          _scaffoldKey.currentState?.showSnackBar(SnackBar(
            content: Text("Nope ${_names[i]}"),
            duration: const Duration(milliseconds: 500),
          ));
        },
        superlikeAction: () {
          _scaffoldKey.currentState?.showSnackBar(SnackBar(
            content: Text("Superliked ${_names[i]}"),
            duration: const Duration(milliseconds: 500),
          ));
        },
        //onSlideUpdate: (SlideRegion? region) async {
        //  if (kDebugMode) {
        //    print("Region $region");
        //  }
        //}
      ));
    }

    _matchEngine = MatchEngine(swipeItems: _swipeItems);
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        key: _scaffoldKey,
        appBar: AppBar(
          title: Text(widget.title!),
        ),
        body: Container(
            child: Stack(children: [
          Container(
            height: MediaQuery.of(context).size.height - kToolbarHeight,
            child: SwipeCards(
              matchEngine: _matchEngine!,
              itemBuilder: (BuildContext context, int index) {
                return Container(
                  alignment: Alignment.center,
                  color: _swipeItems[index].content.color,
                  child: Text(
                    _swipeItems[index].content.text,
                    style: TextStyle(fontSize: 100),
                  ),
                );
              },
              onStackFinished: () {
                _scaffoldKey.currentState!.showSnackBar(const SnackBar(
                  content: Text("Stack Finished"),
                  duration: Duration(milliseconds: 500),
                ));
              },
              itemChanged: (SwipeItem item, int index) {
                print("item: ${item.content.text}, index: $index");
              },
              upSwipeAllowed: true,
              fillSpace: true,
            ),
          ),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
            children: [
              ElevatedButton(
                  onPressed: () {
                    _matchEngine!.currentItem?.nope();
                  },
                  child: const Text("Nope")),
              ElevatedButton(
                  onPressed: () {
                    _matchEngine!.currentItem?.superLike();
                  },
                  child: const Text("Superlike")),
              ElevatedButton(
                  onPressed: () {
                    _matchEngine!.currentItem?.like();
                  },
                  child: const Text("Like"))
            ],
          )
        ])));
  }
}
