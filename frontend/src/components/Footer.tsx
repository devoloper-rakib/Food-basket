import { Link } from 'react-router-dom';

const Footer = () => {
	return (
		<div className='py-10 bg-orange-500'>
			<div className='container flex flex-col items-center justify-between mx-auto md:flex-row '>
				<Link to='/' className='text-3xl font-bold tracking-tight text-white'>
					Food-Basket
				</Link>

				<p className='font-bold tracking-tight text-white ap-4 '>
					&copy; Copyright goes to{' '}
					<Link
						className='m-0 underline'
						to='https://github.com/devoloper-rakib'
					>
						Rakib Hasan Sohag
					</Link>
				</p>

				<p className='flex gap-4 font-bold tracking-tight text-white'>
					<span>Privacy Policy</span>
					<span>Terms of Service</span>
				</p>
			</div>
		</div>
	);
};

export default Footer;
