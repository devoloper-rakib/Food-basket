const Footer = () => {
	return (
		<div className='py-10 bg-orange-500'>
			<div className='container flex flex-col items-center justify-between mx-auto md:flex-row '>
				<h3 className='text-3xl font-bold tracking-tight text-white'>
					Food-Basket
				</h3>
				<p className='flex gap-4 font-bold tracking-tight text-white'>
					<span>Privacy Policy</span>
					<span>Terms of Service</span>
				</p>
			</div>
		</div>
	);
};

export default Footer;
