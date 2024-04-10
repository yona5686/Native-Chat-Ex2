import { ScrollView, View, StyleSheet,TextInput, Text } from "react-native";
import { Button } from '@rneui/themed';
import { useAccContext } from "../AccContext";
import { useEffect, useState } from "react";
import socket from "../utils/socket";
import TextAvatar from "react-native-text-avatar";


export default function ChatComp() {

    const { account, chats, colorHash, setChats } = useAccContext()

    useEffect(() => {
        socket.on("connectToChat", (user) => {    
            setChats(prevState => [...prevState, user + " entered the chat"]);
        });
        socket.on("message", (message, user) => {
			if(message != ""){
				setChats(prevState => [...prevState, user + ":\n" + message]);
			}
        });
        socket.on("disconnect", (user) => {
            setChats(prevState => [...prevState, user + " left the chat"]);
        });
    }, [socket]);

	useEffect(() => {
		socket.emit("message", "entered the chat"," "+account.username);
	}, [])


    const [myMessage, setMyMessage] = useState("");

    function sendMyMessage(){
        socket.emit("message", myMessage, account.username);
        setMyMessage("");
    }

	
    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollView}>
                {chats.map((mes, index) => (
                <View key={index} style={styles.messageContainer}>
                    {mes[0] != " " ? (
                        <>
                            <TextAvatar
                                backgroundColor={colorHash(mes.split(':')[0]).hex}
                                textColor={"#0000ff"}
                                size={60}
                                type={"circle"}
                            >
                                {mes.split(':')[0]}
                            </TextAvatar>
                            <Text style={styles.Text}>{mes}</Text>
                        </>
                    ) : (
                        <Text style={styles.Text}>{mes}</Text>
                    )}
                </View>
            ))}
            </ScrollView>

            <View style={styles.inputContainer}>
                <TextInput
                    value={myMessage}
                    onChangeText={setMyMessage}
                    style={styles.TextInput}
                    maxLength={200}
                />
                <View style={styles.btnContainer}>
                    <Button title="Send" onPress={() => sendMyMessage()} />
                </View>
            </View>
        </View>
    );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E9F1FA",
  },
  scrollView: {
    flexGrow: 1,
  },
  inputContainer: {
    flexDirection: "row",
    backgroundColor: "#00ABE4",
    alignItems: "center",
    padding: 20,
  },
  messageContainer: {
    backgroundColor: "#4A8BDF",
    padding: 8,
    borderWidth: 2,
    borderRadius: 10,
    margin: 8
  },
  TextInput: {
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    margin: 10,
    backgroundColor: "#FFFFFF",
    flex: 1 
  },
  btnContainer: {
    marginLeft: 10,
  },
  Text: {
    fontSize: 20,
  },
});
