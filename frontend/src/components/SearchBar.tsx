import { useEffect, useRef } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { DeleteIcon, Search } from 'lucide-react';
import { useMediaQuery } from 'react-responsive';

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

	const isLargeScreen = useMediaQuery({ minWidth: 768 });
	const isMobileScreen = useMediaQuery({ maxWidth: 767 });

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className={`flex items-center gap-3 justify-between flex-row border-2 rounded-full p-3 ${
					form.formState?.errors?.searchQuery && 'border-red-500'
				}`}
			>
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

				{isLargeScreen && (
					<Button type='submit' className='bg-orange-500 rounded-full'>
						Search
					</Button>
				)}

				{isMobileScreen && (
					<Button type='submit' className='bg-orange-500 rounded-full'>
						<Search size={20} strokeWidth={2} className='mr-1' />
					</Button>
				)}

				{isLargeScreen && (
					<Button
						onClick={handleReset}
						type='button'
						variant='outline'
						className='rounded-full'
					>
						Clear
					</Button>
				)}

				{isMobileScreen && (
					<Button
						onClick={handleReset}
						type='button'
						variant='outline'
						className='rounded-full'
					>
						<DeleteIcon size={20} strokeWidth={2} />
					</Button>
				)}
			</form>
		</Form>
	);
};

export default SearchBar;
