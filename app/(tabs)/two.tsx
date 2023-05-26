import { Alert, Button, Dimensions, Pressable, StyleSheet, TextInput, useColorScheme } from 'react-native';
import { useState, useEffect } from "react";
import EditScreenInfo from '../../components/EditScreenInfo';
import { Text, View } from '../../components/Themed';
import Colors from '../../constants/Colors';
import { FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function TabTwoScreen() {
  const colorScheme = useColorScheme();
  const screenWidth = Dimensions.get('window').width;
  const dayWidth = screenWidth / 7 - 2;

  const [monday, setMon] = useState<{ workout: string }[]>([]);
  const [tuesday, setTue] = useState<{ workout: string }[]>([]);
  const [wednesday, setWed] = useState<{ workout: string }[]>([]);
  const [thursday, setThu] = useState<{ workout: string }[]>([]);
  const [friday, setFri] = useState<{ workout: string }[]>([]);
  const [saturday, setSat] = useState<{ workout: string }[]>([]);
  const [sunday, setSun] = useState<{ workout: string }[]>([]);

  const numberOfWorkouts = monday.length + tuesday.length + wednesday.length + thursday.length + friday.length + saturday.length + sunday.length

  const maxNumberADay = Math.max(
    monday.length,
    tuesday.length,
    wednesday.length,
    thursday.length,
    friday.length,
    saturday.length,
    sunday.length
  )

  useEffect(() => {
    readData()
  }, [])

  function saveData(day: any, data: string) {
    try {
      console.log("saving...")
      AsyncStorage.setItem(`@${day}`, data);
    } catch (error) {

    }
  }

  async function readData() {
    try {
      const monday = await AsyncStorage.getItem('@monday') ?? '[]'
      const tuesday = await AsyncStorage.getItem('@tuesday') ?? '[]'
      const wednesday = await AsyncStorage.getItem('@wednesday') ?? '[]'
      const thursday = await AsyncStorage.getItem('@thursday') ?? '[]'
      const friday = await AsyncStorage.getItem('@friday') ?? '[]'
      const saturday = await AsyncStorage.getItem('@saturday') ?? '[]'
      const sunday = await AsyncStorage.getItem('@sunday') ?? '[]'

      setMon(JSON.parse(monday))
      setTue(JSON.parse(tuesday))
      setWed(JSON.parse(wednesday))
      setThu(JSON.parse(thursday))
      setFri(JSON.parse(friday))
      setSat(JSON.parse(saturday))
      setSun(JSON.parse(sunday))
    } catch (error) {
      console.log(error)
    }
  }

  function newWorkout(day: any) {
    Alert.prompt(
      'New Workout',
      'Type in the type of Workout',
      (text) => addWorkout(day, text),
      'plain-text'
    )
  }

  function addWorkout(day: string, text: string) {
    switch (day) {
      case "monday":
        const newMonday = [...monday, { workout: text }];
        setMon(newMonday);
        saveData("monday", JSON.stringify(newMonday));
        break;
      case "tuesday":
        const newTuesday = [...tuesday, { workout: text }];
        setTue(newTuesday);
        saveData("tuesday", JSON.stringify(newTuesday));
        break;
      case "wednesday":
        const newWednesday = [...wednesday, { workout: text }];
        setWed(newWednesday);
        saveData("wednesday", JSON.stringify(newWednesday));
        break;
      case "thursday":
        const newThursday = [...thursday, { workout: text }];
        setThu(newThursday);
        saveData("thursday", JSON.stringify(newThursday));
        break;
      case "friday":
        const newFriday = [...friday, { workout: text }];
        setFri(newFriday);
        saveData("friday", JSON.stringify(newFriday));
        break;
      case "saturday":
        const newSaturday = [...saturday, { workout: text }];
        setSat(newSaturday);
        saveData("saturday", JSON.stringify(newSaturday));
        break;
      case "sunday":
        const newSunday = [...sunday, { workout: text }];
        setSun(newSunday);
        saveData("sunday", JSON.stringify(newSunday));
        break;
      default:
        break;
    }
  }

  function deleteWorkout(index: number, day: string) {
    switch (day) {
      case "monday":
        const newMonday = [...monday];
        newMonday.splice(index, 1);
        setMon(newMonday);
        saveData("monday", JSON.stringify(newMonday));
        break;
      case "tuesday":
        const newTuesday = [...tuesday];
        newTuesday.splice(index, 1);
        setTue(newTuesday);
        saveData("tuesday", JSON.stringify(newTuesday));
        break;
      case "wednesday":
        const newWednesday = [...wednesday];
        newWednesday.splice(index, 1);
        setWed(newWednesday);
        saveData("wednesday", JSON.stringify(newWednesday));
        break;
      case "thursday":
        const newThursday = [...thursday];
        newThursday.splice(index, 1);
        setThu(newThursday);
        saveData("thursday", JSON.stringify(newThursday));
        break;
      case "friday":
        const newFriday = [...friday];
        newFriday.splice(index, 1);
        setFri(newFriday);
        saveData("friday", JSON.stringify(newFriday));
        break;
      case "saturday":
        const newSaturday = [...saturday];
        newSaturday.splice(index, 1);
        setSat(newSaturday);
        saveData("saturday", JSON.stringify(newSaturday));
        break;
      case "sunday":
        const newSunday = [...sunday];
        newSunday.splice(index, 1);
        setSun(newSunday);
        saveData("sunday", JSON.stringify(newSunday));
        break;
      default:
        break;
    }
  }

  return (
    <View style={styles.container}>
      <Text style={{ marginBottom: 15 }}>{numberOfWorkouts} workouts a week</Text>

      <View style={styles.grid}>
        {/* Monday */}
        <View style={[styles.day, { width: dayWidth, height: 100 + maxNumberADay * 16 }]}>
          <Text style={styles.daytitle}>MON</Text>
          {monday.map((item: any, index) => (
            <Text key={index} style={styles.workout} onPress={() => Alert.alert(`${item.workout}`, '', [{ text: 'delete', onPress: () => deleteWorkout(index, "monday"), style: 'destructive' }, { text: 'cancel', onPress: () => { }, style: 'cancel' }])}>{item.workout}</Text>
          ))}
          <Pressable onPress={() => newWorkout("monday")} style={styles.addbutton}><FontAwesome size={28} style={{ marginBottom: -3 }} name="plus-circle" color={Colors[colorScheme ?? 'light'].tint} /></Pressable>
        </View>

        {/* Tuesday */}
        <View style={[styles.day, { width: dayWidth, height: 100 + maxNumberADay * 16 }]}>
          <Text style={styles.daytitle}>TUE</Text>
          {tuesday.map((item: any, index) => (
            <Text key={index} style={styles.workout} onPress={() => Alert.alert(`${item.workout}`, '', [{ text: 'delete', onPress: () => deleteWorkout(index, "tuesday"), style: 'destructive' }, { text: 'cancel', onPress: () => { }, style: 'cancel' }])}>{item.workout}</Text>
          ))}
          <Pressable onPress={() => newWorkout("tuesday")} style={styles.addbutton}><FontAwesome size={28} style={{ marginBottom: -3 }} name="plus-circle" color={Colors[colorScheme ?? 'light'].tint} /></Pressable>
        </View>

        {/* Wednesday */}
        <View style={[styles.day, { width: dayWidth, height: 100 + maxNumberADay * 16 }]}>
          <Text style={styles.daytitle}>WED</Text>
          {wednesday.map((item: any, index) => (
            <Text key={index} style={styles.workout} onPress={() => Alert.alert(`${item.workout}`, '', [{ text: 'delete', onPress: () => deleteWorkout(index, "wednesday"), style: 'destructive' }, { text: 'cancel', onPress: () => { }, style: 'cancel' }])}>{item.workout}</Text>
          ))}
          <Pressable onPress={() => newWorkout("wednesday")} style={styles.addbutton}><FontAwesome size={28} style={{ marginBottom: -3 }} name="plus-circle" color={Colors[colorScheme ?? 'light'].tint} /></Pressable>
        </View>

        {/* Thursday */}
        <View style={[styles.day, { width: dayWidth, height: 100 + maxNumberADay * 16 }]}>
          <Text style={styles.daytitle}>THU</Text>
          {thursday.map((item: any, index) => (
            <Text key={index} style={styles.workout} onPress={() => Alert.alert(`${item.workout}`, '', [{ text: 'delete', onPress: () => deleteWorkout(index, "thursday"), style: 'destructive' }, { text: 'cancel', onPress: () => { }, style: 'cancel' }])}>{item.workout}</Text>
          ))}
          <Pressable onPress={() => newWorkout("thursday")} style={styles.addbutton}><FontAwesome size={28} style={{ marginBottom: -3 }} name="plus-circle" color={Colors[colorScheme ?? 'light'].tint} /></Pressable>
        </View>

        {/* Friday */}
        <View style={[styles.day, { width: dayWidth, height: 100 + maxNumberADay * 16 }]}>
          <Text style={styles.daytitle}>FRI</Text>
          {friday.map((item: any, index) => (
            <Text key={index} style={styles.workout} onPress={() => Alert.alert(`${item.workout}`, '', [{ text: 'delete', onPress: () => deleteWorkout(index, "friday"), style: 'destructive' }, { text: 'cancel', onPress: () => { }, style: 'cancel' }])}>{item.workout}</Text>
          ))}
          <Pressable onPress={() => newWorkout("friday")} style={styles.addbutton}><FontAwesome size={28} style={{ marginBottom: -3 }} name="plus-circle" color={Colors[colorScheme ?? 'light'].tint} /></Pressable>
        </View>

        {/* Saturday */}
        <View style={[styles.day, { width: dayWidth, height: 100 + maxNumberADay * 16 }]}>
          <Text style={styles.daytitle}>SAT</Text>
          {saturday.map((item: any, index) => (
            <Text key={index} style={styles.workout} onPress={() => Alert.alert(`${item.workout}`, '', [{ text: 'delete', onPress: () => deleteWorkout(index, "saturday"), style: 'destructive' }, { text: 'cancel', onPress: () => { }, style: 'cancel' }])}>{item.workout}</Text>
          ))}
          <Pressable onPress={() => newWorkout("saturday")} style={styles.addbutton}><FontAwesome size={28} style={{ marginBottom: -3 }} name="plus-circle" color={Colors[colorScheme ?? 'light'].tint} /></Pressable>
        </View>

        {/* Sunday */}
        <View style={[styles.day, { width: dayWidth, height: 100 + maxNumberADay * 16 }]}>
          <Text style={styles.daytitle}>SUN</Text>
          {sunday.map((item: any, index) => (
            <Text key={index} style={styles.workout} onPress={() => Alert.alert(`${item.workout}`, '', [{ text: 'delete', onPress: () => deleteWorkout(index, "sunday"), style: 'destructive' }, { text: 'cancel', onPress: () => { }, style: 'cancel' }])}>{item.workout}</Text>
          ))}
          <Pressable onPress={() => newWorkout("sunday")} style={styles.addbutton}><FontAwesome size={28} style={{ marginBottom: -3 }} name="plus-circle" color={Colors[colorScheme ?? 'light'].tint} /></Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  grid: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
  },
  day: {
    // height: ,
    backgroundColor: '#222',
    marginBottom: 10,
    display: "flex",
    position: 'relative',
    alignItems: 'center',
  },
  daytitle: {
    textAlign: 'center',
    marginTop: 5,
    marginBottom: 10,
    fontWeight: 'bold',
    fontSize: 16
  },
  addbutton: {
    marginTop: 10,
    marginBottom: 15,
    position: 'absolute',
    bottom: 0,
    shadowColor: 'white',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.33,
    shadowRadius: 12,
  },
  workout: {
    overflow: 'hidden',
    fontSize: 12,
    maxHeight: 14,
    marginBottom: 5
  }
});
