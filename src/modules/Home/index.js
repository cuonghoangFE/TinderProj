import React, {Fragment} from 'react';
import {
  Dimensions,
  View,
  Image,
  Text,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';

import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import Toast from 'react-native-easy-toast';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faUser,
  faCalendarAlt,
  faMapMarkedAlt,
  faPhone,
  faLock,
} from '@fortawesome/free-solid-svg-icons';

import commonUtils from '../../utils/common';
import {withApp} from '../../core/AppProvider';
import userAPI from '../../actions/user';

import styles from './index.style';

class Home extends React.Component {
  state = {
    click: 'faUser',
  };

  componentDidMount() {
    // const {navigation} = this.props;
    // this.focusListener = navigation.addListener('didFocus', async () => {
    //   // The screen is focused
    //   // Call any action
    // });

    this.setUserStore();
  }

  componentWillUnmount() {
    // Remove the event listener
    this.focusListener.remove();
  }

  setUserStore = async () => {
    const {userStore} = this.props;
    // eslint-disable-next-line no-unused-vars
    const [__, updateUserStore, ___] = userStore;
    this.setState({click: 'faUser'});

    try {
      const users = await userAPI.getUser();
      updateUserStore(users[0]);
    } catch {
      updateUserStore({});
    }
  };

  onSwipe = user => gestureName => {
    const {SWIPE_LEFT, SWIPE_RIGHT} = swipeDirections;

    switch (gestureName) {
      case SWIPE_LEFT:
        this.setUserStore();
        break;
      case SWIPE_RIGHT:
        this._showBottomToast(user);
        break;
    }
  };

  setClick = icon => this.setState({click: icon});

  _showBottomToast = user => {
    const [myFavorites, setMyFavorites] = this.props.myFavoritesStore;
    const myFavoriteItem = myFavorites.find(item => item.seed === user.seed);

    if (!myFavoriteItem) {
      setMyFavorites([...myFavorites, user]);
    }

    this._toast.show('Added to Favorites!');
  };

  renderInformation = () => {
    const [user] = this.props.userStore;

    switch (this.state.click) {
      case 'faCalendarAlt':
        return (
          <Fragment>
            <Text style={styles.text}>{'My email is'}</Text>
            <Text style={styles.text}>{user.user && user.user.email}</Text>
          </Fragment>
        );
      case 'faMapMarkedAlt':
        return (
          <Fragment>
            <Text style={styles.text}>{'My address is'}</Text>
            <Text style={styles.text}>
              {user.user &&
                commonUtils.capitalizeLetter(
                  Object.values(user.user.location).join(', '),
                )}
            </Text>
          </Fragment>
        );
      case 'faPhone':
        return (
          <Fragment>
            <Text style={styles.text}>{'My phone number is'}</Text>
            <Text style={styles.text}>{user.user && user.user.phone}</Text>
          </Fragment>
        );
      case 'faLock':
        return (
          <Fragment>
            <Text style={styles.text}>{'My seed is'}</Text>
            <Text style={styles.text}>{user.seed}</Text>
          </Fragment>
        );
      default:
        return (
          <Fragment>
            <Text style={styles.text}>{'My name is'}</Text>
            <Text style={styles.text}>
              {user.user &&
                commonUtils.capitalizeLetter(
                  Object.values(user.user.name).join(' '),
                )}
            </Text>
          </Fragment>
        );
    }
  };

  render() {
    // eslint-disable-next-line no-unused-vars
    const [user, __, synced] = this.props.userStore;
    const {click} = this.state;

    if (synced) {
      return (
        <View style={styles.container}>
          <ActivityIndicator />
        </View>
      );
    }

    if (!user.user) {
      return (
        <View style={styles.container}>
          <Text>There is no users at the moment</Text>
        </View>
      );
    }

    return (
      <Fragment>
        <GestureRecognizer
          onSwipe={this.onSwipe(user)}
          style={styles.container}>
          <Image
            source={{uri: user.user && user.user.picture}}
            style={styles.image}
          />
          <View style={styles.infoView}>
            {this.renderInformation()}
            <View style={styles.groupBtn}>
              <TouchableOpacity
                style={styles.btn}
                onPress={() => this.setClick('faUser')}>
                <FontAwesomeIcon
                  style={click === 'faUser' ? styles.iconActive : styles.icon}
                  icon={faUser}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.btn}
                onPress={() => this.setClick('faCalendarAlt')}>
                <FontAwesomeIcon
                  style={
                    click === 'faCalendarAlt' ? styles.iconActive : styles.icon
                  }
                  icon={faCalendarAlt}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.btn}
                onPress={() => this.setClick('faMapMarkedAlt')}>
                <FontAwesomeIcon
                  style={
                    click === 'faMapMarkedAlt' ? styles.iconActive : styles.icon
                  }
                  icon={faMapMarkedAlt}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.btn}
                onPress={() => this.setClick('faPhone')}>
                <FontAwesomeIcon
                  style={click === 'faPhone' ? styles.iconActive : styles.icon}
                  icon={faPhone}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.btn}
                onPress={() => this.setClick('faLock')}>
                <FontAwesomeIcon
                  style={click === 'faLock' ? styles.iconActive : styles.icon}
                  icon={faLock}
                />
              </TouchableOpacity>
            </View>
          </View>
        </GestureRecognizer>

        <Toast
          ref={component => (this._toast = component)}
          style={styles.toastBg}
          textStyle={styles.toastText}
          positionValue={Dimensions.get('window').height - 50}
          fadeInDuration={750}
          fadeOutDuration={1000}
          opacity={0.8}
        />
      </Fragment>
    );
  }
}

export default withApp(Home);
