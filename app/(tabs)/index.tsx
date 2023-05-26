import { StyleSheet, useColorScheme, Button, ScrollView, Pressable, Dimensions, Alert } from 'react-native';
import { useEffect, useState } from 'react';
import EditScreenInfo from '../../components/EditScreenInfo';
import { Text, View } from '../../components/Themed';
import Colors from '../../constants/Colors';
import Circle from '../../components/Circle';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesome } from '@expo/vector-icons';

export default function TabOneScreen() {
  const colorScheme = useColorScheme();
  const [fillLevel, setFillLevel] = useState(0);
  const [monday, setMon] = useState<{ workout: string }[]>([]);
  const [tuesday, setTue] = useState<{ workout: string }[]>([]);
  const [wednesday, setWed] = useState<{ workout: string }[]>([]);
  const [thursday, setThu] = useState<{ workout: string }[]>([]);
  const [friday, setFri] = useState<{ workout: string }[]>([]);
  const [saturday, setSat] = useState<{ workout: string }[]>([]);
  const [sunday, setSun] = useState<{ workout: string }[]>([]);
  const [week, setWeek] = useState([])

  const screenWidth = Dimensions.get('window').width;
  const dayWidth = screenWidth / 7 - 2;

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

  const doneWorkouts = 5

  useEffect(() => {
    readData()
  }, [])

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

  function logWeek() {
    const week = {
      monday: monday,
      tuesday: tuesday,
      wednesday: wednesday,
      thursday: thursday,
      friday: friday,
      saturday: saturday,
      sunday: sunday
    }
    console.log(week)
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <Circle fill="#00C853" nonfill="#222" fillLevel={fillLevel} numberWorkouts={numberOfWorkouts} />
        <Button title="Change" onPress={() => logWeek()}></Button>
      </View>

      <View style={styles.grid}>
        {/* Monday */}
        <View style={[styles.day, { width: dayWidth, height: 100 + maxNumberADay * 16 }]}>
          <Text style={styles.daytitle}>MON</Text>
          {monday.map((item: any, index) => (
            <Text key={index} style={styles.workout}>{item.workout}</Text>
          ))}
        </View>

        {/* Tuesday */}
        <View style={[styles.day, { width: dayWidth, height: 100 + maxNumberADay * 16 }]}>
          <Text style={styles.daytitle}>TUE</Text>
          {tuesday.map((item: any, index) => (
            <Text key={index} style={styles.workout}>{item.workout}</Text>
          ))}
        </View>

        {/* Wednesday */}
        <View style={[styles.day, { width: dayWidth, height: 100 + maxNumberADay * 16 }]}>
          <Text style={styles.daytitle}>WED</Text>
          {wednesday.map((item: any, index) => (
            <Text key={index} style={styles.workout}>{item.workout}</Text>
          ))}
        </View>

        {/* Thursday */}
        <View style={[styles.day, { width: dayWidth, height: 100 + maxNumberADay * 16 }]}>
          <Text style={styles.daytitle}>THU</Text>
          {thursday.map((item: any, index) => (
            <Text key={index} style={styles.workout}>{item.workout}</Text>
          ))}
        </View>

        {/* Friday */}
        <View style={[styles.day, { width: dayWidth, height: 100 + maxNumberADay * 16 }]}>
          <Text style={styles.daytitle}>FRI</Text>
          {friday.map((item: any, index) => (
            <Text key={index} style={styles.workout}>{item.workout}</Text>
          ))}
        </View>

        {/* Saturday */}
        <View style={[styles.day, { width: dayWidth, height: 100 + maxNumberADay * 16 }]}>
          <Text style={styles.daytitle}>SAT</Text>
          {saturday.map((item: any, index) => (
            <Text key={index} style={styles.workout}>{item.workout}</Text>
          ))}
        </View>

        {/* Sunday */}
        <View style={[styles.day, { width: dayWidth, height: 100 + maxNumberADay * 16 }]}>
          <Text style={styles.daytitle}>SUN</Text>
          {sunday.map((item: any, index) => (
            <Text key={index} style={styles.workout}>{item.workout}</Text>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30
  },
  week: {
    textShadowColor: 'black',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 1,
    fontSize: 36
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
