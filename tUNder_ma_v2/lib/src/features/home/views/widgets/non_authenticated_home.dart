import 'package:auth/src/features/auth/views/screens/login_screen.dart';
import 'package:auth/src/features/auth/views/screens/register_screen.dart';
import 'package:auth/src/shared/views/widgets/circles_background.dart';
import 'package:auth/src/shared/views/widgets/underlined_button.dart';
import 'package:flutter/material.dart';

class NonAuthenticatedHome extends StatelessWidget {
  const NonAuthenticatedHome({Key? key}) : super(key: key);

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
                  color: Color.fromARGB(255, 120, 178, 223),
                ),
              ),
            ),
            Spacer(),
            Row(
              children: [
                Text(
                  'Encuentra tu Match en la ',
                  style: TextStyle(
                    fontWeight: FontWeight.bold,
                    fontSize: 20,
                  ),
                ),
                Text(
                  'UNAL',
                  style: TextStyle(
                    fontWeight: FontWeight.bold,
                    color: theme.highlightColor,
                    fontSize: 24,
                  ),
                )
              ],
            ),
            Spacer(),
            Row(
              children: [
                UnderlinedButton(
                  child: Text('Ingresar'),
                  color: Color.fromARGB(255, 120, 178, 223),
                  onPressed: () => Navigator.pushNamed(
                    context,
                    LoginScreen.routeName,
                  ),
                ),
                Spacer(),
                UnderlinedButton(
                  child: Text('Registrarse'),
                  color: theme.highlightColor,
                  onPressed: () => Navigator.pushNamed(
                    context,
                    RegisterScreen.routeName,
                  ),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}
