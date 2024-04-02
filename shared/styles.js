import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 16,
  },
  container2: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  dropdown: {
    height: 50,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: "absolute",
    backgroundColor: "white",
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },

  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  inputWrap: {
    flex: 1,
    borderColor: "#cccccc",
    borderBottomWidth: 1,
    marginBottom: 10,
  },
  row: {
    flex: 1,
    flexDirection: "row",
  },
  submitButton: {
    bottom: -300,
  },

  headerText: {
    // Set the font size to 18
    fontSize: 18,
    // Set the font weight to bold
    fontWeight: "bold",
    // Set the color to gray
    color: "gray",
    // Add a bottom border with a gray line
    borderBottomWidth: 1,
    borderBottomColor: "gray",
  },
  arrowIcon: {
    // Set the font family to Font Awesome
    fontFamily: "Font Awesome 5 Free",
    // Set the font weight to solid
    fontWeight: "900",
    // Set the color to gray
    color: "gray",
  },
  container3: {
    backgroundColor: "white",
    padding: 16,
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'cover', // or 'stretch'
    alignItems: "center",
    justifyContent: "center",
  },
  backgroundImage2: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'cover', // or 'stretch'
  }
});

export default styles;
