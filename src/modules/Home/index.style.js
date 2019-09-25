import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  toastBg: {
    backgroundColor: '#ddd',
  },
  toastText: {
    color: '#000',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  image: {
    width: 200,
    height: 200,
    backgroundColor: 'green',
    marginBottom: 10,
  },
  infoView: {
    width: '100%',
  },
  text: {
    textAlign: 'center',
  },
  groupBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  btn: {
    paddingTop: 8,
    paddingHorizontal: 8,
  },
  btnActive: {
    borderTopWidth: 2,
    borderColor: 'green',
  },
  icon: {
    color: '#ddd',
  },
  iconActive: {
    color: 'green',
  },
});
