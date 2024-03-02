import { Loader2 } from 'lucide-react';
import { Button } from './ui/button';

// TODO: In the loading... (dot will have a animation like one dot then another dot and then another dot coming with a good animation )
const LoadingButton = () => {
	return (
		<Button disabled>
			<Loader2 className='w-4 h-4 mr-2 animate-spin' />
			Loading...
		</Button>
	);
};

export default LoadingButton;
