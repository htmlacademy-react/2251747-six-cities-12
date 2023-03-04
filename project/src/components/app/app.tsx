import FirstScreen from '../../pages/first-screen/first-screen';

type AppScreenProps = {
  placesCount: number;
}

function App({placesCount}: AppScreenProps): JSX.Element {
  return (
    <FirstScreen placesCount={placesCount}/>
  );
}

export default App;

