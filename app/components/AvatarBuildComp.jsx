import { TextInput, Text, StyleSheet, View } from "react-native";
import { useAccContext } from "../AccContext";
import { Button } from "@rneui/themed";
import socket from "../utils/socket";
import TextAvatar from "react-native-text-avatar";
import { useEffect } from "react";


export default function AvatarBuildComp({ navigation }){

    const { account, setAccount, colorHash, setChats } = useAccContext();

    function connect() {
        if(account.username != null && account.username != ""){
            navigation.navigate("Chat");
        }
        else{
            alert("Sorry, you must enter a username")
        }
    };

    useEffect(() => {
        socket.on("connectToChat", (user) => {  
            setChats(prevState => [...prevState, user + ": entered the chat"]);
        });
    }, [socket]);
    
    return(
        <View style={styles.container}>
            {account.username != "" && (<TextAvatar
            backgroundColor={colorHash(account.username).hex}
            textColor={"#0000ff"}
            size={60}
            type={"circle"}
          >{account.username}</TextAvatar>)}

            <Text style={styles.Text}>Enter username: </Text>

            <TextInput style={styles.TextInput} value={account.username}
            onChangeText={(text) => {
                const formattedText = text.replace(/\s/g, '');
                setAccount({...account, username: formattedText})
            }} 
            maxLength={20}></TextInput>
            
            <View style={styles.btnContainer}><Button 
                title="Connect" 
                onPress = {() => connect()}>
            </Button></View>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#E9F1FA",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
  Text: {
    fontSize: 20,
  },
  TextInput: {
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    margin: 10,
    backgroundColor: "#FFFFFF",
    width: 200,
  },
  btnContainer: {
    margin: 10
  }
});