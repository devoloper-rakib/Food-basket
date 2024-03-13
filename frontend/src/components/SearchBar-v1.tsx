import { useEffect, useRef } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Search } from 'lucide-react';

import { Form, FormControl, FormField, FormItem } from './ui/form';
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
	searchQuery?: string;
};

const SearchBar = ({ onSubmit, onReset, placeHolder, searchQuery }: Props) => {
	const form = useForm<SearchForm>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			searchQuery,
		},
	});

	useEffect(() => {
		form.reset({ searchQuery });
	}, [form, searchQuery]);

	const inputRef = useRef<HTMLInputElement>(null);
	useEffect(() => {
		if (inputRef.current) {
			inputRef.current.focus();
		}
	}, []);

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
				className={`flex items-center  gap-3 justify-between flex-row border-2 rounded-full p-3  ${
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
									ref={inputRef}
									value={field.value ?? ''}
									className='text-xl border-none shadow-none focus-visible:ring-0'
									placeholder={placeHolder}
								/>
							</FormControl>
						</FormItem>
					)}
				/>

				{/* TODO: will have a condition  to  show reset button when usr type something  */}
				<Button
					onClick={handleReset}
					type='button'
					variant='outline'
					className='hidden rounded-full md:block '
				>
					Clear
				</Button>

				<Button type='submit' className='bg-orange-500 rounded-full'>
					Search
				</Button>
			</form>
		</Form>
	);
};

export default SearchBar;
