import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginPage from './src/pages/Login';
import HomePage from './src/pages/Home';
import UserPage from './src/pages/User';
import ListRoles from './src/pages/ListRoles';
import EditRoles from './src/pages/EditRoles';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={LoginPage} options={{ title: 'Acesso' }} />
          <Stack.Screen name="Home" component={HomePage} />
          <Stack.Screen name="ListRoles" component={ListRoles} />
          <Stack.Screen name="EditRoles" component={EditRoles} />
          <Stack.Screen name="User" component={UserPage} />
        </Stack.Navigator>
      </NavigationContainer>
  );
}
