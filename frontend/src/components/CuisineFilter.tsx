import { Check, ChevronDown, ChevronUp } from 'lucide-react';
import { cuisineList } from '../config/restaurant-options-config';
import { Label } from './ui/label';
import { ChangeEvent } from 'react';
import { Button } from './ui/button';

type Props = {
	onChange: (cuisines: string[]) => void;
	selectedCuisines: string[];
	isExpanded: boolean;
	onExpandedClick: () => void;
};

// TODO: will add a animation where user click the cuisine it will come to first and if the user clicks on the cuisine to unclick this it will goes to there place immediately and check box should be more colorful and more eye catching

const CuisineFilter = ({
	onChange,
	isExpanded,
	onExpandedClick,
	selectedCuisines,
}: Props) => {
	const handleCuisinesChange = (event: ChangeEvent<HTMLInputElement>) => {
		const clickedCuisine = event.target.value;
		const isChecked = event.target.checked;

		const newCuisinesList = isChecked
			? [...selectedCuisines, clickedCuisine]
			: selectedCuisines.filter((cuisine) => cuisine !== clickedCuisine);

		onChange(newCuisinesList);
	};

	const handleCuisineReset = () => onChange([]);

	return (
		<>
			<div className='flex items-center justify-between px-2'>
				<h3 className='mb-2 font-semibold text-md'>Filter By Cuisine</h3>

				<h3
					onClick={handleCuisineReset}
					className='mb-2 text-sm font-semibold text-blue-500 underline cursor-pointer'
				>
					Reset Filters
				</h3>
			</div>

			<div className='flex flex-col space-y-2'>
				{cuisineList
					.slice(0, isExpanded ? cuisineList.length : 6)
					.map((cuisine, index) => {
						const isSelected = selectedCuisines.includes(cuisine);

						return (
							<div key={index} className='flex'>
								<input
									id={`cuisine_${cuisine}`}
									type='checkbox'
									className='hidden'
									value={cuisine}
									checked={isSelected}
									onChange={handleCuisinesChange}
								/>
								<Label
									htmlFor={`cuisine_${cuisine}`}
									className={`flex flex-1 items-center cursor-pointer text-sm rounded-full px-4 py-2 font-semibold ${
										isSelected
											? 'border border-green-600 text-green-600'
											: 'border border-slate-300'
									}`}
								>
									{isSelected && <Check size={20} strokeWidth={3} />}
									{cuisine}
								</Label>
							</div>
						);
					})}
				<Button
					variant='link'
					className='flex-1 mt-4'
					onClick={onExpandedClick}
				>
					{isExpanded ? (
						<span className='flex flex-row items-center'>
							View Less <ChevronUp />
						</span>
					) : (
						<span className='flex flex-row items-center'>
							View More <ChevronDown />
						</span>
					)}
				</Button>
			</div>
		</>
	);
};

export default CuisineFilter;
