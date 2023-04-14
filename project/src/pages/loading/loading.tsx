import { Rings } from 'react-loader-spinner';

export const LoadingScreen = () => (
  <div style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }}className="flex justify-center items-center "
  >
    <Rings color="#00BFFF" height={500} width={180} />
  </div>
);

export default LoadingScreen;
