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
    borderColor: "black",
    margin: 12,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    backgroundColor: "white",
  },
  icon: {
    marginRight: 5,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
  },
  error: {
    color: 'red',
    fontSize: 12,
    alignSelf: 'left',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
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
    flex: 1,
    height: 40,
    margin: 12,
    marginTop: 5, 
    borderWidth: 1,
    padding: 10,
    backgroundColor: 'white',
  },
  inputError: {
    flex: 1,
    height: 40,
    margin: 12,
    marginTop: 5, 
    borderWidth: 1,
    padding: 10,
    backgroundColor: 'white',
    borderColor: 'red',
  },
  inputWrap: {
    flex: 1,
  },
  fieldContainer: {
    flex: 1,
  },
  
  row: {
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
  },
  container4: {
    flexGrow: 1,
  },
  buttonEndContainer: {
    flex: 1, 
    justifyContent: 'flex-end',
    marginBottom: 50,
  }
});

export default styles;
