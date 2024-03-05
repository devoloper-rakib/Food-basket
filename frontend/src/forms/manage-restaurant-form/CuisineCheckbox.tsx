import { ControllerRenderProps, FieldValues } from 'react-hook-form';
import { FormControl, FormItem, FormLabel } from '../../components/ui/form';
import { Checkbox } from '../../components/ui/checkbox';

type Props = {
	cuisine: string;
	field: ControllerRenderProps<FieldValues, 'cuisines'>;
	isError: boolean;
};

const CuisineCheckbox = ({ cuisine, field, isError }: Props) => {
	return (
		<FormItem
			className={`flex flex-row items-center mt-2 space-x-1 space-y-0 ${
				isError ? 'text-red-500' : ''
			}`}
		>
			<FormControl>
				<Checkbox
					className={`bg-white ${isError ? '  border-red-500' : ''}`}
					checked={field.value.includes(cuisine)}
					onCheckedChange={(checked) => {
						if (checked) {
							field.onChange([...field.value, cuisine]);
						} else {
							field.onChange(
								field.value.filter((value: string) => value !== cuisine),
							);
						}
					}}
				/>
			</FormControl>
			<FormLabel className='font-xl text-normal'>{cuisine}</FormLabel>
		</FormItem>
	);
};

export default CuisineCheckbox;
