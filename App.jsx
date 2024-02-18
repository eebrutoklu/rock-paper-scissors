import React, {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import {choices} from './src/data/mockData';
import {COLORS} from './src/util/constant';

const App = () => {
  const [userChoise, setUserChoise] = useState(null);
  const [computerChoise, setComputerChoise] = useState(null);
  const [result, setResult] = useState(null);

  const handleUserChoise = userChoise => {
    setUserChoise(userChoise);
    randomComputerChoise(userChoise); // Kullanıcının seçimini aldıktan sonra bilgisayarın seçimini yap
  };

  const randomComputerChoise = userChoise => {
    const randomIndex = Math.floor(Math.random() * choices.length);
    const computerChoise = choices[randomIndex];
    setComputerChoise(computerChoise);
    determineWinner(userChoise, computerChoise);
  };

  const determineWinner = (user, computer) => {
    if (user === computer) {
      setResult('Draw');
    } else if (
      (user?.name === 'rock' && computer?.name === 'scissors') ||
      (user?.name === 'paper' && computer?.name === 'rock') ||
      (user?.name === 'scissors' && computer?.name === 'paper')
    ) {
      setResult('You win!');
    } else {
      setResult('You lose!');
    }
  };

  const resetGame = () => {
    setUserChoise(null);
    setComputerChoise(null);
    setResult(null);
  };

  const showGameRules = () => {
    Alert.alert(
      'Game Rules',
      'In the "Rock-paper-scissors" game: Rock crushes scissors.\n' +
        ' Paper covers rock.\n' +
        ' Scissors cuts paper.\n' +
        " To win the game, predict your opponent's choice correctly or tie!",
      [{text: 'OK'}],
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'light-content'} />
      <View style={styles.container}>
        <TouchableOpacity
          style={[styles.infoButton, userChoise && {opacity: 0}]}
          onPress={showGameRules}>
          <Text style={styles.infoButtonText}>i</Text>
        </TouchableOpacity>
        <Text style={styles.title}>ROCK PAPER SCISSORS</Text>
        <Text style={styles.choiseText}>User's Choice:</Text>
        <View style={styles.choices}>
          {choices.map(choice => (
            <TouchableOpacity
              key={`${choice.id} - choise`}
              style={
                choice.name === userChoise?.name
                  ? [styles.button, styles.activeButton]
                  : styles.button
              }
              onPress={() => handleUserChoise(choice)}>
              <Image source={choice.image} style={styles.image} />
            </TouchableOpacity>
          ))}
        </View>
        <Text style={styles.resultText}> {result} </Text>
        {computerChoise && (
          <>
            <Text style={styles.choiseText}>Computer's Choice:</Text>
            <View style={styles.button}>
              <Image source={computerChoise.image} style={styles.image} />
            </View>
          </>
        )}
        <TouchableOpacity
          style={[styles.resetButton, !userChoise && {opacity: 0}]}
          onPress={resetGame}
          disabled={!userChoise}>
          <Text style={styles.resetButtonText}>Reset</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.backgroundColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.white,
    fontFamily: 'Trebuchet MS',
  },
  choiseText: {
    fontFamily: 'Trebuchet MS',
    color: COLORS.white,
    marginVertical: 20,
    fontSize: 20,
  },
  choices: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: {
    padding: 10,
    backgroundColor: COLORS.white,
    borderRadius: 10,
    marginRight: 15,
  },
  activeButton: {
    borderWidth: 4,
    borderColor: 'red',
  },
  image: {
    width: 90,
    height: 90,
  },
  resultText: {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'Trebuchet MS',
    marginTop: 10,
    color: COLORS.white,
  },
  resetButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: COLORS.cautionColor,
    borderRadius: 10,
  },
  resetButtonText: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: 18,
  },
  infoButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: COLORS.cautionColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoButtonText: {
    color: COLORS.white,
    fontSize: 20,
  },
});
