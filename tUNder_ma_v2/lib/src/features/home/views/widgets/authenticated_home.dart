import 'package:auth/src/features/auth/logic/cubit/auth_cubit.dart';
import 'package:auth/src/features/auth/logic/models/user.dart';
import 'package:auth/src/features/notification/views/widgets/notification_handler.dart';
import 'package:auth/src/features/room/views/screens/rooms_screen.dart';
import 'package:auth/src/features/settings/views/screens/settings_screen.dart';
import 'package:auth/src/shared/views/widgets/circles_background.dart';
import 'package:auth/src/shared/views/widgets/underlined_button.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:auth/src/features/interactions/main.dart';

class AuthenticatedHome extends StatelessWidget {
  final User user;

  AuthenticatedHome({
    Key? key,
    required this.user,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return CirclesBackground(
      backgroundColor: Colors.white,
      topSmallCircleColor: theme.secondaryHeaderColor,
      topMediumCircleColor: theme.primaryColor,
      topRightCircleColor: Colors.white,
      bottomRightCircleColor: theme.highlightColor,
      child: Container(
        padding: EdgeInsets.symmetric(horizontal: 40),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            NotificationHandler(),
            SizedBox(
              height: 80,
            ),
            ConstrainedBox(
              constraints: BoxConstraints(maxWidth: 300),
              child: Text(
                'tUNder',
                style: TextStyle(
                  fontSize: 40,
                  fontWeight: FontWeight.bold,
                  color: Colors.white,
                ),
              ),
            ),
            Spacer(),
            Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  'Hola! ',
                  style: TextStyle(
                    fontWeight: FontWeight.bold,
                    fontSize: 30,
                  ),
                ),
                Text(
                  user.username,
                  style: TextStyle(
                    fontWeight: FontWeight.bold,
                    color: theme.highlightColor,
                    fontSize: 30,
                  ),
                ),
                Text(
                  '(${user.email})',
                  style: TextStyle(
                    fontWeight: FontWeight.bold,
                    color: theme.highlightColor,
                  ),
                ),
                Row(
                  children: [
                    UnderlinedButton(
                      child: Text('Salir'),
                      color: Color.fromARGB(255, 120, 178, 223),
                      onPressed: () => context.read<AuthCubit>().logout(),
                    ),
                    UnderlinedButton(
                        child: Text('Match'),
                        color: theme.highlightColor,
                        //onPressed: () => Navigator.pushNamed(
                        //context,
                        //RoomsScreen.routeName,
                        onPressed: () => {main()}),
                    UnderlinedButton(
                      child: Text('Configuración'),
                      color: Color.fromARGB(255, 120, 178, 223),
                      onPressed: () => Navigator.pushNamed(
                        context,
                        SettingsScreen.routeName,
                      ),
                    )
                  ],
                ),
              ],
            ),
            Spacer(),
            Row(
              children: [
                Spacer(),
                UnderlinedButton(
                  child: Text('Salir'),
                  color: theme.highlightColor,
                  onPressed: () => context.read<AuthCubit>().logout(),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}
