import { Button } from '@mui/material';
import { useAppSelector } from '../app/hooks';
import TransactionsGrid from '../components/transactions/TransactionsGrid.component';
import { selectCurrentUser } from '../slices/auth.slice';

const HomePage = () => {
  const user = useAppSelector((state) => selectCurrentUser(state));

  const handleConnectCoinbase = () => {
    if (process.env.REACT_APP_COINBASE_AUTH_URL) {
      window.location.href = process.env.REACT_APP_COINBASE_AUTH_URL;
    }

    return false;
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      {user?.isCoinbaseAuthorized ? (
        <TransactionsGrid />
      ) : (
        <Button
          variant="contained"
          size="large"
          onClick={handleConnectCoinbase}
        >
          Connect Coinbase
        </Button>
      )}
    </div>
  );
};

export default HomePage;
