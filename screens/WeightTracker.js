import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import { useEffect, useState } from 'react';
import { getAllDailyWeight, storeWeight } from '../util/http'

function WeightTracker({navigation}) {
    const [weightEntry, setWeightEntry] = useState(null);
    const [dailyWeightList, setDailyWeightList] = useState([]);
    const [fetchedWeights, setFetchedWeights] = useState([])
    function weightInputHandler(enteredWeight) {
        setWeightEntry(enteredWeight);
        
    }
    function weightSubmitHandler() {
        const today = new Date();

        // Get the day, month, and year
        const day = String(today.getDate()).padStart(2, '0');
        const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const year = String(today.getFullYear()).slice(2);
        const formattedDate = `${day}/${month}/${year}`;
        const newWeightEntry = { weight: weightEntry, todaysDate: formattedDate };
        setDailyWeightList((dailyWeightList) => [
            ...dailyWeightList,
            newWeightEntry,
        ]);
        console.log(dailyWeightList);
        storeWeight(newWeightEntry)
            .then((response) => {
                console.log('Weight stored successfully:', response.data);
            })
            .catch((error) => {
                console.error('Error storing weight:', error);
            });
        fetchWeights()
       
    }

    function fetchWeights() {
        async function getWeights() {
            const weights = await getAllDailyWeight()
            setFetchedWeights(weights)
        }

        getWeights()
        console.log(fetchedWeights)
    }

    useEffect(() => {
        fetchWeights()
    }
        , []);
return (
    <View style={styles.container}>
        <Text>Weight Tracker</Text>
        <Button onPress={() => navigation.navigate('LoginScreen')} title='LogoutScreen'/>
        <View style={styles.weightInputContainer}>
            <TextInput
                placeholder=" e.g. 195lbs"
                style={styles.weightInput}
                inputMode="decimal"
                onChangeText={weightInputHandler}
                maxLength={5}
            />

            <Button title="Add Weight" onPress={weightSubmitHandler} />
        </View>

        <View>
            {fetchedWeights?.map((item, i) => {
                return (
                    <View key={i} style={styles.list}>
                        <Text style={styles.date}>{item.date}</Text>
                        <Text>{item.weight}</Text>
                    </View>
                );
            })}
        </View>
    </View>
)

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        marginTop: 60,
    },
    weightInputContainer: {
        flexDirection: 'row',
        paddingTop: 24,
    },
    weightInput: {
        borderWidth: 1,
        padding: 10,
    },
    list: {
        flexDirection: 'row',
        padding: 10,
    },
    date: {
        paddingRight: 10,
    },
});

export default WeightTracker;