enum LanguageType { english, arabic }

const String arabic = "es";
const String english = "ar";

extension LanguageTypeExtenstion on LanguageType {
  String getValue() {
    switch (this) {
      case LanguageType.english:
        return english;
      case LanguageType.arabic:
        return arabic;
    }
  }
}
