import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#cccccc'
  },
  header: {
    marginTop: 30,
    backgroundColor: '#ba89eb',
    flexDirection: 'row'
  },
  footer: {
    backgroundColor: '#ba89eb',
    flexDirection: 'row',
  },
  title: {
    color: '#000',
    //fontFamily: 'DancingScript',
    fontWeight: 'bold',
    flex: 1,
    fontSize: 23,
    textAlign: 'center',
    margin: 10,
  },
  author: {
    color: '#000',
    fontWeight: 'bold',
    flex: 1,
    fontSize: 15,
    textAlign: 'center',
    margin: 10,
  },
  gameboard: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  gameinfo: {
    backgroundColor: '#fff',
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
  text: {
    marginTop: 10,
    marginBottom: 5,
  },
  row: {
    marginLeft: 6,
  },
  flex: {
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 10,
  },
  button: {
    margin: 30,
    flexDirection: "row",
    padding: 10,
    backgroundColor: "#73CED6",
    width: 150,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    color:"#2B2B52",
    fontSize: 20
  }
});