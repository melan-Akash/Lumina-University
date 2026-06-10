import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';

const NotFound = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
      <p className="text-2xl font-semibold text-outline mb-6">Page Not Found</p>
      <p className="text-on-surface-variant mb-8 max-w-md mx-auto">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <Button to="/" variant="primary">
        Return to Home
      </Button>
    </div>
  );
};

export default NotFound;
