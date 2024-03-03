import { useAuth0 } from '@auth0/auth0-react';
import { useMutation } from 'react-query';
import { Toaster } from '../components/ui/sonner';
import { toast } from 'sonner';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

type CreateUserRequest = {
	auth0Id: string;
	email: string;
};

export const UseCreateMyUser = () => {
	const { getAccessTokenSilently } = useAuth0();

	const createMyUserRequest = async (user: CreateUserRequest) => {
		const accessToken = await getAccessTokenSilently();
		const response = await fetch(`${API_BASE_URL}/api/my/user`, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${accessToken}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(user),
		});

		if (!response.ok) {
			throw new Error('Failed to create user');
		}
	};

	const {
		mutateAsync: createUser,
		isLoading,
		isError,
		isSuccess,
	} = useMutation(createMyUserRequest);

	return {
		createUser,
		isLoading,
		isError,
		isSuccess,
	};
};

type UpdateMyUserRequest = {
	name: string;
	addressLine1: string;
	city: string;
	country: string;
};

// Point: update current user profile
export const useUpdateMyUser = () => {
	const { getAccessTokenSilently } = useAuth0();

	const updateMyUserRequest = async (formData: UpdateMyUserRequest) => {
		const accessToken = await getAccessTokenSilently();
		const response = await fetch(`${API_BASE_URL}/api/my/user`, {
			method: 'PUT',
			headers: {
				Authorization: `Bearer ${accessToken}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(formData),
		});

		if (!response.ok) {
			throw new Error('Failed to Update User Profile Data');
		}

		return response.json();
	};

	const {
		mutateAsync: updateUser,
		isLoading,
		isError,
		isSuccess,
		error,
		reset,
	} = useMutation(updateMyUserRequest);

	// TODO: After finishing the project, will will added  an features that what kind of changes user did
	if (isSuccess) toast.success('User profile updated successfully');

	if (error) {
		toast.error(error.toString());
		reset();
	}

	return {
		updateUser,
		isLoading,
	};
};
