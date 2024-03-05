import { useAuth0 } from '@auth0/auth0-react';
import { useMutation, useQuery } from 'react-query';
import { toast } from 'sonner';
import { Restaurant } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Point : Get single restaurant data
export const useGetMyRestaurant = () => {
	const { getAccessTokenSilently } = useAuth0();

	const getMyRestaurantRequest = async (): Promise<Restaurant> => {
		const accessToken = await getAccessTokenSilently();

		const response = await fetch(`${API_BASE_URL}/api/my/restaurant`, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		});

		if (!response.ok) {
			throw new Error('Faild to get restaurant data');
		}

		return response.json();
	};

	const { data: restaurant, isLoading } = useQuery(
		'fetchMyRestaurant',
		getMyRestaurantRequest,
	);

	return { restaurant, isLoading };
};

// Point: Create Single Restaurant
export const useCreateMyRestaurant = () => {
	const { getAccessTokenSilently } = useAuth0();

	const createMyRestaurantRequest = async (
		restaurantFormData: FormData,
	): Promise<Restaurant> => {
		const accessToken = await getAccessTokenSilently();

		const response = await fetch(`${API_BASE_URL}/api/my/restaurant`, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
			body: restaurantFormData,
		});

		if (!response.ok) {
			throw new Error('Failed to create restaurant');
		}

		return response.json();
	};

	const {
		mutate: createRestaurant,
		isLoading,
		isSuccess,
		error,
	} = useMutation(createMyRestaurantRequest);

	if (isSuccess) {
		toast.success('Restaurant created  Successfully!');
	}

	if (error) {
		toast.error('unable to create new restaurant');
	}

	return { createRestaurant, isLoading };
};
