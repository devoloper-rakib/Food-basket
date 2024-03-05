import { useFormContext } from 'react-hook-form';
import {
	FormDescription,
	FormField,
	FormItem,
	FormMessage,
} from '../../components/ui/form';
import { cuisineList } from '../../config/restaurant-options-config';
import CuisineCheckbox from './CuisineCheckbox';

const CuisinesSection = () => {
	const {
		control,
		formState: { errors },
	} = useFormContext();

	const isError = errors?.cuisines !== undefined;

	return (
		<div className='space-y-2'>
			<div>
				<h2 className='text-2xl font-bold'>Cuisines</h2>

				<FormDescription>
					Select the cuisines that your restaurant serves.
				</FormDescription>
			</div>
			<FormField
				control={control}
				name='cuisines'
				render={({ field }) => (
					<FormItem>
						<div className='grid gap-1 md:grid-cols-5'>
							{cuisineList.map((cuisineItem, index) => (
								<CuisineCheckbox
									cuisine={cuisineItem}
									field={field}
									key={index}
									isError={isError}
								/>
							))}
						</div>
						<FormMessage>
							{isError && typeof errors?.cuisines === 'string'
								? errors?.cuisines
								: ''}
						</FormMessage>
					</FormItem>
				)}
			/>
		</div>
	);
};

export default CuisinesSection;
