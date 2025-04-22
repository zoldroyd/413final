import { Entertainer } from '../types/Entertainer';

interface FetchProjectsResponse {
  ents: Entertainer[];
}

const API_URL = 'https://localhost:9999/Ent';

export const fetchEnts = async (): Promise<FetchProjectsResponse> => {
  try {
    const response = await fetch(`${API_URL}/AllEnts`);
    if (!response.ok) {
      throw new Error('Failed to fetch projects');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching projects:', error);
    throw error;
  }
};

export const addEnt = async (newEnt: Entertainer): Promise<Entertainer> => {
  try {
    const response = await fetch(`${API_URL}/AddEnt`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newEnt),
    });

    if (!response.ok) {
      throw new Error('Failed to add ent');
    }

    return await response.json();
  } catch (error) {
    console.error('Error adding entt:', error);
    throw error;
  }
};

export const updateEnt = async (
  entertainerID: number,
  updatedEnt: Entertainer
): Promise<Entertainer> => {
  try {
    const response = await fetch(`${API_URL}/UpdateEntt/${entertainerID}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedEnt),
    });

    return await response.json();
  } catch (error) {
    console.error('Error updating entt:', error);
    throw error;
  }
};

export const deleteEnt = async (entertainerID: number): Promise<void> => {
  try {
    const response = await fetch(`${API_URL}/DeleteEnt/${entertainerID}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete ent');
    }
  } catch (error) {
    console.error('Error deleting entt:', error);
    throw error;
  }
};

export const fetchEntById = async (id: number): Promise<Entertainer> => {
  const response = await fetch(`${API_URL}/${id}`); // API_URL = https://localhost:9999/Ent
  if (!response.ok) {
    throw new Error('Failed to fetch entertainer');
  }
  return await response.json();
};
