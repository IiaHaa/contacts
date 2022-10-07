import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import * as Contacts from 'expo-contacts';

export default function App() {
  const [contact, setContact] = useState([]);

  const getContacts = async () => {
    const { status } = await Contacts.requestPermissionsAsync();

    if (status === 'granted') {
      const { data } = await Contacts.getContactsAsync(
        { fields: [Contacts.Fields.PhoneNumbers] }
      )

      if (data.length > 0) {
        setContact(data);
        console.log(data);
      }
    }
  }

  const listSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "80%",
          backgroundColor: "#CED0CE",
          marginLeft: "10%"
        }}
      />
    );
  };

  return (

    <View style={styles.container} >
       <FlatList 
        style={{marginLeft : "5%", marginTop: "20%"}}
        keyExtractor={(item, index) => index.toString()} 
        renderItem={({item}) => (
          <View>
            <Text>{item.name}</Text>
            <FlatList
              data={item.phoneNumbers}
              renderItem={({item}) => (
                <View>
                  <Text>{item.number}</Text>
                </View>
              )}
            />
          </View>
        )}
        data={contact}
        ItemSeparatorComponent={listSeparator} 
      />
      <Button title="Get contacts" onPress={getContacts} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15
  },
});