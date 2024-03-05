import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form } from '../../components/ui/form';
import DetailsSection from './DetailsSection';
import { Separator } from '../../components/ui/separator';
import CuisinesSection from './CuisinesSection';

const formSchema = z.object({
	restaurantName: z.string({
		required_error: 'restaurant name is required',
	}),
	city: z.string({
		required_error: 'city name is required',
	}),
	country: z.string({
		required_error: 'country name is required',
	}),
	deliveryPrice: z.coerce.number({
		// z.coerce.number => convert string to number using zod
		required_error: 'delivery price is required',
		invalid_type_error: 'must be a valid number ',
	}),

	estimatedDeliveryTime: z.coerce.number({
		required_error: 'estimated delivery time is required',
		invalid_type_error: 'must be a valid number',
	}),
	cuisines: z.array(z.string()).nonempty({
		message: 'please select at least one of the following values',
	}),
	menuItems: z.array(
		z.object({
			name: z.string().min(1, 'name is required'),
			price: z.coerce.number().min(1, 'price is required'),
		}),
	),
	imageFile: z.instanceof(File, { message: 'image file is required' }),
});

type restaurantFormData = z.infer<typeof formSchema>;

type Props = {
	onSave: (restaurantFormData: FormData) => void;
	isLoading: boolean;
};

const ManageRestaurantForm = ({ onSave, isLoading }: Props) => {
	const form = useForm<restaurantFormData>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			cuisines: [],
			menuItems: [{ name: '', price: 0 }],
		},
	});

	const onSubmit = (formDataJson: restaurantFormData) => {
		// TODO: convert formDataJson to a new FormData object
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='p-10 space-y-8 rounded-lg bg-gray-50'
			>
				<DetailsSection />
				<Separator />
				<CuisinesSection />
				<Separator />
			</form>
		</Form>
	);
};

export default ManageRestaurantForm;
