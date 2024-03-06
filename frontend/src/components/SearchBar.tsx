import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Form, FormControl, FormField, FormItem } from './ui/form';
import { Search } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';

const formSchema = z.object({
	searchQuery: z.string({
		required_error: 'Restaurant name is required',
	}),
});

export type SearchForm = z.infer<typeof formSchema>;

type Props = {
	onSubmit: (formData: SearchForm) => void;
	onReset?: () => void;
	placeHolder: string;
};

const SearchBar = ({ onSubmit, onReset, placeHolder }: Props) => {
	const form = useForm<SearchForm>({
		resolver: zodResolver(formSchema),
	});

	const handleReset = () => {
		form.reset({
			searchQuery: '',
		});

		if (onReset) {
			onReset();
		}
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className={`flex items-center flex-1 gap-3 justify-between flex-row border-2 rounded-full p-3 mx-5 ${
					form.formState?.errors?.searchQuery && 'border-red-500'
				}`}
			>
				<Search
					strokeWidth={2.5}
					size={30}
					className='hidden ml-1 text-orange-500 md:block'
				/>
				<FormField
					control={form.control}
					name='searchQuery'
					render={({ field }) => (
						<FormItem className='flex-1'>
							<FormControl>
								<Input
									{...field}
									className='text-xl border-none shadow-none focus-visible:ring-0'
									placeholder={placeHolder}
								/>
							</FormControl>
						</FormItem>
					)}
				/>
				{form.formState.isDirty && (
					<Button
						onClick={handleReset}
						type='button'
						variant='outline'
						className='rounded-full'
					>
						Clear
					</Button>
				)}

				<Button type='submit' className='bg-orange-500 rounded-full'>
					Search
				</Button>
			</form>
		</Form>
	);
};

export default SearchBar;
