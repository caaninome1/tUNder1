import 'package:flutter/material.dart';
import 'package:hive_flutter/hive_flutter.dart';
import 'package:stores/app/app.dart';
import 'package:stores/app/di.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await initAppModule();
  await Hive.initFlutter();
  runApp(const MyApp());
}
