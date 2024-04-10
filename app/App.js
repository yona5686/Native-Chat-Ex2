import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AccProvider } from './AccContext.js';
import AvatarBuildComp from './components/AvatarBuildComp.jsx';
import ChatComp from "./components/ChatComp.jsx";

export default function App() {

    const Stack = createNativeStackNavigator();

    return (
        <AccProvider>
            <NavigationContainer initialRouteName="Build your avatar">
                <Stack.Navigator>
                    <Stack.Screen name="Build your avatar" component={AvatarBuildComp}/>
                    <Stack.Screen name="Chat" component={ChatComp}/>
                </Stack.Navigator>
            </NavigationContainer>
        </AccProvider>    
    );
}
