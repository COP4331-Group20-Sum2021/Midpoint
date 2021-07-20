import * as React from 'react'
import Navigator from './components/navigator'
import { NavigationContainer } from '@react-navigation/native'
import { AuthProvider } from './context/AuthContext'

export default function App() {
  return(
    <NavigationContainer>
      <AuthProvider>
        <Navigator />
      </AuthProvider>
    </NavigationContainer>
  );
}
