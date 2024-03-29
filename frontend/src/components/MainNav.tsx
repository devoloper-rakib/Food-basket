import { useAuth0 } from '@auth0/auth0-react';
import { Button } from './ui/button';
import UserNameMenu from './UserNameMenu';
import { Link } from 'react-router-dom';

const MainNav = () => {
	const { loginWithRedirect, isAuthenticated } = useAuth0();

	return (
		<div className='flex items-center space-x-2'>
			{isAuthenticated ? (
				<>
					<Link className='font-bold hover:text-orange-500' to='/order-status'>
						Order Status
					</Link>
					<UserNameMenu />
				</>
			) : (
				<Button
					className='font-bold hover:text-orange-500 hover:bg-white'
					onClick={async () => await loginWithRedirect()}
					variant='ghost'
				>
					Log In
				</Button>
			)}
		</div>
	);
};

export default MainNav;
